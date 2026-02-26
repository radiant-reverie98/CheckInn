import pool from '../../config/db.js'

export const fetchRoomType = async(req,res)=>{
    try{
        const [hotelType] = await pool.query(`SELECT id,name FROM room_types ORDER BY name`);
        if(!hotelType.length){
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Fetched room_type successfully",
            room_types: hotelType
        })
    }catch(err){
        console.log(`ROOM_TYPE ERR: ${err.message}`)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}