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
  await prisma.user.createMany({
    data: [
      {
        name: 'Admin',
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'admin',
        phone: '098765271',
        role: "ADMIN"
      },
      {
        name: 'User',
        username: 'user',
        email: 'user@gmail.com',
        password: 'user',
        phone: '098765271',
        role: "USER"
      },
    ]
  })

  console.log("Added item data");
}

seeder();
