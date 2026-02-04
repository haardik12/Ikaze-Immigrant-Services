import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/Admins.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(
              token,
              process.env.JWT_SECRET
            )

            req.user = await User.findById(
              decoded.id
            ).select('-password')

            return next()
        } catch (error) {
            console.error("Token verification failed", error.message);
            return res.status(401).json({message : "Token authentication failed"})
        }
    }
    return res
      .status(401)
      .json({ message: 'Token authentication failed' })
}