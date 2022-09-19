import prisma from "src/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { ...data } = req.body;
  try {
    await prisma.goods.create({ data });
    res.status(200);
    res.json({
      message: "Data successfully added",
      data
    });
  } catch (error) {
    console.log(error)
    res.status(400);
    res.json({
      message: "Failed insert data to database",
    });
  }
}
