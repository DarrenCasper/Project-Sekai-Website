import { AuroraBackground } from "../component/Aurora"
import { CardsPage } from "../component/EventCards"

export const Units = () => {
    return (
        <AuroraBackground showRadialGradient={true} animationSpeed={50}>
            <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
                <h1 className="text-5xl font-bold">Units</h1>
                <p className="mt-3 text-white/80">List of of units in Project Sekai</p>
            </div>
            <CardsPage />
        </AuroraBackground>
    )
}