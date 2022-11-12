import cloudinary from "./cloudinaryConfig.js";
import { deleteImg } from "./deleteImg.js";

export const subirImgageACloudinary = async (file) => {
    try {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path)
        deleteImg(file.filename)
        return {
            secure_url,
            public_id,
        }
    } catch (error) {
        console.log("error en subir ImgageACloudinary", error.message)
    }
}

export const eliminarImagenCloudinary=async(public_id)=>{
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        console.log("error en eliminar ImgageACloudinary", error.message);
    }
}