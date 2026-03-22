const FRAME_MAP = {
    1: "https://sekai.best/assets/cardFrame_L_1-BxhVUotw.png",
    2: "https://sekai.best/assets/cardFrame_L_2-Dnn12MW4.png",
    3: "https://sekai.best/assets/cardFrame_L_3-5cdX133g.png",
    4: "https://sekai.best/assets/cardFrame_L_4-BfdiILSZ.png"
}

const STAR_NORMAL = "https://sekai.best/assets/rarity_star_normal-BYSplh9m.png"
const STAR_AFTER_TRAINING = "https://sekai.best/assets/rarity_star_afterTraining-CUlLhfpl.png"


function normalizeCard(card){
    if(typeof card.cardRarityType === "number") return card.rarity

    if(typeof card.cardRarityType === "string"){
        const match = card.cardRarityType.match(/\d+/)
        if(match) return Number(match[0])
    }

    return 1
}


function buildCardAssets(assetbundleName, rarity){
    const base = `https://storage.sekai.best/sekai-jp-assets/character/member/${assetbundleName}`

    const hasAfterTraining = rarity >= 3

    return {
        normalImageUrl: `${base}/card_normal.webp`,
        trainedImageUrl: hasAfterTraining ? `${base}/card_after_training.webp` : null,
        hasAfterTraining,
        frameUrl: FRAME_MAP[rarity] || FRAME_MAP[1],
        starUrl: rarity >= 3 ? STAR_AFTER_TRAINING : STAR_NORMAL,
        starCount: rarity,
    }
}


export async function getAllEventCards(){
    const response = await fetch("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/refs/heads/main/cards.json")

    if(!response.ok){
        throw new Error("Failed to fetch Event Cards")
    }

    const eventCards = await response.json()

    return eventCards.map((card) => {
        const rarity = normalizeCard(card)
        const assets = buildCardAssets(card.assetbundleName, rarity)

        return {
            id: card.id,
            attr: card.attr,
            cardSkillName: card.cardSkillName,
            gachaPhrase: card.gachaPhrase,
            releaseAt: card.releaseAt,
            ...assets
        }
    })

}

export async function getEventCardsbyId(id){
    const cards = await getAllEventCards()
    return cards.find((card) => card.id == id)
}