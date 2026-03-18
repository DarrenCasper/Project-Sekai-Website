import { AuroraBackground } from "../component/Aurora"

export const Characters = () => {
    return (
        <AuroraBackground showRadialGradient={true} animationSpeed={50}>
             <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
                <h1 className="text-5xl font-bold">Characters</h1>
                <p className="mt-3 text-white/80">List of characters in Project Sekai</p>
            </div>
        </AuroraBackground>
    )
}