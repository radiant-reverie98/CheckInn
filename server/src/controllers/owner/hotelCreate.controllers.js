import { randomUUID } from "crypto";
import pool from "../../config/db.js";
import uploadToCloudinary from "../../utils/uploadToCloudinary.utils.js";
import cloudinary from "../../config/cloudinary.js";

export const getHotelTypes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id,name FROM hotel_types ORDER BY name`,
    );
    if (!rows) {
      res
        .status(500)
        .json({ success: false, message: "Hotel_type config failed" });
    }

    return res.status(200).json({
      success: true,
      message: "Hotel_type fetched successfully",
      data: rows,
    });
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getHotelAmenities = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id,name FROM amenities ORDER BY name`,
    );
    if (!rows) {
      res
        .status(500)
        .json({ success: false, message: "Amenities config failed" });
    }
    return res.status(200).json({
      success: true,
      message: "Hotel_type fetched successfully",
      data: rows,
    });
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createHotel = async (req, res) => {
  const connection = await pool.getConnection();
  let uploadedImages = [];
  try {
    const {
      hotel_name,
      hotel_type_id,
      short_tagline,
      long_description,
      state,
      city,
      street_address,
      google_maps_link,
      amenities,
      coverIndex,
    } = req.body;

    const owner_id = req.user.userId;
    if (!hotel_name || !hotel_type_id || !state || !city || !street_address) {
      return res.status(400).json({
        success: false,
        message: "Missing client credentials",
      });
    }

    if (!req.files || req.files.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Minimum 3 photos required",
      });
    }

    let parsedAmenities = [];
    if (amenities) {
      parsedAmenities = JSON.parse(amenities);
    }

    let primaryIndex = Number(coverIndex);
    if (
      isNaN(primaryIndex) ||
      primaryIndex < 0 ||
      primaryIndex >= req.files.length
    ) {
      primaryIndex = 0;
    }

    uploadedImages = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer)),
    );
    const hotelId = randomUUID();
    await connection.beginTransaction();

    // HOTEL INSERTION

    const [insertQuery] = await connection.query(
      `INSERT INTO hotels (id,owner_id,hotel_name,hotel_type_id,short_tagline,long_description,state,city,street_address,google_maps_link) VALUES(?,?,?,?,?,?,?,?,?,?)`,
      [
        hotelId,
        owner_id,
        hotel_name,
        hotel_type_id,
        short_tagline,
        long_description,
        state,
        city,
        street_address,
        google_maps_link,
      ],
    );
    if (insertQuery.affectedRows === 0) {
      await connection.rollback();
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    const photoValues = uploadedImages.map((img, index) => [
      randomUUID(),
      hotelId,
      img.secure_url,
      index === primaryIndex,
    ]);

    const [insertImg] = await connection.query(
      `INSERT INTO hotel_photos (id,hotel_id,photo_url,is_primary) VALUES ?`,
      [photoValues],
    );

    if (parsedAmenities.length > 0) {
      const amenityValues = parsedAmenities.map((amenityId) => [
        hotelId,
        amenityId,
      ]);

      await connection.query(
        `INSERT INTO hotel_amenities (hotel_id, amenity_id)
         VALUES ?`,
        [amenityValues],
      );
    }

    await connection.commit();
    return res.status(201).json({
        success: true,
        message: "Hotel created successfully"
    })
  } catch (err) {
    await connection.rollback();
    if(uploadedImages.length > 0){
        await Promise.all(
            uploadedImages.map(img =>
                cloudinary.uploader.destroy(img.public_id)
            )
        )
    }

    console.error("Create hotel error:", err);
    res.status(500).json({ message: "Server error",success: false });
  }finally{ connection.release();}
};
