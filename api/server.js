const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: [
      "https://trouvailler.com","https://www.trouvailler.com", "https://admin.trouvailler.com", "http://localhost:3000"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


const packagelocationsRoutes = require('./routes/packageLocations')
const packageRoutes = require('./routes/packageRoutes')
const AdminRoutes = require('./routes/AdminRoutes')
const CategoryRoutes = require('./routes/CategoryRoutes')



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(8000, () => {
      console.log("server is up");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });


  app.use('/api/packagelocations',packagelocationsRoutes)
  app.use('/api/package',packageRoutes)
  app.use('/api/admin/auth',AdminRoutes)
  app.use('/api/category', CategoryRoutes)
