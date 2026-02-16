import express from "express"
import { createCategory, findCategory } from "../authController/categoryAuth.js"

const categoryRote=express.Router()


categoryRote.post("/create",createCategory)
categoryRote.get("/find",findCategory)

export default categoryRote