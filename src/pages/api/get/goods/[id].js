import prisma from "src/lib/prisma";

export default async function addUsers(req, res) {
    if (req.method !== "GET") return res.status(405).end();
    const { id } = req.query;
    try {
        const data = await prisma.goods.findMany({ where: id });
        res.status(200);
        res.json({ data });
    } catch (error) {
        res.status(400);
        res.json({
            message: "Failed insert data to database",
        });
    }
}
