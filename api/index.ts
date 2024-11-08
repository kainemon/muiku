import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger"
import { handle } from "hono/vercel";
import { router } from "./router";

export const config = {
    runtime: "edge"
}

const api = new Hono().basePath("/api");

api.use(cors());
api.use(logger());

api.get("/", (c) => {
    return c.json({
        message: "UP & Running 🎉",
        author: "https://github.com/kainemon"
    });
});

api.route("/", router);

export default handle(api);