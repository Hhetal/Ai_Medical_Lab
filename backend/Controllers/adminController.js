import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Users Found",
      data: users
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err.message
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message
    });
  }
};

export const deleteDoctorById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    
    if (!deletedDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting doctor",
      error: error.message
    });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Doctors Found",
      data: doctors
    });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching doctors",
      error: err.message
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user", "name email")
      .populate("doctor", "name email");

    res.status(200).json({
      success: true,
      message: "Bookings Found",
      data: bookings
    });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: err.message
    });
  }
};

export const updateDoctorApprovalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor approval status updated successfully",
      data: updatedDoctor
    });
  } catch (error) {
    console.error("Error updating doctor approval status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating doctor approval status",
      error: error.message
    });
  }
};
