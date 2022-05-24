import "./index";

import { HttpStatus } from "#constants/http";
import { port } from "#config/app";
import express from "express";
import cors from "cors";

const app = express();

app.use(
	cors({
		origin: "*",
		optionsSuccessStatus: HttpStatus.Ok,
		credentials: true,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, "0.0.0.0", () => {
	console.log(`Serving on http://localhost:${port}`);
});
