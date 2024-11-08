import { Hono } from "hono";
import { getTrending, getPopular } from "./modules";
import { isNumber } from "./utils";
import ErrorHandler from "./handlers/errorHandler";

export const router = new Hono();

router.get("/trending/:page?/:per?", async (c) => {
    try {
        const { page, per } = c.req.param();
        const pagination = {
            page: page && isNumber(page) ? parseInt(page) : 1,
            per: per && isNumber(per) ? parseInt(per) : 20
        }
        const data = await getTrending(pagination.page, pagination.per);
        return c.json(data, 200);
    } catch (error) {
        if (error instanceof ErrorHandler)
            return c.json({
                status: error.status,
                error: error.message
            }, error.status);
    }
});

router.get("/popular/:page?/:per?", async (c) => {
    try {
        const { page, per } = c.req.param();
        const pagination = {
            page: page && isNumber(page) ? parseInt(page) : 1,
            per: per && isNumber(per) ? parseInt(per) : 20
        }
        const data = await getPopular(pagination.page, pagination.per);
        return c.json(data, 200);
    } catch (error) {
        if (error instanceof ErrorHandler)
            return c.json({
                status: error.status,
                error: error.message
            }, error.status);
    }
});