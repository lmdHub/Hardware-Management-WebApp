import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../Config/env.js";


export const signUp = async (req, res, next) => {
    // Implement user sign-up logic here
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            const error = new Error('User already exists');
            error.status = 409;
            throw error;
        }  

        // Hash the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            name: username,
            email: email,
            password: hashedPassword
        });
        await newUser.save({ session });

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                userId: newUser._id,
                email: newUser.email
            }
        });
    }

    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);    
    }
};

export const signIn = async (req, res, next) => {
    // Implement user sign-In logic here
    try{
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            error.status = 401;
            throw error;
        }

        const isPaawordValid = await bcrypt.compare(password, user.password);
        if (!isPaawordValid) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email }, 
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                userId: user._id,
            }
        });
    }
    catch (error) {
        next(error);
    }   
};

export const signOut = async (req, res, next) => {
    // Implement user sign-out logic here
    res.send({ title: 'User signed out' });
};
