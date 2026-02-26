import pool from "../../config/db.js";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export const guestRegister = async (req, res) => {
  const connection = await pool.getConnection();
  const userId = randomUUID();
  try {
    const { name, email, password ,phone} = req.body;
    console.log(req.body)
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Missing client credentials",
      });
    }

    await connection.beginTransaction();

    const hashedPassword = await bcrypt.hash(password, 10);
    let finalUserId;
    try {
      const [insertUser] = await connection.query(
        `INSERT INTO users (id,name,email,password,phone) VALUES (?,?,?,?,?)`,
        [userId, name, email, hashedPassword,phone],
      );

      finalUserId = userId;
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        const [existingUser] = await connection.query(
          `SELECT id FROM users WHERE email = ?`,
          [email],
        );
        if (existingUser.length === 0) {
          throw err;
        }
        finalUserId = existingUser[0].id;
      } else throw err;
    }

    const [roleCheck] = await connection.query(
      `SELECT 1
       FROM user_roles ur
       JOIN roles r ON ur.role_id = r.id
       WHERE ur.user_id = ?
       AND r.name = 'GUEST'
       LIMIT 1`,
      [finalUserId],
    );

    if (roleCheck.length === 0) {
      const [roleResult] = await connection.query(
        `SELECT id FROM roles WHERE name = 'GUEST'`,
      );
      if (roleResult.length === 0) {
        await connection.rollback();
        return res.status(500).json({
          success: false,
          message: "Role configuration errror",
        });
      }
      const roleId = roleResult[0].id;
      const [insertRole] = await connection.query(
        `INSERT INTO user_roles (user_id, role_id)
         VALUES (?, ?)`,
        [finalUserId, roleId],
      );
      if (insertRole.affectedRows === 0) {
        await connection.rollback();
        return res.status(500).json({
          success: false,
          message: "Unable to update role",
        });
      }
    }
    await connection.commit();

    const [roles] = await connection.query(
      `SELECT r.name AS role
       FROM user_roles ur
       JOIN roles r ON ur.role_id = r.id
       WHERE ur.user_id = ?`,
      [finalUserId],
    );
    const roleNames = roles.map((r) => r.role);
    const token = jwt.sign(
      {
        userId: finalUserId,
        roles: roleNames,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(201).json({success: true,
        message: "Registered successfully"
    })
  } catch (err) {
    await connection.rollback();
    console.log(`Server error: ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  } finally {
    connection.release();
  }
};

export const guestLogin = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing client credentials",
      });
    }

    const [checkUser] = await connection.query(`SELECT id,password FROM users WHERE email = ?`,[email])
    let hashedPassword;
    let userId;
    const userExist = checkUser.length > 0;
    if(!userExist){
        return res.status(401).json({success: false,
            message: "Authentication failed. No user found"
        })
    }
    if(userExist){
        hashedPassword = checkUser[0].password;
        userId = checkUser[0].id;
        const [role] = await connection.query(`
            SELECT 1
       FROM user_roles ur
       JOIN roles r ON ur.role_id = r.id
       WHERE ur.user_id = ?
       AND r.name = 'GUEST'
       LIMIT 1`,[userId])

       const isGuest = role.length > 0;
       if(!isGuest){
        return res.status(401).json({
            success: false,
            message: "Authentication failed."
        })

       }

       const isPasswordMatched = await bcrypt.compare(password,hashedPassword);
       if(!isPasswordMatched){
        return res.status(401).json({
            success: false,
            message: "Authentication failed."
        })
       }
       const [roles] = await connection.query(
        `SELECT r.id, r.name
FROM user_roles ur
JOIN roles r ON ur.role_id = r.id
WHERE ur.user_id = ?`,[userId]
       )
       const roleNames = roles.map((r)=> r.name)

       const token = jwt.sign(
        {
            userId,
            roles: roleNames
        },
        process.env.JWT_SECRET,
        {
            expiresIn : "7d"
        }
       )

       res.cookie("token",token,{
        httpOnly: true,
        secure: false,
        sameSite: "strict"
       })

       return res.status(200).json({
        success: true,
        message: "Login successful"
       })
    }
  } catch (err) {
    console.log(`Login error: ${err.message}`)
    return res.status(500).json({message: "Internal server errror"})
  }finally {connection.release();}
};


export const ownerRegister = async (req, res) => {
  const connection = await pool.getConnection();
  const userId = randomUUID();

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing client credentials",
      });
    }

    await connection.beginTransaction();

    const hashedPassword = await bcrypt.hash(password, 10);
    let finalUserId;

    try {
      await connection.query(
        `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
        [userId, name, email, hashedPassword]
      );

      finalUserId = userId;

    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        const [existingUser] = await connection.query(
          `SELECT id FROM users WHERE email = ?`,
          [email]
        );

        if (existingUser.length === 0) {
          throw err;
        }

        finalUserId = existingUser[0].id;
      } else {
        throw err;
      }
    }

    const [roleCheck] = await connection.query(
      `SELECT 1
       FROM user_roles ur
       JOIN roles r ON ur.role_id = r.id
       WHERE ur.user_id = ?
       AND r.name = 'OWNER'
       LIMIT 1`,
      [finalUserId]
    );

    if (roleCheck.length === 0) {
      const [roleResult] = await connection.query(
        `SELECT id FROM roles WHERE name = 'OWNER'`
      );

      if (roleResult.length === 0) {
        await connection.rollback();
        return res.status(500).json({
          success: false,
          message: "Role configuration error",
        });
      }

      const roleId = roleResult[0].id;

      const [insertRole] = await connection.query(
        `INSERT INTO user_roles (user_id, role_id)
         VALUES (?, ?)`,
        [finalUserId, roleId]
      );

      if (insertRole.affectedRows === 0) {
        await connection.rollback();
        return res.status(500).json({
          success: false,
          message: "Unable to update role",
        });
      }
    }

    await connection.commit();

    const [roles] = await connection.query(
      `SELECT r.name AS role
       FROM user_roles ur
       JOIN roles r ON ur.role_id = r.id
       WHERE ur.user_id = ?`,
      [finalUserId]
    );

    const roleNames = roles.map(r => r.role);

    const token = jwt.sign(
      {
        userId: finalUserId,
        roles: roleNames,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(201).json({
      success: true,
      message: "Registered successfully"
    });

  } catch (err) {
    await connection.rollback();
    console.log(`Server error: ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  } finally {
    connection.release();
  }
};

export const ownerLogin = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing client credentials",
      });
    }

    const [checkUser] = await connection.query(
      `SELECT id,password,last_selected_hotel_id FROM users WHERE email = ?`,
      [email]
    );

    let hashedPassword;
    let userId;

    const userExist = checkUser.length > 0;

    if (!userExist) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. No user found",
      });
    }

    if (userExist) {
      hashedPassword = checkUser[0].password;
      userId = checkUser[0].id;

      const [role] = await connection.query(
        `
            SELECT 1
            FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = ?
            AND r.name = 'OWNER'
            LIMIT 1`,
        [userId]
      );

      const isOwner = role.length > 0;

      if (!isOwner) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed.",
        });
      }

      const isPasswordMatched = await bcrypt.compare(
        password,
        hashedPassword
      );

      if (!isPasswordMatched) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed.Wrong password",
        });
      }

      const [roles] = await connection.query(
        `SELECT r.id, r.name
         FROM user_roles ur
         JOIN roles r ON ur.role_id = r.id
         WHERE ur.user_id = ?`,
        [userId]
      );

      const roleNames = roles.map((r) => r.name);

      const token = jwt.sign(
        {
          userId,
          roles: roleNames,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        hotelId: userExist.last_selected_hotel_id
      });
    }
  } catch (err) {
    console.log(`Login error: ${err.message}`);
    return res.status(500).json({
      message: "Internal server errror",
    });
  } finally {
    connection.release();
  }
};


export const ownerLogout = async(req,res)=>{
  try{
    const userId = req.user.userId;
  const [fetchUser] = await pool.query(`SELECT id,name from users WHERE id = ?`,[userId])
  if(fetchUser.length === 0){
    return res.status(401).json({
      success: false,
      message: "Unauthorized access"
    })
  }

  res.clearCookie("token",{
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  })

  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  })
  }catch(err){
    console.log(`LOGOUT ERR: ${err.message}`)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const checkSession = async(req,res) => {
  try{
    const userExist = req.user;
    if(userExist){
      return res.status(200).json({
        success: true
      })
    }
    return res.status(404).json({
      success: false
    })
  }catch(err){
    console.log(`USER EXIST CHECK ERR : ${err.message}`)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}


export const isUser = async (req, res) => {
  try {
    if (req.user && req.user.role === "GUEST") {
      return res.status(200).json({
        success: true,
      });
    }

    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
    });

  } catch (err) {
    console.log(`GUEST ERR: ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};