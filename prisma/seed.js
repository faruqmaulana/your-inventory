const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

async function seeder() {
  await prisma.supplier.deleteMany();
  console.log("Deleted records in supplier table");

  for (let i = 1; i <= 10; i++) {
    await prisma.supplier.create({
      data: {
        name: `Supplier ${i}`,
        phone: "865715239",
        address: `Jl. Airlangga No. ${i}`,
      },
    });
  }

  console.log("Added item data");
}

seeder();
