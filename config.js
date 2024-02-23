import mongoose from 'mongoose'

const dbconnect = () => {
    mongoose.set('strictQuery', true)
    mongoose.connect('mongodb+srv://ivanmacedonio778:mamageor28@fenix.qcbsftl.mongodb.net/')
        .then(()=> {
            console.log('Conexion existosa')
        })
        .catch((err) => {
            console.log(err.toString())
        })
}

export default dbconnect