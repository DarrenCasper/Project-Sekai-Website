import { cards } from "../data/cardsData.js";

export function getAllCards() {
    return cards
}

export function getCardById(id) {
    return cards.find(card => card.id === id)
}

export function createCard(card) {
    const newCard = {
        id: cards.length ? cards[cards.length - 1].id + 1 : 1,
        ...card
    }
    cards.push(newCard)
    return newCard
}

export function updateCard(id, updatedData) {
    const card = cards.find(item => item.id === id)

    if(!card){
        return null
    }

    if(updatedData.name !== undefined) card.name = updatedData.name
    if(updatedData.characterId !== undefined) card.characterId = updatedData.characterId
    if(updatedData.rarity !== undefined) card.rarity = updatedData.rarity
    if(updatedData.attribute !== undefined) card.attribute = updatedData.attribute

    return card
}

export function deleteCard(id){
    const index = cards.findIndex(card => card.id === id)

    if (index === -1){
        return null
    }

    const deletedCard = cards.splice(index, 1)
    return deletedCard[0]
}