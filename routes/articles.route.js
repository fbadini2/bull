import { Router } from "express";
import { ArticlesController } from "../controllers/articles.controller.js";

const router = Router()

router.get('/test', (req, res)=>{
    res.status(200).json({data:'Servicio OK!'})
})
router.get('/importa', ArticlesController.getImportO)
router.get('/importb', ArticlesController.getImportC)
router.get('/articles', ArticlesController.getAllArticles)


export default router;