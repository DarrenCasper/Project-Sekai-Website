import express from 'express';
import { getAllMusic, getMusicById  } from '../services/musicService.js';


const router = express.Router()

router.get("/", async (req, res) => {
    try{
        const musics = await getAllMusic()
        res.json(musics)
    } catch (error){
        console.error(error)
        res.status(500).json({ message: error.message})
    }
})

router.get("/:id", async (req, res) => {
    try{
        const id = Number(req.params.id)
        const music = await getMusicById(id)

        if(!music){
            return res.status(404).json({ message: "Music not Found"})
        }
        res.json(music)
    } catch (error){
        console.error(error)
        res.status(500).json({ message: error.message})
    }
})

export default router