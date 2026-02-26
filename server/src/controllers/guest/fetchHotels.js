import pool from "../../config/db.js";

export const getHotelCards = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    /* ------------ PARAMS ------------ */
    const { page = 1, limit = 10, checkIn, checkOut } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const offset = (pageNum - 1) * limitNum;

    /* ------------ DATE FALLBACK ------------ */
    let searchCheckIn = checkIn;
    let searchCheckOut = checkOut;

    if (!searchCheckIn || !searchCheckOut) {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      searchCheckIn = today.toISOString().slice(0, 10);
      searchCheckOut = tomorrow.toISOString().slice(0, 10);
    }

    /* ------------ CONFIRMED STATUS ------------ */
    const [[statusRow]] = await connection.query(
      `SELECT id FROM booking_statuses WHERE name='confirmed'`,
    );

    if (!statusRow) {
      return res.status(500).json({
        success: false,
        message: "Confirmed booking status missing",
      });
    }

    const confirmedStatusId = statusRow.id;

    /* ------------ MAIN QUERY ------------ */
    const [hotels] = await connection.query(
      `
      SELECT 
          ph.id,
          ph.hotel_name,
          ph.city,

          MAX(hp.photo_url) AS primary_photo,

          MIN(r.price_per_night) AS min_price,

          COALESCE(SUM(r.total_rooms),0) AS total_rooms,
          COALESCE(SUM(bi.quantity),0) AS booked_rooms,
          COALESCE(SUM(r.total_rooms),0) - COALESCE(SUM(bi.quantity),0) AS available_rooms,

          CASE 
              WHEN COALESCE(SUM(r.total_rooms),0) - COALESCE(SUM(bi.quantity),0) <= 0
              THEN TRUE ELSE FALSE
          END AS sold_out

      FROM (
          SELECT id, hotel_name, city
          FROM hotels
          ORDER BY created_at DESC
          LIMIT ? OFFSET ?
      ) ph

      LEFT JOIN hotel_photos hp
        ON hp.hotel_id = ph.id
        AND hp.is_primary = TRUE

      LEFT JOIN rooms r
        ON r.hotel_id = ph.id
        AND r.is_active = TRUE

      LEFT JOIN booking_items bi
        ON bi.room_id = r.id

      LEFT JOIN bookings b
        ON b.id = bi.booking_id
        AND b.booking_status_id = ?
        AND b.check_in < ?
        AND b.check_out > ?

      GROUP BY ph.id, ph.hotel_name, ph.city
      HAVING total_rooms > 0
      `,
      [limitNum, offset, confirmedStatusId, searchCheckOut, searchCheckIn],
    );

    /* ------------ TOTAL COUNT ------------ */
    const [[countRow]] = await connection.query(`
        SELECT COUNT(DISTINCT h.id) AS total
        FROM hotels h
        JOIN rooms r ON r.hotel_id = h.id AND r.is_active = TRUE
    `);

    const total = countRow.total;

    /* ------------ RESPONSE ------------ */
    return res.json({
      success: true,

      searchDates: {
        checkIn: searchCheckIn,
        checkOut: searchCheckOut,
      },

      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },

      data: hotels,
    });
  } catch (err) {
    console.error("getHotelCards error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch hotel cards",
      error: err.message,
    });
  } finally {
    connection.release();
  }
};



export const fetchHotelDetail = async (req, res) => {

  try {

    const { hotelId } = req.params;

    /* ------------ HOTEL BASIC INFO + TYPE + MIN PRICE ------------ */
    const [hotelRows] = await pool.query(
      `
      SELECT 
          h.id,
          h.hotel_name,
          h.short_tagline,
          h.long_description,
          h.city,
          h.state,
          h.street_address,
          h.google_maps_link,
          ht.name AS hotel_type,

          MIN(r.price_per_night) AS min_price

      FROM hotels h

      LEFT JOIN hotel_types ht
        ON ht.id = h.hotel_type_id

      LEFT JOIN rooms r
        ON r.hotel_id = h.id
        AND r.is_active = TRUE

      WHERE h.id = ?

      GROUP BY 
        h.id, h.hotel_name, h.short_tagline, h.long_description,
        h.city, h.state, h.street_address, h.google_maps_link, ht.name
      `,
      [hotelId]
    );

    if (!hotelRows.length) {
      return res.status(404).json({
        success:false,
        message:"Hotel not found"
      });
    }

    const hotelInfo = hotelRows[0];

    /* ------------ ALL HOTEL PHOTOS ------------ */
    const [photos] = await pool.query(
      `
      SELECT id, photo_url, is_primary
      FROM hotel_photos
      WHERE hotel_id = ?
      ORDER BY is_primary DESC, created_at ASC
      `,
      [hotelId]
    );

    /* ------------ AMENITIES WITH NAMES ------------ */
    const [amenities] = await pool.query(
      `
      SELECT a.id, a.name
      FROM hotel_amenities ha
      JOIN amenities a ON a.id = ha.amenity_id
      WHERE ha.hotel_id = ?
      ORDER BY a.name
      `,
      [hotelId]
    );

    /* ------------ RESPONSE ------------ */
    return res.status(200).json({
      success:true,
      hotel: hotelInfo,
      photos,
      amenities
    });

  } catch(err){

    console.error("HOTEL DETAIL FETCH ERROR:", err);

    return res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
};




export const fetchAvailableRooms = async (req, res) => {
  try {
    const { hotelId } = req.params;
    let { checkIn, checkOut } = req.query;

    if (!checkIn || !checkOut) {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      checkIn = today.toISOString().slice(0,10);
      checkOut = tomorrow.toISOString().slice(0,10);
    }

    const [[statusRow]] = await pool.query(
      `SELECT id FROM booking_statuses WHERE name='confirmed'`
    );

    if (!statusRow) {
      return res.status(500).json({
        success:false,
        message:"Confirmed booking status missing"
      });
    }

    const confirmedStatusId = statusRow.id;

    const [rooms] = await pool.query(
      `
      SELECT 
          r.id AS room_id,
          rt.name AS room_type,
          r.price_per_night,
          r.max_guests,
          MAX(rp.photo_url) AS primary_photo,
          r.total_rooms - COALESCE(SUM(bi.quantity),0) AS available_rooms
      FROM rooms r
      JOIN room_types rt ON rt.id = r.room_type_id
      LEFT JOIN room_photos rp ON rp.room_id = r.id AND rp.is_primary = TRUE
      LEFT JOIN booking_items bi ON bi.room_id = r.id
      LEFT JOIN bookings b
        ON b.id = bi.booking_id
        AND b.booking_status_id = ?
        AND b.check_in < ?
        AND b.check_out > ?
      WHERE r.hotel_id = ?
      AND r.is_active = TRUE
      GROUP BY r.id, rt.name, r.price_per_night, r.max_guests, r.total_rooms
      HAVING available_rooms > 0
      ORDER BY r.price_per_night ASC
      `,
      [confirmedStatusId, checkOut, checkIn, hotelId]
    );

    return res.json({
      success:true,
      searchDates:{ checkIn, checkOut },
      data: rooms
    });

  } catch(err){
    console.error("fetchAvailableRooms error:", err);
    return res.status(500).json({
      success:false,
      message:"Failed to fetch available rooms"
    });
  }
};