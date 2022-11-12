import { Router } from 'express';
import { check } from 'express-validator';
import postCtrl from '../controllers/postController.js';
import { upload } from '../middleware/imgUpload.js';
import { validFields } from '../middleware/validarCampos.js';


const route = Router();

route.get('/', postCtrl.listar);
route.get('/:id', postCtrl.listOne);
route.delete('/:id', postCtrl.delete);
route.put('/:id', upload.single("img"), postCtrl.update);
route.post('/',upload.single("img"), postCtrl.add);

export default route;



// [
// check("title","el campo title es obligatorio").notEmpty(),
// check("description","el campo description es obligatorio").notEmpty(),
// ],
// validFields,