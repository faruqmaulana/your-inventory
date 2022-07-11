import prisma from "src/lib/prisma";

export default async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).end();
    const { ...data } = req.body;
    try {
        await prisma.category.update({ where: { id: data.id }, data });
        res.status(200);
        res.json({
            message: "Data successfully updated!",
            data: { ...data },
        });
    } catch (error) {
        console.log(error)
        res.status(400);
        res.json({
            message: "Failed update data!",
        });
    }
}
