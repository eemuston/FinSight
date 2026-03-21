import express from "express";
import searchController from "../controllers/searchController";

const searchRouter = express.Router()

searchRouter.post('/', searchController.searchVector)

export default searchRouter