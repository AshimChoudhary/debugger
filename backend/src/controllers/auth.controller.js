import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';
import passport from 'passport';

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 7) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 7 characters' });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email Already Exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: 'Invalid User Data' });
    }
  } catch (error) {
    console.log(`Error in Sign-UP Controller ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const login = async (req, res) => {
  console.log('LOGIN REQUEST BODY:', req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect == false) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(`Error in Login Controller ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged Out Successfully' });
  } catch (error) {
    console.log(`Error in Log Out Controller ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: 'Profile Pic is required' });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(`Error in updating Profile ${error.message}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(`Error in Check-Auth Controller ${error.message}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

export const googleCallback = (req, res) => {
  passport.authenticate(
    'google',
    { failureRedirect: '/login' },
    (err, user) => {
      if (err) {
        console.error('Google OAuth error:', err);
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=oauth_failed`
        );
      }

      if (!user) {
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=oauth_failed`
        );
      }

      generateToken(user._id, res);

      res.redirect(`${process.env.FRONTEND_URL}/?oauth=success`);
    }
  )(req, res);
};

export const githubAuth = passport.authenticate('github', {
  scope: ['user:email'],
});

export const githubCallback = (req, res) => {
  passport.authenticate(
    'github',
    { failureRedirect: '/login' },
    (err, user) => {
      if (err) {
        console.error('GitHub OAuth error:', err);
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=oauth_failed`
        );
      }

      if (!user) {
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=oauth_failed`
        );
      }

      generateToken(user._id, res);

      res.redirect(`${process.env.FRONTEND_URL}/?oauth=success`);
    }
  )(req, res);
};
