export async function getAllMusic(){
    const response = await fetch(
        "https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/main/musics.json"
    )

    if(!response.ok){
        throw new Error("Failed to fetch music data")
    }

    const musics = await response.json()

    return musics.map((music) => ({
        id: music.id,
        title: music.title,
        lyricist: music.lyricist,
        composer: music.composer,
        arranger: music.arranger,
    }))
}

export async function getMusicById(id){
    const musics = await getAllMusic() 
    return musics.find((music) => music.id === id)
}