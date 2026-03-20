import { AuroraBackground } from "../component/Aurora"
import { MainCharacter } from "../component/MainCharacter"
import { ArrowDown } from "lucide-react" 
export const Characters = () => {
    return (
        <AuroraBackground showRadialGradient={true} animationSpeed={50}>
             <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
                <h1 className="text-5xl font-bold">Characters</h1>
                <p className="mt-3 text-white/80">List of characters in Project Sekai</p>
            </div>
            <div className="relative bottom-30 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
                    <ArrowDown className="h-5 w-5 text-primary"/>
            </div>
            <MainCharacter/>
        </AuroraBackground>
    )
}