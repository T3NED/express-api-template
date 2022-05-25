import "./index";

import { ControllerLoader } from "#lib/controller";
import express from "express";

const app = express();
const loader = new ControllerLoader(app);
loader.serve();
