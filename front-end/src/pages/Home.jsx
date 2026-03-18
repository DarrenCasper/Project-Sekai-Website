import { AuroraBackground } from "../component/Aurora"
import ShimmeringText from "../component/ShimmeringText"

export const Home = () => {
  return (
    <AuroraBackground showRadialGradient={true} animationSpeed={50}>
      <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
          <ShimmeringText
            text="Welcome to Project Sekai Database"
            className="text-center text-8xl font-lg"
            duration={1}
            wave={true}
            color="rgba(255,255,255,0.5)"
            shimmeringColor="rgba(255,255,255,1)"
          />
      </div>
    </AuroraBackground>
  )
}