// src/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Myra',
      albums: {
        create: [
          {
            title: 'Beach',
            photos: {
              create: [
                { url: 'img1.png' },
                { url: 'img2.png' }
              ]
            }
          },
          {
            title: 'Mountains',
            photos: {
              create: [
                { url: 'hill1.png' }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('Dummy data inserted:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
