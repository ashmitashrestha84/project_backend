import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";

//! importing routes
import routes from "./routes"; //index may or maynot be written
import ENV_CONFIG from "./config/env.config";

// @types_packageName -> npm i -D  @types_packageName
//* creating app instances
const app = express();
const allowed_origins=ENV_CONFIG.ALLOWED_ORIGINS?.split(",") ?? []
console.log(allowed_origins)
//! using middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: allowed_origins,
    credentials:true,
  }),
);

//* health routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    message: "Server is up & running",
    success: true,
    status: "message",
    data: null,
  });
});

//! using routes
app.use("/api/v1", routes);

//! path not found
app.use((req: Request, res: Response, next: NextFunction) => {
  const message = `Cannot ${req.method} on ${req.path}`;
  // res.status(404).json({
  //     message,
  //     success:false,
  //     status:'fail',
  //     data:null,
  // })
  const error: any = new Error(message);
  ((error.status = "fail"), (error.statusCode = 404), next(error));
});

//* using error handler
app.use(errorHandler);

export default app;
