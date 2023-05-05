const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


//port declare
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

//connect database
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useUnifiedTopology: true,
});

//create connection
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected successfully!");
});

//access to route files
const SignupRouter = require("./routes/signupRoutes.js");
const ContactRouter = require("./routes/contactUsRoutes.js");
const ReservationRouter = require("./routes/reservationRoutes.js");
const TrainerRouter = require("./routes/trainerRoutes.js");
const AdminRouter = require("./routes/adminRoutes.js")
//const UserDetailsRouter = require("./routes/userDetails.js")

app.use("/user",SignupRouter);
app.use("/contact",ContactRouter);
app.use("/reservation",ReservationRouter);
app.use("/trainer",TrainerRouter);
app.use("/admin",AdminRouter);
//app.use("/userDetails",UserDetailsRouter)


//load in port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});