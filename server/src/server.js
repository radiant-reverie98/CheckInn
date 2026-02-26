import 'dotenv/config'
import app from './app.js'
import pool from './config/db.js'


const PORT = process.env.PORT || 5000


const startServer = async()=>{
    try{
        await pool.query("SELECT 1");
        console.log("Database connected successfully")

        app.listen(PORT,()=>{
            console.log(`Server listening on port ${PORT}`)
        })
    }catch(err){
        console.log(`Database connection failed`)
        process.exit(1);
    }
}

startServer();
