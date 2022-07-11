import prisma from "src/lib/prisma";

export default async function addUsers(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { ...data } = req.body;

  try {
    await prisma.supplier.create({ data });
    res.status(200);
    res.json({
      message: "Data successfully added",
      data,
    });
  } catch (error) {
    res.status(400);
    console.log(error)
    res.json({
      message: "Failed insert data to database",
    });
  }
}
