import "./index";

import { convertError, handleError, unknownRoute } from "#middleware";
import { HttpStatus } from "#constants/http";
import { Logger } from "#utils";
import { port } from "#config/app";

import express from "express";
import cors from "cors";

import v1 from "./routes/v1";

const app = express();

app.use(cors({ origin: "*", optionsSuccessStatus: HttpStatus.Ok, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1);

app.use(unknownRoute);

app.use(convertError);
app.use(handleError);

app.listen(port, "0.0.0.0", () => {
	Logger.info(`Serving on http://localhost:${port}`);
});
