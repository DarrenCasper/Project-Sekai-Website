import { useEffect, useState } from "react";

export const MusicCards = () => {
    const [musics, setMusics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMusics = async () => {
            try{
                const response = await fetch("http://localhost:5000/api/music")

                if(!response.ok){
                    throw new Error("Failed to fetch music data")
                }

                const data = await response.json()
                console.log("Music Data: ", data)
                setMusics(data)
            }
            catch(err){
                console.error(err)
                setError("Failed to load music")
            }
            finally{
                setLoading(false)
            }
        }

        fetchMusics()
    }, [])

    if(loading) return <div className="p-6 text-white">Loading...</div>

    if(error) return <div className="p-6 text-red-500">{error}</div>

// src={`https://storage.sekai.best/sekai-jp-assets/music/jacket/${music.assetbundleName}/${music.assetbundleName}.webp`}
    return (
        <div className="container mx-auto max-w-5xl">
            <div className="mx-auto max-w-6xl px-4 py-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {musics.map((music) => (
                        <div key={music.id}
                            className="gradient-border card-hover rounded-2xl p-4">
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <div className="w-full shrink-0 md:w-40">
                                        <img
                                            src={`https://storage.sekai.best/sekai-jp-assets/music/jacket/${music.assetbundleName}/${music.assetbundleName}.webp`}
                                            alt={music.title}
                                            className="aspect-square w-full rounded-xl object-cover"
                                            referrerPolicy="no-referrer"
                                            loading="lazy"
                                            />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-xl font-bold">{music.title}</h3>

                                        <div className="mt-4 grid gap-2 text-sm">
                                            <p>
                                                <span className="font-semibold">Composer:</span>{" "} {music.composer || "Unknown"}
                                            </p>

                                            <p>
                                                <span className="font-semibold">Lyricist:</span>{" "} {music.lyricist || "Unknown"}
                                            </p>

                                            <p>
                                                <span className="font-semibold">Arranger:</span>{" "} {music.arranger || "Unknown"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}