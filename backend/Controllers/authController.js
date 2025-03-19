import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;

    // Check if user already exists
    if (role === "patient" || role === "admin") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user based on role
    if (role === "patient" || role === "admin") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    } else if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();
    res.status(200).json({ success: true, message: "User successfully created" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error, try again" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;

    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    const admin = await User.findOne({ email, role: "admin" });

    // Check which user exists
    if (patient) {
      user = patient;
      console.log("Logged in as Patient");
    }
    if (doctor) {
      user = doctor;
      console.log("Logged in as Doctor");
    }
    if (admin) {
      user = admin;
      console.log("Logged in as Admin");
    }

    // If user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ status: false, message: "Invalid Credentials, try again" });
    }

    // Generate JWT Token
    const token = generateToken(user);
    console.log("Generated Token:", token); // For debugging

    // Destructure user data (exclude password)
    const { password: userPassword, role, appointments, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     let user = null;

//     const patient = await User.findOne({ email });
//     const doctor = await Doctor.findOne({ email });
//     const admin = await User.findOne({ email, role: "admin" }); // Add admin check

//     if (patient) {
//       user = patient;
//     }
//     if (doctor) {
//       user = doctor;
//     }
//     if (admin) {
//       // Handle admin login
//       user = admin;
//     }

//     //check if user exist
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     //compare password
//     const isPasswordMatch = await bcrypt.compare(password, user.password);

//     if (!isPasswordMatch) {
//       return res
//         .status(404)
//         .json({ status: false, message: "Invalid Credentials, try again" });
//     }

//     // get token
//     const token = generateToken(user);
//     const { password: userPassword, role, appointments, ...rest } = user._doc;
//     res.status(200).json({
//       status: true,
//       message: "Successfully login",
//       token,
//       data: { ...rest },
//       role,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: false, message: "Failed to login" });
//   }
// };
