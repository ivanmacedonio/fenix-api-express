import cors from 'cors';
import express from 'express';
import multer from 'multer';
import dbconnect from './config.js';
import productModel from './productModel.js';

const start = () => {
  const app = express();

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });
  const router = express.Router();

  // app.use(cors({
  //   origin: 'https://master--fenix-productos-economicos.netlify.app',
  //   methods: ['GET', 'POST', 'DELETE'],
  //   allowHeaders: ['Content-Type']
  // }));


  app.use(cors());
  app.use(express.static('public', { maxAge: 0 }));
  app.use(express.json());
  app.use(router);
  app.use("/uploads", express.static("uploads"));
  //PRODUCTS

  router.get("/products", async (req, res) => {
    try {
      const products = await productModel.find({});
      const productsWithImages = products.map((product) => ({
        ...product.toJSON(),
        image: `https://${req.get("host")}/uploads/${product.image}`,
      }));
      res.json({ products: productsWithImages });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error obteniendo los productos");
    }
  });

  router.post("/products", upload.single("image"), async (req, res) => {
    try {
      const { title, description, price, discount, available } = req.body;
      const imageName = req.file.originalname; // Obtén el nombre original de la imagen
      const newProduct = new productModel({
        title,
        description,
        price,
        discount,
        available,
        image: imageName, // Guarda solo el nombre de la imagen
      });
      await newProduct.save();
      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });
  router.get("/products/:id", async (req, res) => {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) {
        return res.status(404).send('El producto no existe');
      }
      const productWithImage = {
        ...product.toJSON(),
        image: `https://${req.get("host")}/uploads/${product.image}`,
      };
      res.json({ product: productWithImage });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error obteniendo el producto');
    }
  });
  

  router.delete("/products/:id", async (req, res) => {
    try {
      const product = await productModel.findOneAndDelete({_id: req.params.id});
      console.log(`Producto ${product} eliminado!`)
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(404).send("Producto no encontrado");
    }
  });
  
  dbconnect();
  app.listen(3000, () => {
    console.log(`Server up`);
  });

}
start()