import express from 'express';
import dbconnect from './config.js';
import productModel from './productModel.js';
import { uploadFile } from './uploadfile.js';
import { upload } from './utils.js';
const start = () => {
  dbconnect();
  const app = express();
  const router = express.Router();
  app.use(router);

  //PRODUCTS

  router.get("/products", async (req, res) => {
    try {
      const products = await productModel.find({});
      res.json({ products: products });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error obteniendo los productos");
    }
  });

  router.post("/products", upload.fields([{name: 'image', maxCount: 1}]), async (req, res) => {
    try {
      const { title, description, price, discount, available } = req.body;
      const image = req.files.image; // Obtén el nombre original de la imagen
      const {downloadURL} = await uploadFile(image[0])
      const newProduct = await new productModel({
        title: title,
        description: description,
        price: price,
        discount: discount,
        available: available,
        image: downloadURL
      }).save()

      return res.status(200).json({newProduct})
        
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
      res.json({ product: product });
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
  
  app.listen(3000, () => {
    console.log(`Server up`);
  });

}
start()