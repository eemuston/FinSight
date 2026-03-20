import express from "express";
import searchController from "../controllers/searchController";

const router = express.Router()

router.post('/search', searchController.searchVector)

export default router