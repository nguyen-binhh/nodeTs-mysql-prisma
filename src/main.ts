import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";

import rootRouter from "./routes";
import { errorMiddleware } from "./middlewares/errors";

const app: Express = express();
app.use(express.json())

app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
    log: ['query']
})

app.use(errorMiddleware)

app.listen(PORT, () => console.log("working in port:" + PORT));
