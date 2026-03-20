export async function getAllUnitCharacters(){
    const [ MainCharacterResponse, CharacterProfileResponse] = await Promise.all([
        fetch("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/main/gameCharacters.json"),
        fetch("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/main/characterProfiles.json")
    ])


    if(!MainCharacterResponse.ok){
        throw new Error("Failed to fetch Main Character data")
    }
    if(!CharacterProfileResponse.ok){
        throw new Error("Failed to fetch Character Profile data")
    }

    const mainCharacters = await MainCharacterResponse.json()
    const characterProfiles = await CharacterProfileResponse.json()

    const profileMap = new Map(
        characterProfiles.map((profile) => [profile.characterId, profile])
    )

    const mergedCharacters = mainCharacters.map((character) => {
        const profile = profileMap.get(character.id)

        return {
            id: character.id,
            
            firstName: character.firstName || "",
            givenName: character.givenName || "",
            firstNameRuby: character.firstNameRuby || "",
            givenNameRuby: character.givenNameRuby || "",
            firstNameEnglish: character.firstNameEnglish || "",
            givenNameEnglish: character.givenNameEnglish || "",

            fullname: `${character.firstName || ""} ${character.givenName || ""}`.trim(),
            fullnameRuby: `${character.firstNameRuby || ""} ${character.givenNameRuby || ""}`.trim(),
            fullnameEnglish: `${character.firstNameEnglish || ""} ${character.givenNameEnglish || ""}`.trim(),

            gender: character.gender,
            // height: character.height,
            unit: character.unit,

            characterVoice: profile ? profile.characterVoice : "",
            birthday: profile ? profile.birthday : "",
            height: profile ? profile.height : "",
            school: profile ? profile.school : "",
            schoolYear: profile ? profile.schoolYear : "",
            hobby: profile ? profile.hobby : "",
            specialSkill: profile ? profile.specialSkill : "",
            favoriteFood: profile ? profile.favoriteFood : "",
            hatedFood: profile ? profile.hatedFood : "",
            weak: profile ? profile.weak : "",
            introduction: profile ? profile.introduction : "",

            imageUrl: `https://storage.sekai.best/sekai-jp-assets/character/character_select/chr_tl_${character.id}.webp`,
        }
    })

    return mergedCharacters
}

export async function getCharacterById(id){
    const characters = await getAllUnitCharacters()
    return characters.find((character) => character.id === id)
}