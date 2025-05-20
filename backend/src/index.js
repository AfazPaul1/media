const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
console.log(prisma.user);
prisma.$connect()
  .then(() => {
    console.log('✅ Connected to DB via Prisma');
  })
  .catch((err) => {
    console.error('❌ Failed to connect:', err);
  });

// GET all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});


// GET all photos
app.get('/photos', async (req, res) => {
  const photos = await prisma.photo.findMany({ include: { album: true } });
  res.json(photos);
});

app.post('/addUsers', async (req, res) => {
  const {name, albumsData} = req.body
  const newUser = await prisma.user.create({
    data: {
      name, 
    }
  })
  res.json(newUser)
})

app.delete('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const {id:deletedId} =   await prisma.user.delete({where: {id}})
  res.json({message: `User ${deletedId} deleted`, deletedId})
})
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
  }
app.get('/albums', async (req, res) => {
  const userId = parseInt(req.query.userId, 10)
  const albumsList = await prisma.album.findMany({where: {userId}})
  pause(1000)
  res.json(albumsList)
})




app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});