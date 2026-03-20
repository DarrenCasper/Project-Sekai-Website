import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

export const CharacterStats = () => {
    const { id } = useParams()
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchCharacter = async () => {
            try{
                const response = await fetch(`http://localhost:5000/api/characters/${id}`)

                if(!response.ok){
                    throw new Error("Failed to fetch character")
                }

                const data = await response.json()
                setCharacter(data)
            }
            catch(error){
                console.error(error)
                setError("Failed to load character profile")
            }
            finally{
                setLoading(false)
            }
        }

        fetchCharacter()
    }, [id])


    if(loading) return <div className="p-6 text-white">Loading...</div>
    if(error) return <div className="p-6 text-red-500">{error}</div>
    if(!character) return <div className="p-6 text-white">Character not Found</div>


    return (
        <div className="mx-auto max-w-5xl px-4 py-8 text-white">
            <Link
                to="/characters"
                className="mb-6 inline-block text-sm text-zinc-400 hover:text-white">
                    ← Back to Characters
                </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <img src={character.imageUrl}
                        alt={character.fullname}
                        className="w-70 rounded-2xl object-cover"/>
                </div>

                <div>
                    <h1 className="text-4xl font-bold">{character.fullname}</h1>
                    <p className="mt-2 text-zinc-400">{character.fullNameEnglish}</p>

                    <div className="mt-6 grid gap-3 text-sm">
                        <p><span className="font-semibold">Birthday:</span> {character.birthday || "Unknown"}</p>
                        <p><span className="font-semibold">School:</span> {character.school || "Unknown"}</p>
                        <p><span className="font-semibold">School Year:</span> {character.schoolYear || "Unknown"}</p>
                        <p><span className="font-semibold">Height:</span> {character.profileHeight || character.height || "Unknown"}</p>
                        <p><span className="font-semibold">Voice:</span> {character.characterVoice || "Unknown"}</p>
                        <p><span className="font-semibold">Hobby:</span> {character.hobby || "Unknown"}</p>
                        <p><span className="font-semibold">Special Skill:</span> {character.specialSkill || "Unknown"}</p>
                        <p><span className="font-semibold">Favorite Food:</span> {character.favoriteFood || "Unknown"}</p>
                        <p><span className="font-semibold">Hated Food:</span> {character.hatedFood || "Unknown"}</p>
                        <p><span className="font-semibold">Weakness:</span> {character.weak || "Unknown"}</p>
                    </div>

                    <div className="mt-8">
                        <h2 className="mb-2 text-2xl font-semibold">Introduction</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            {character.introduction || "No introduction Available."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}