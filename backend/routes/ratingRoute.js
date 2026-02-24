import express from "express"
import { createRating } from "../authController/ratingAurh.js"


const ratingRoute=express.Router()

ratingRoute.post("/create",createRating)

export default ratingRoute