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

  app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// GET all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

//since i had a photos route defined here it ran first and did not allow the second to be run with query param

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
  res.json(albumsList)
})

app.post('/albums', async (req, res) => {
  const {title, userId} = req.body
  const album = await prisma.album.create({
    data: {
      title,
      user: {
        connect: {id:userId}
      }
    } 
  })
  res.json(album)
})

app.delete('/albums/:albumId', async (req, res) => {
  try {const albumId = parseInt(req.params.albumId, 10)
  const deletedAlbum = await prisma.album.delete({
    where:{
      id:albumId
    }
  },
)
res.json(deletedAlbum, albumId)} catch (error) {
  res.status(500).json({ error: 'Failed to delete album'})
}
})

app.get('/photos', async (req, res) => {
  const albumId = parseInt( req.query.albumId, 10)
  const photos = await prisma.photo.findMany({
    where: {
      albumId
    }
  })
  res.json(photos)
})

app.post('/photos', async (req, res) => {
  const {url, albumId} = req.body
  const photo = await prisma.photo.create({
    data: {
      url,
      album: {
        connect: {
          id: albumId
        }
      }
    }
  })
  res.json(photo)
})

app.delete('/photos/:photoId', async (req, res) => {
  try {const photoId = parseInt(req.params.photoId, 10)
  const photo = await prisma.photo.delete({
    where: {
      id: photoId
    }
  })
  res.status(204).send()} catch (error) {
    res.status(500).json({ error: 'Failed to delete photo'})
  }
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});