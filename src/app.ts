import "./index";

import express from "express";
import { port } from "#config/app";

const app = express();

app.listen(port, "0.0.0.0", () => {
	console.log(`Serving on http://localhost:${port}`);
});
