import { eliminarImagenCloudinary, subirImgageACloudinary } from "../helpers/cloudinaryActions.js";
import { deleteImg } from "../helpers/deleteImg.js";
import { response } from "../helpers/Response.js"
import { postModel } from "../models/postModel.js"

const postCtrl = {}
// listar
postCtrl.listar = async (req, res) => {
    try {
        const posts = await postModel.find().sort({createdAt:-1})
        response(res, 200, true, posts, "lista de posts");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};
// listar po id
postCtrl.listOne = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id)
        if (!post) {
            return response(res, 404, false, "", "registro no encontrado")
        }
        response(res, 200, true, post, "post encontrado")
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};
// crear post
postCtrl.add = async (req, res) => {
    try {
        const { title, description } = req.body
        const newPost = new postModel({
            title,
            description
        });

        // req.file && newPost.setImg(req.file.filename);

        if (req.file) {
            const { secure_url, public_id } = await subirImgageACloudinary(req.file);
            newPost.setImg(secure_url, public_id);
        }


        await postModel.create(newPost);
        response(res, 201, true, newPost, "probado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    };
};
// eliminar/img
postCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id)
        if (!post) {
            return response(res, 404, false, "", "registro no encontrado")
        }

        //    post.nameImage && deleteImg(post.nameImage);

        if (post.public_id) {
            await eliminarImagenCloudinary(post.public_id)
        }


        await post.deleteOne()
        response(res, 200, true, "", "post eliminado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    };
};
// actualizar
postCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id)
        if (!post) {
            return response(res, 404, false, "", "registro no encontrado")
        }
        if (req.file) {
            // post.nameImage && deleteImg(post.nameImage);
            // post.setImg(req.file.filename);
            if (post.public_id) {
                await eliminarImagenCloudinary(post.public_id)
            }
            const { secure_url, public_id } = await subirImgageACloudinary(req.file);
            post.setImg(secure_url, public_id);
            await post.save()
        }
        
        await post.updateOne(req.body);
        response(res, 200, true, "", "post actualizado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
}

export default postCtrl;