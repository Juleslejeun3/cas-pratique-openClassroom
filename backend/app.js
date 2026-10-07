const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');

const app = express();

// Connexion MongoDB
mongoose.connect(
  'mongodb+srv://juleslejeun3_db_user:Ge4cyg88ovYJTVQt@caspatiqueopenclass.hjqqt1o.mongodb.net/?appName=casPatiqueOpenClass'
)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log(
    'Connexion à MongoDB échouée !',
    error.message
  ));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Permet de récupérer req.body
app.use(express.json());


// GET /api/products
// Retourne { products: Product[] }
app.get('/api/products', (req, res) => {
  Product.find()
    .then(products => {
      res.status(200).json({ products });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});


// GET /api/products/:id
// Retourne { product: Product }
app.get('/api/products/:id', (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then(product => {
      res.status(200).json({ product });
    })
    .catch(error => {
      res.status(404).json({ error });
    });
});


// POST /api/products
// Crée un nouveau produit
app.post('/api/products', (req, res) => {

  delete req.body._id;

  const product = new Product({
    ...req.body
  });

  product.save()
    .then(product => {
      res.status(201).json({ product });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});


// PUT /api/products/:id
// Modifie un produit
app.put('/api/products/:id', (req, res) => {

  Product.updateOne(
    { _id: req.params.id },
    {
      ...req.body,
      _id: req.params.id
    }
  )
    .then(() => {
      res.status(200).json({
        message: 'Modified!'
      });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});


// DELETE /api/products/:id
// Supprime un produit
app.delete('/api/products/:id', (req, res) => {

  Product.deleteOne({
    _id: req.params.id
  })
    .then(() => {
      res.status(200).json({
        message: 'Deleted!'
      });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});


module.exports = app;