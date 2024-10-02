require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Conntection URL
const uri = `mongodb+srv://dextermiranda441:ZTKQ94nSwtW81tcW@cluster0.swfod.mongodb.net/ratan`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

// Routes import
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/reviews');
const cartRoutes = require('./routes/carts');
const favouriteRoutes = require('./routes/favourites');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const paymentRoutes = require('./routes/payments');
const userRoutes = require('./routes/users');

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Database
    const db = client.db('urbanAuraDb');

    // Database Collections
    const productsCollection = db.collection('products');
    const cartsCollection = db.collection('carts');
    const favouritesCollection = db.collection('favourites');
    const ordersCollection = db.collection('orders');
    const reviewsCollection = db.collection('reviews');

    // Routes
    app.use('/api/products', productRoutes(productsCollection));
    app.use('/api/reviews', reviewRoutes(reviewsCollection));
    app.use('/api/carts', cartRoutes(cartsCollection));
    app.use('/api/favourites', favouriteRoutes(favouritesCollection));
    app.use('/api/orders', orderRoutes(ordersCollection, cartsCollection));
    app.use('/api/admin', adminRoutes(ordersCollection, productsCollection));
    app.use('/api/users', userRoutes());
    app.use('/api/payments', paymentRoutes());

    // JWT Token API
    app.post('/jwt', (req, res) => {
      const user = req.body;

      console.log({ user });
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30d'
      });
      res.send({ token });
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send(`server is running`);
});

app.listen(port, () => {
  console.log(` server is running on port: ${port}`);
});
