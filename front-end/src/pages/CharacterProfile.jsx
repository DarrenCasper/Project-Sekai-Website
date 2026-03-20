import { AuroraBackground } from "../component/Aurora"
import { CharacterStats } from "../component/CharacterStats"

export const CharacterProfile = () => {
    return (
        <AuroraBackground showRadialGradient={true} animationSpeed={50}>
             <CharacterStats/>
        </AuroraBackground>
    )
}