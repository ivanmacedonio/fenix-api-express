import mongoose from 'mongoose'

const dbconnect = () => {
    mongoose.set('strictQuery', true)
    mongoose.connect('mongodb://localhost:27017/fenix_ecommerce')
        .then(()=> {
            console.log('Conexion existosa')
        })
        .catch((err) => {
            console.log(err.toString())
        })
}

export default dbconnect