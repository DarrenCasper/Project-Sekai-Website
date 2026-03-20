import { useEffect, useState } from "react";
import { Link } from "react-router";

const unitTitles = {
    piapro: "VIRTUAL SINGER",
    light_sound: "Leo/need",
    idol: "MORE MORE JUMP!",
    street: "Vivid BAD SQUAD",
    theme_park: "Wonderlands x Showtime",
    school_refusal: "25-ji, Nightcord de."
}

export const MainCharacter = () => {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        const fetchCharacters = async () => {
            const response = await fetch("http://localhost:5000/api/characters")
            const data = await response.json()
            setCharacters(data)
        }

        fetchCharacters()
    }, [])

    const groupedCharacters = characters.reduce((acc, character) => {
        const unit = character.unit

        if(!acc[unit]){
            acc[unit] = []
        }

        acc[unit].push(character)
        return acc
    }, {})

    return(
        <div className="mx-auto max-w-10xl px-4 py-8 text-white">
            {Object.entries(groupedCharacters).map(([unit, members]) => (
                <section key={unit} className="mb-16">
                    <div className="mb-8 flex flex-col items-center">
                        <img
                            src={`https://sekai.best/images/jp/logol_outline/logo_${unit}.png`}
                            alt={unitTitles[unit] || unit}
                            className="mb-4 h-40 object-contain"
                            referrerPolicy="no-referrer"
                            loading="lazy"/>
                        <h2 className="text-3xl font-bold">{unitTitles[unit] || unit}</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {members.map((character) => (
                            <Link 
                                key={character.id}
                                to={`/characters/${character.id}`}
                                className="group block">
                                    <div className="w-50 overflow-hidden rounded-xl bg-zinc-800 transition duraiton-300 group-hover:scale-105">
                                        <img src={character.imageUrl}
                                            alt={character.fullname}
                                            className="h-auto w-full object-cover"
                                            referrerPolicy="no-referrer"/>
                                        <div className="p-3 text-center">
                                            <p className="font-semibold">{character.fulname}</p>
                                            <p className="text-xs text-zinc-400">{character.fullnameEnglish}</p>
                                        </div>
                                    </div>
                                </Link>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )

}

