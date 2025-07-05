
import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";

const app = new Hono()
    .get("/", 
        clerkMiddleware(), // memastikan apakah user sudah login apa belum
        async (c) => {
            const auth = getAuth(c);

            if(!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const data = await db // menampilkan value tabel data akun di database
                .select({
                    id: accounts.id,
                    name: accounts.name
                })
                .from(accounts)
                .where(eq(accounts.userId, auth.userId));

            return c.json({ data })
        })
    .post("/", 
        clerkMiddleware(), // memastikan apakah user sudah login apa belum
        zValidator("json", insertAccountSchema.pick({ // memastikan request body, params, query, atau headers sesuai dengan schema yang kamu definisikan pakai Zod.
            name: true,
        })),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json")

            if(!auth?.userId) {
                return c.json({ error: "Unathorized" }, 401)
            }

            const [data] = await db
                .insert(accounts)
                .values({ // insert data ke database
                    id: createId(),
                    userId: auth.userId,
                    ...values,
                })
                .returning();

            return c.json({ data });
    })

export default app;




