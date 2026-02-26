import pool from "../../config/db.js"
import bcrypt from "bcrypt"

export const updateLastSelectedHotel = async(req,res)=>{
    try{
        const {hotelId} = req.body;
        if(!hotelId){
            return res.status(400).json({
                success: false,
                message: "Hotel id is required"
            })
        }

        // Verify hotel belongs to the user
        const[hotel] = await pool.query(`SELECT id FROM hotels WHERE id = ? AND owner_id = ?`,[hotelId,req.user.userId])
        if(hotel.length === 0){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access. Logout immediately"
            })
        }
        const [update] = await pool.query(`UPDATE users SET last_selected_hotel_id = ? WHERE id = ?`,[hotelId,req.user.userId])
        if(update.affectedRows === 0){
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }

        return res.status(200).json({
            success: true,
            message: "updated-hotel-id"
        })

    }catch(err){
        console.log(`SERVER ERR: ${err.message}`)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const hotelForNavbar = async(req,res) =>{
    try{
        const ownerId = req.user.userId;

        const [hotels] = await pool.query(`SELECT id,hotel_name FROM hotels WHERE owner_id = ?`,[ownerId])
        if(hotels.length === 0){
            return res.status(200).json({
                success: true,
                message: "No record found",
                hotels
            })
        }
        return res.status(200).json({
            success: true,
            message: "Fetched hotels successfully",
            hotels
        })
    }catch(err){
        console.log(`SERVER ERR: ${err.message}`)
        return res.status(500).json({message: "Internal server error",
            success: false
        })
    }
}


export const profileSettings = async(req,res) => {
    try{
        const userId = req.user.userId;
        const[userInfo] = await pool.query(`SELECT name,email,phone FROM users WHERE id = ?`,[userId])
        if(userInfo.length === 0){
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
        return res.status(200).json({
            success: true,
            userInfo
        })
    }catch(err){
        console.log(`SERVER ERR: ${err.message}`)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const updateProfileSettings = async(req,res)=>{
    try{
        const {name,email,phone} = req.body;
        if(!name || !email || !phone){
            return res.status(400).json({
                success: false,
                message: "Missing client credentials"
            })
        }

        const userId = req.user.userId
        const [updateQuery] = await pool.query(`UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?`,[name,email,phone,userId])
        if(updateQuery.affectedRows === 0){
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Updated client details successfully"
        })
    }catch(err){
        console.log(`SERVER ERR: ${err.message}`)
        return res.status(500).json({
            success: false,
            message: "Internal server errror"
        })
    }
}


export const hotelSettings = async(req,res)=>{
    try{
        const userId = req.user.userId;
        const {hotelId} = req.params;

        const [hotelResult] = await pool.query(`SELECT hotel_name,street_address,state,city,long_description FROM hotels WHERE id = ? AND owner_id = ?`,[hotelId,userId])
        if(hotelResult.length === 0){
            return res.status(200).json({
                success: true,
                recordAvailable: false,
                message: "No records found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Hotel details fetched successfully",
            recordAvailable: true,
            hotelResult
        })
    }catch(err){
        console.log(`SERVER ERR: ${err.message}`)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const updateHotelSettings = async(req,res)=>{
    try{
        const {hotel_name,street_address,state,city,long_description} = req.body;
        const userId = req.user.userId;
        const {hotelId} = req.params;

        const [updateHotel] = await pool.query(`UPDATE hotels SET hotel_name = ?,street_address=?,state=?,city=?, long_description = ? WHERE id = ? AND owner_id = ?`,[hotel_name,street_address,state,city,long_description,hotelId,userId])
        
        if(updateHotel.affectedRows === 0){
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Update hotel successfully"
        })
    }catch(err){
        console.log(`SERVER ERR: ${err.message}`)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const updatePassword = async(req,res)=>{
    try{
        const userId = req.user.userId;
        const {currentPass,newPass,confirmPass} = req.body;
        
        const [existPassword] = await pool.query(`SELECT password FROM users WHERE id = ?`,[userId])

        const isMatchExisting = await bcrypt.compare(currentPass,existPassword[0].password)
        if(!isMatchExisting){
            return res.status(400).json({
                success: false,
                passWordMatch: false,
                message: "Wrong password"
            })
        }

        if(newPass !== confirmPass){
            return res.status(400).json({
                success: false,
                passWordMatch: false,
                message: "Entered passwords do not match"
            })
        }

        const hashedPassword = await bcrypt.hash(newPass,10);
        const [updatePassword] = await pool.query(`UPDATE users SET password = ?`,[hashedPassword])
        if(updatePassword.affectedRows === 0){
            return res.status(500).json({
                success: false,
                passWordMatch: false,
                message: "Internal server error"
            })
        }

        return res.status(201).json({
            success: true,
            passWordMatch: true,
            message: "Password updated successfully"
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            passWordMatch: false,
            message: "Internal server error"
        })
    }
}
