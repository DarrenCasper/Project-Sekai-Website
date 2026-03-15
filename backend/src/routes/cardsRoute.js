import express from 'express';
import { getAllCards, getCardById, createCard, updateCard, deleteCard } from '../services/cardsService.js';

const router = express.Router();

router.get("/", (req, res) => {
    const cards = getAllCards()
    res.json(cards)
})

router.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const card = getCardById(id)

    if(!card){
        return res.status(404).json({ message: "Card not Found"})
    }

    res.json(card)
})

router.post("/", (req, res) => {
    const { name, characterId, rarity, attribute} = req.body

    if(!name || !characterId || !rarity || !attribute){
        return res.status(400).json({ message: "Missing required fields"})
    }

    const newCard = createCard({
        name, 
        characterId,
        rarity,
        attribute
    })

    res.status(201).json(newCard)
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id)
    const updatedCard = updateCard(id, req.body)

    if(!updatedCard){
        return res.status(404).json ({message: "Card not Found"})
    }

    res.json(updatedCard)
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    const deletedCard = deleteCard(id)

    if(!deletedCard){
        return res.status(404).json({message: "Card not Found"})
    }

    res.json({
        message: "Card deleted succesfully",
        card: deletedCard
    })
})

export default router