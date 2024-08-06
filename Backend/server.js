import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import paymentRoute from "./routes/paymentRoute.js";
import recipeData from "./routes/recipeRoute.js";
import updatePointsRoute from "./routes/updatePointsRoute.js";
import nodemailer from "nodemailer";
dotenv.config();
const app = express();
app.use(express.json());
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Configure the transporter
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "name.kirlin@ethereal.email",
      pass: "XfB1M216dzYaXU7hzJ",
    },
  });

  // Set up email data
  let mailOptions = {
    from: email,
    to: "syedh2958@gmail.com",
    subject: "New Contact Form Submission",
    text: `You have a new contact form submission:
    Name: ${firstName} ${lastName}
    Email: ${email}
    Phone: ${phone}
    Message: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).send({ message: "Failed to send email", error });
  }
});

app.get("/", (req, res) => {
  res.send("Hurray Api is running");
});

app.use("/api/users", userRoutes);
app.use("/api", paymentRoute);
app.use("/api", recipeData);
app.use("/api", updatePointsRoute);

const PORT = process.env.PORT || 7000;

app.listen(
  PORT,
  console.log(
    `App running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
