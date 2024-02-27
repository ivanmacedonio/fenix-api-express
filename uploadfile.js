import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import sharp from 'sharp'
import { storage } from './firebase.js'

export async function uploadFile(file){
    let fileBuffer = await sharp(file.buffer).resize({width: 200, height: 200, fit: 'cover'}).toBuffer()

    const fileRef = ref(storage, `files/${file.originalname} ${Date.now()}`)

    const fileMetaData = {
        contentType: file.mimetype
    }

    const fileUploadPromise = uploadBytesResumable(
        fileRef, fileBuffer, fileMetaData
    )

    await fileUploadPromise

    const fileDownloadURL = await getDownloadURL(fileRef)

    return {ref: fileRef, downloadURL: fileDownloadURL}
}