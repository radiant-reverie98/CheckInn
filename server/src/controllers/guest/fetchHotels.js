import pool from '../../config/db.js'

export const getTopThreeHotels = async (req, res) => {
  try {
    let { checkIn, checkOut } = req.query;

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date) =>
      date.toISOString().split("T")[0];

    if (!checkIn || !checkOut) {
      checkIn = formatDate(today);
      checkOut = formatDate(tomorrow);
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      return res.status(400).json({
        success: false,
        message: "checkOut must be after checkIn",
      });
    }

    const query = `
      SELECT 
        h.id,
        h.hotel_name,
        h.city,
        h.state,
        h.created_at,

        (
          SELECT hp.photo_url
          FROM hotel_photos hp
          WHERE hp.hotel_id = h.id
            AND hp.is_primary = TRUE
          LIMIT 1
        ) AS photo_url,

        IFNULL(AVG(r.rating), 0) AS avg_rating,
        COUNT(DISTINCT r.id) AS review_count,

        (
          SELECT MIN(rm2.price_per_night)
          FROM rooms rm2
          WHERE rm2.hotel_id = h.id
            AND rm2.is_active = TRUE
            AND rm2.total_rooms >
            (
              SELECT IFNULL(SUM(bi.quantity), 0)
              FROM booking_items bi
              INNER JOIN bookings b
                ON b.id = bi.booking_id
              WHERE bi.room_id = rm2.id
                AND b.booking_status_id = 2
                AND NOT (
                  b.check_out <= ?
                  OR b.check_in >= ?
                )
            )
        ) AS starting_price

      FROM hotels h

      INNER JOIN rooms rm 
        ON rm.hotel_id = h.id 
        AND rm.is_active = TRUE

      LEFT JOIN reviews r 
        ON r.hotel_id = h.id

      WHERE EXISTS (
        SELECT 1
        FROM rooms room_check
        WHERE room_check.hotel_id = h.id
          AND room_check.is_active = TRUE
          AND room_check.total_rooms >
          (
            SELECT IFNULL(SUM(bi.quantity), 0)
            FROM booking_items bi
            INNER JOIN bookings b
              ON b.id = bi.booking_id
            WHERE bi.room_id = room_check.id
              AND b.booking_status_id = 2
              AND NOT (
                b.check_out <= ?
                OR b.check_in >= ?
              )
          )
      )

      GROUP BY 
        h.id,
        h.hotel_name,
        h.city,
        h.state,
        h.created_at

      ORDER BY 
        CASE WHEN COUNT(r.id) > 0 THEN 1 ELSE 0 END DESC,
        avg_rating DESC,
        review_count DESC,
        h.created_at DESC

      LIMIT 3
    `;

    const [rows] = await pool.query(query, [
      checkIn,
      checkOut,
      checkIn,
      checkOut,
    ]);

    return res.status(200).json({
      success: true,
      count: rows.length,
      hotels: rows,
    });

  } catch (err) {
    console.error("TOP 3 HOTELS ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};