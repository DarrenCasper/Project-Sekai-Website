export async function getAllMusic(sort = "default") {
  const [musicResponse, difficultyResponse] = await Promise.all([
    fetch("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/main/musics.json"),
    fetch("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/main/musicDifficulties.json")
  ])

  if (!musicResponse.ok) {
    throw new Error("Failed to fetch music data")
  }

  if (!difficultyResponse.ok) {
    throw new Error("Failed to fetch music Difficulties data")
  }

  const musics = await musicResponse.json()
  const musicDifficulties = await difficultyResponse.json()

  const difficultyMap = new Map()


  for (const diff of musicDifficulties) {
    if (!difficultyMap.has(diff.musicId)){
        difficultyMap.set(diff.musicId, [])
    }

    difficultyMap.get(diff.musicId).push({
        id: diff.id,
        difficulty: diff.musicDifficulty,
        playLevel: diff.playLevel,
        totalNoteCount: diff.totalNoteCount
    })
  }


  const formattedMusics = musics.map((music) => ({
    id: music.id,
    title: music.title,
    lyricist: music.lyricist,
    composer: music.composer,
    arranger: music.arranger,
    publishedAt: music.publishedAt,
    assetbundleName: music.assetbundleName,
    difficulties: difficultyMap.get(music.id) || []
  }))

  switch (sort) {
    case "newest":
      formattedMusics.sort((a, b) => b.publishedAt - a.publishedAt)
      break

    case "oldest":
      formattedMusics.sort((a, b) => a.publishedAt - b.publishedAt)
      break

    case "title":
      formattedMusics.sort((a, b) =>
        (a.title || "").localeCompare(b.title || "")
      )
      break

    case "composer":
      formattedMusics.sort((a, b) =>
        (a.composer || "").localeCompare(b.composer || "")
      )
      break

    case "lyricist":
      formattedMusics.sort((a, b) =>
        (a.lyricist || "").localeCompare(b.lyricist || "")
      )
      break

    case "arranger":
      formattedMusics.sort((a, b) =>
        (a.arranger || "").localeCompare(b.arranger || "")
      )
      break
    
    
    default:
      break
  }

  return formattedMusics
}

export async function getMusicById(id) {
  const musics = await getAllMusic()
  return musics.find((music) => music.id === id)
}