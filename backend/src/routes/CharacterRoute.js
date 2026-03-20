import express from "express";
import { getAllUnitCharacters, getCharacterById } from "../services/CharacterService.js";

const router = express.Router()

router.get("/", async (req, res) => {
    try{
        const characters = await getAllUnitCharacters()
        res.json(characters)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message: error.message})
    }
})

router.get("/:id", async (req, res) => {
    try{
        const id = Number(req.params.id)
        const character = await getCharacterById(id)

        if(!character){
            return res.status(404).json({ message: "Character not Found"})
        }
        res.json(character)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message: error.message})
    }
})

export default router