const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

async function seeder() {
  await prisma.supplier.deleteMany();
  console.log("Deleted records in supplier table");

  await prisma.supplier.createMany({
    data: [
      {
        name: `Toko Jaya Abadi`,
        phone: "865715239",
        address: `Jl. Airlangga No. 21`,
      },
      {
        name: `UD Namira Mart`,
        phone: "800086159",
        address: `Jl. Kertajaya No. 18`,
      }
    ],
  });

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
