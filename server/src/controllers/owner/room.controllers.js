import pool from "../../config/db.js";
import { randomUUID } from "crypto";
import uploadToCloudinary from "../../utils/uploadToCloudinary.utils.js";
import cloudinary from "../../config/cloudinary.js";

export const createRoom = async (req, res) => {
  const connection = await pool.getConnection();
  let uploadedImages = [];
  let roomId;

  try {
    await connection.beginTransaction();

    const userId = req.user?.userId;
    
    const {
      hotelId,
      room_type_id,
      price_per_night,
      max_guests,
      total_rooms,
      primaryIndex,
    } = req.body;

    if (
      !userId||
      !hotelId ||
      !room_type_id ||
      price_per_night == null ||
      max_guests == null ||
      total_rooms == null ||
      primaryIndex == null
    ) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!req.files || !req.files.length) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: "Photos are required",
      });
    }

    const primaryIdx = Number(primaryIndex);

    if (
      Number.isNaN(primaryIdx) ||
      primaryIdx < 0 ||
      primaryIdx >= req.files.length
    ) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: "Invalid primary image index",
      });
    }

    const [hotel] = await connection.query(
      `SELECT id FROM hotels WHERE id = ? AND owner_id = ? LIMIT 1`,
      [hotelId, userId]
    );

    if (!hotel.length) {
      await connection.rollback();
      console.log(userId)
      console.log(hotelId)
      return res.status(403).json({
        success: false,
        message: "Not authorized to add rooms to this hotel",
      });
    }

    const [roomType] = await connection.query(
      `SELECT id FROM room_types WHERE id = ? LIMIT 1`,
      [room_type_id]
    );

    if (!roomType.length) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: "Invalid room type",
      });
    }

    uploadedImages = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );

    roomId = randomUUID();

    await connection.query(
      `
      INSERT INTO rooms 
      (id, hotel_id, room_type_id, price_per_night, max_guests, total_rooms, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        roomId,
        hotelId,
        room_type_id,
        Math.abs(parseFloat(price_per_night)),
        Math.abs(Number(max_guests)),
        Math.abs(Number(total_rooms)),
        true,
      ]
    );

    const photoValues = uploadedImages.map((img, index) => [
      randomUUID(),
      roomId,
      img.secure_url,
      index === primaryIdx,
    ]);

    await connection.query(
      `
      INSERT INTO room_photos (id, room_id, photo_url, is_primary)
      VALUES ?
      `,
      [photoValues]
    );

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "Room listed successfully",
    });
  } catch (err) {
    await connection.rollback();

    if (uploadedImages.length) {
      await Promise.all(
        uploadedImages.map((img) =>
          cloudinary.uploader.destroy(img.public_id)
        )
      );
    }

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Room with mentioned type is already listed",
      });
    }
    console.log(`ROOM CREATE ERR : ${err.message}`)
    return res.status(500).json({
      success: false,
      message: "Room insert error",
    });
  } finally {
    connection.release();
  }
};


export const updateRoom = async (req, res) => {
  const connection = await pool.getConnection();
  let uploadedImages = [];
  let oldImages = [];

  try {
    await connection.beginTransaction();

    const userId = req.user.userId;
    const {
      roomId,
      total_rooms,
      is_active,
      price_per_night,
      max_guests,
      primaryIndex
    } = req.body;

    if (!roomId) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: "Room ID is required",
      });
    }

    const [auth] = await connection.query(
      `SELECT r.hotel_id
       FROM rooms r
       JOIN hotels h ON h.id = r.hotel_id
       WHERE r.id = ? AND h.owner_id = ?
       LIMIT 1`,
      [roomId, userId]
    );

    if (!auth.length) {
      await connection.rollback();
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this room",
      });
    }

    const [bookingCount] = await connection.query(
      `SELECT COUNT(*) AS booked
       FROM booking_items bi
       JOIN bookings b ON b.id = bi.booking_id
       JOIN booking_statuses bs ON bs.id = b.booking_status_id
       WHERE bi.room_id = ?
       AND bs.name IN ('pending','confirmed','completed')`,
      [roomId]
    );

    const bookedRooms = bookingCount[0].booked;

    if (total_rooms !== undefined && Number(total_rooms) < bookedRooms) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: `Cannot reduce total rooms below currently booked (${bookedRooms})`,
      });
    }

    if (is_active !== undefined && !is_active && bookedRooms > 0) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: "Cannot deactivate room while bookings exist",
      });
    }

    const fields = [];
    const values = [];

    if (total_rooms !== undefined) {
      fields.push("total_rooms = ?");
      values.push(Math.abs(Number(total_rooms)));
    }

    if (is_active !== undefined) {
      fields.push("is_active = ?");
      values.push(!!is_active);
    }

    if (price_per_night !== undefined) {
      fields.push("price_per_night = ?");
      values.push(Math.abs(parseFloat(price_per_night)));
    }

    if (max_guests !== undefined) {
      fields.push("max_guests = ?");
      values.push(Math.abs(Number(max_guests)));
    }

    if (fields.length) {
      values.push(roomId);
      await connection.query(
        `UPDATE rooms SET ${fields.join(", ")} WHERE id = ?`,
        values
      );
    }

    // PHOTO UPDATE
    if (req.files && req.files.length > 0) {

      const primaryIdx = Number(primaryIndex);

      if (
        Number.isNaN(primaryIdx) ||
        primaryIdx < 0 ||
        primaryIdx >= req.files.length
      ) {
        await connection.rollback();
        return res.status(400).json({
          success: false,
          message: "Invalid primary image index",
        });
      }

      const [existingPhotos] = await connection.query(
        `SELECT photo_url FROM room_photos WHERE room_id = ?`,
        [roomId]
      );

      oldImages = existingPhotos;

      uploadedImages = await Promise.all(
        req.files.map(file => uploadToCloudinary(file.buffer))
      );

      await connection.query(
        `DELETE FROM room_photos WHERE room_id = ?`,
        [roomId]
      );

      const photoValues = uploadedImages.map((img, index) => [
        randomUUID(),
        roomId,
        img.secure_url,
        index === primaryIdx
      ]);

      await connection.query(
        `INSERT INTO room_photos (id, room_id, photo_url, is_primary)
         VALUES ?`,
        [photoValues]
      );

      await Promise.all(
        oldImages.map(img => {
          const publicId = img.photo_url.split("/").pop().split(".")[0];
          return cloudinary.uploader.destroy(publicId);
        })
      );
    }

    await connection.commit();

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
    });

  } catch (err) {
    await connection.rollback();

    if (uploadedImages.length) {
      await Promise.all(
        uploadedImages.map(img =>
          cloudinary.uploader.destroy(img.public_id)
        )
      );
    }

    console.log("ROOM UPDATE ERR:", err.message);

    return res.status(500).json({
      success: false,
      message: "Room update failed",
    });
  } finally {
    connection.release();
  }
};

export const fetchRoomInfo = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.userId;

    const [isUserAuthenticated] = await pool.query(
      `SELECT 1
       FROM rooms r
       JOIN hotels h ON h.id = r.hotel_id
       WHERE h.owner_id = ? AND r.id = ?
       LIMIT 1`,
      [userId, roomId]
    );

    if (!isUserAuthenticated.length) {
      return res.status(403).json({
        success: false,
        message: "User not authorized to view room details",
      });
    }

    const [roomInfo] = await pool.query(
      `SELECT price_per_night, max_guests, total_rooms, is_active
       FROM rooms
       WHERE id = ?`,
      [roomId]
    );

    if (!roomInfo.length) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const [roomType] = await pool.query(
      `SELECT rt.id, rt.name
       FROM room_types rt
       JOIN rooms r ON r.room_type_id = rt.id
       WHERE r.id = ?`,
      [roomId]
    );

    const [roomImg] = await pool.query(
      `SELECT id, photo_url, is_primary
       FROM room_photos
       WHERE room_id = ?`,
      [roomId]
    );

    // booked rooms count (sum of quantities in active bookings)
    const [booked] = await pool.query(
      `SELECT COALESCE(SUM(bi.quantity),0) AS booked_count
       FROM booking_items bi
       JOIN bookings b ON b.id = bi.booking_id
       JOIN booking_statuses bs ON bs.id = b.booking_status_id
       WHERE bi.room_id = ?
       AND bs.name IN ('pending','confirmed','completed')`,
      [roomId]
    );

    const roomData = {
      ...roomInfo[0],
      booked_count: booked[0].booked_count
    };

    return res.status(200).json({
      success: true,
      roomInfo: roomData,
      roomType: roomType[0] || null,
      roomImg,
    });

  } catch (err) {
    console.log(`ROOM FETCHING ERR: ${err.message}`);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const fetchAllRooms = async (req,res) => {
  try{
    const userId = req.user.userId;
    const {hotelId} = req.params;

    if(!hotelId){
      return res.status(400).json({
        success: false,
        message: "Hotel Id is required"
      })
    }

    // Authenticating user
    const [isUserAuthenticated] = await pool.query(`SELECT 1 FROM hotels WHERE id = ? AND owner_id = ?`,[hotelId,userId])
    
    if(!isUserAuthenticated.length){
      return res.status(401).json({
        success: false,
        message: "User not authorized"
      })
    }

    const [rooms] = await pool.query(
  `SELECT 
      r.id,
      rt.name AS room_type,
      r.price_per_night,
      r.total_rooms,
      r.max_guests,
      r.is_active
   FROM rooms r
   JOIN room_types rt ON rt.id = r.room_type_id
   WHERE r.hotel_id = ?
   ORDER BY rt.name`,
  [hotelId]
);

  return res.status(200).json({
    success: true,
    rooms
  })
  }catch(err){
    console.log(`ROOMS TABLE ERR: ${err.message}`)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}