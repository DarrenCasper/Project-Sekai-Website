import { useEffect, useState } from "react";

export const MusicCards = () => {
    const [musics, setMusics] = useState([]);
    const [sort, setSort] = useState("default")
    const [viewMode, setViewMode] = useState("info")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMusics = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/music?sort=${sort}`)

                if (!response.ok) {
                    throw new Error("Failed to fetch music data")
                }

                const data = await response.json()
                console.log("Music Data: ", data)
                setMusics(data)
            }
            catch (err) {
                console.error(err)
                setError("Failed to load music")
            }
            finally {
                setLoading(false)
            }
        }

        fetchMusics()
    }, [sort])

    if (loading) return <div className="p-6 text-white">Loading...</div>

    if (error) return <div className="p-6 text-red-500">{error}</div>

    // src={`https://storage.sekai.best/sekai-jp-assets/music/jacket/${music.assetbundleName}/${music.assetbundleName}.webp`}
    return (
        <div className="container mx-auto max-w-10xl">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="flex justify-between pb-3">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode("info")}
                            className={`rounded-md px-3 py-2 text-sm font-medium ${viewMode === "info" ? "bg-blue-500 text-white" : "bg-gray-700/50 text-white hover:bg-gray-600/50 transition-colors"}`}
                        >
                            Song Info
                        </button>

                        <button
                            onClick={() => setViewMode("difficulty")}
                            className={`rounded-md px-3 py-2 text-sm font-medium ${viewMode === "difficulty" ? "bg-blue-500 text-white" : "bg-gray-700/50 text-white hover:bg-gray-600/50 transition-colors"}`}
                        >
                            Difficulty
                        </button>
                    </div>

                    <div className="mb-6 flex justify-end">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="rounded-md border border-gray-300 bg-gray-700/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="default">Default</option>
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="title">Title</option>
                            <option value="composer">Composer</option>
                            <option value="lyricist">Lyricist</option>
                            <option value="arranger">Arranger</option>
                        </select>
                    </div>
                </div>


                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {musics.map((music) => (
                        <div key={music.id}
                            className="gradient-border card-hover rounded-2xl p-4 bg-zinc-800/50 backdrop-blur-sm transition duration-300">
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

                                    {viewMode === "info" ? (
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
                                    ) : (
                                        <div className="mt-4 grid gap-2 text-sm">
                                            {music.difficulties.length > 0 ? (
                                                music.difficulties.map((diff) => (
                                                    <div key={diff.id}
                                                        className="rounded-lg border border-white/10 px-3 py-2">
                                                        <p>
                                                            <span className="font-semibold">Mode: </span>{" "}{diff.difficulty}
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">Level: </span>{" "}{diff.playLevel}
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">Notes: </span>{" "}{diff.totalNoteCount}
                                                        </p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No difficulty data available.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
