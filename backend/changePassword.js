require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

async function changePassword(email, newPassword) {
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashed }
    );
    if (!user) {
      console.log("User not found!");
    } else {
      console.log(`Password successfully changed for ${email}`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

const emailToChange = ""; 
const newPassword = "";     
changePassword(emailToChange, newPassword);
