import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import testUploadRoute from "./routes/testUpload.routes.js";
import authRoute from "./routes/auth.routes.js"
import hotelRoute from "./routes/hotel.routes.js";
import hotelUtilsRoute from "./routes/hotelUtils.routes.js"
import roomUtilsRoute from "./routes/roomUtils.routes.js"
import roomRoute from "./routes/rooms.routes.js"
import landingRoute from "./routes/guest/landing.routes.js"
 const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  }),
);

app.get("/health", (req, res) => {
  res.send("Server running smoothly");
});

// Mouting Routes
app.use("/api", testUploadRoute);
app.use("/api", hotelRoute);
app.use("/api",authRoute)
app.use("/api",hotelUtilsRoute)
app.use("/api",roomUtilsRoute)
app.use("/api",roomRoute)
app.use("/api",landingRoute)
export default app;
