import express from "express"
import { getAllEventCards, getEventCardsbyId } from "../services/eventcardService.js"

const router = express.Router()


router.get("/", async (req, res) => {
    try{
        const eventCards = await getAllEventCards()
        res.json(eventCards)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message: error.message})
    }
})


router.get("/:id", async (req,res) => {
    try{
        const id = Number(req.params.id)
        const eventCards = await getEventCardsbyId(id)

        if(!eventCards){
            return res.status(404).json({message: "Card not Found"})
        }
        res.json(eventCards)
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: err.message})
    }
})

export default router