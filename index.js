const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./utils/dbConnect");

const authRoute = require("./routes/auth.routes");
const testimonialRoute = require("./routes/testimonial.routes");
const teamRoute = require("./routes/team.routes");
const partnerRoute = require("./routes/partner.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "Welcome to the API",
  });
});

app.use("/auth", authRoute);
app.use("/testimonial", testimonialRoute);
app.use("/team", teamRoute);
app.use("/partner", partnerRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnect();
});
