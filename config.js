import mongoose from 'mongoose'

const dbconnect = () => {
    mongoose.connect('mongodb+srv://ivanmacedonio778:mamageor28@fenix.qcbsftl.mongodb.net/?retryWrites=true&w=majority&appName=fenix')
        .then(()=> {
            console.log('Conexion existosa')
        })
        .catch((err) => {
            console.log(err.toString())
        })
}

export default dbconnect

