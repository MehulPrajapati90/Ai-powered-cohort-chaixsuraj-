import { HttpRouter } from "convex/server";
import { auth } from "./auth";

const http = new HttpRouter();

auth.addHttpRoutes(http);

export default http;