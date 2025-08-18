import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
const PORT = process.env.PORT || 8080;
const app = express();

//middleware
app.use(cors());
dotenv.config();
// parse JSON to a javascript object
app.use(express.json());
// logger middleware
app.use(morgan("dev"));

// router definitions
import spoonRoutes from "./routes/spoonacular-api.js";

// router mounting
app.use("/api/spoon", spoonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
