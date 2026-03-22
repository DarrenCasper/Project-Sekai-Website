import { useEffect, useState } from "react";
import { CardItem } from "./cardItem";


export const CardsPage = () => {
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchCards = async () => {
            try{
                const response = await fetch("http://localhost:5000/api/eventcards")

                if(!response.ok){
                    throw new Error("Failed to fetch cards")
                }

                const data = await response.json()
                setCards(data)
            }
            catch(err){
                console.error(err)
                setError("Failed to load cards")
            }
            finally{
                setLoading(false)
            }
        }

        fetchCards()
    }, [])

    if(loading) return <div className="p-6 text-white">Loading...</div>
    if (error) return <div className="p-6 text-red-500">{error}</div>

    return (
        <div className="mx-auto max-w-7xl px-6 py-8 text-white">
            <h1 className="mb-6 text-3xl font-bold">Cards</h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <CardItem key={card.id} card={card} />
                ))}
            </div>
        </div>
    )
}