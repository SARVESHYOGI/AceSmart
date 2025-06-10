import { Request, Response } from 'express';
import { compare, genSaltSync, hashSync } from 'bcrypt-ts';
import { IUser, User } from '../models/User.model';
import generateToken from '../config/generateToken';

export const loginRoute = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email }) as IUser;
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id, user.role);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const registerRoute = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const findEmail = await User.findOne({ email });
        
        if (findEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        const token = generateToken(user._id.toString(), user.role);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
