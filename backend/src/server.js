import express from "express"
import cors from "cors"
import cardsRoutes from "./routes/cardsRoute.js"
import musicRoutes from "./routes/musicsRoute.js"
import characterRoutes from "./routes/CharacterRoute.js"
import eventCardsRoutes from "./routes/eventcardRoute.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Backend is running")
})

// Card Routes (fake one)
// app.use("/api/cards", cardsRoutes)

app.use("/api/music", musicRoutes)
app.use("/api/characters", characterRoutes)
app.use("/api/eventcards", eventCardsRoutes)

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000")
})