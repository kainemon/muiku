import { Hono } from "hono";
import { getTrending, getPopular, getUpcoming, getInfo } from "./modules";
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

router.get("/upcoming/:page?/:per?", async (c) => {
    try {
        const { page, per } = c.req.param();
        const pagination = {
            page: page && isNumber(page) ? parseInt(page) : 1,
            per: per && isNumber(per) ? parseInt(per) : 20
        }
        const data = await getUpcoming(pagination.page, pagination.per);
        return c.json(data, 200);
    } catch (error) {
        if (error instanceof ErrorHandler)
            return c.json({
                status: error.status,
                error: error.message
            }, error.status);
    }
});

router.get("/info/:id", async (c) => {
    try {
        const { id } = c.req.param();
        if (id && isNumber(id)) {
            const data = await getInfo(parseInt(id));
            return c.json(data, 200);
        } else {
            return c.json({
                status: 400,
                error: "A proper (id) is required!"
            }, 400);
        }
    } catch (error) {
        if (error instanceof ErrorHandler)
            return c.json({
                status: error.status,
                error: error.message
            }, error.status);
    }
});