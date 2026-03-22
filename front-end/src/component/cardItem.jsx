import { useState } from "react"

export const CardItem = ({ card }) => {
  const [hoveredSide, setHoveredSide] = useState(null)

  return (
    <div className="overflow-hidden rounded-md bg-[#1a1a1f] shadow-md card-hover">
      <div className="relative aspect-video overflow-hidden">
        {card.hasAfterTraining ? (
          <div className="flex h-full w-full">
            <div
              className="relative h-full overflow-hidden transition-all duration-500 ease-out"
              style={{
                flex:
                  hoveredSide === "normal"
                    ? 3
                    : hoveredSide === "trained"
                    ? 0
                    : 1,
              }}
              onMouseEnter={() => setHoveredSide("normal")}
              onMouseLeave={() => setHoveredSide(null)}
            >
              <img
                src={card.normalImageUrl}
                alt={`${card.title} normal`}
                className="h-full w-full object-cover transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div
              className="relative h-full overflow-hidden transition-all duration-500 ease-out"
              style={{
                flex:
                  hoveredSide === "trained"
                    ? 3
                    : hoveredSide === "normal"
                    ? 0
                    : 1,
              }}
              onMouseEnter={() => setHoveredSide("trained")}
              onMouseLeave={() => setHoveredSide(null)}
            >
              <img
                src={card.trainedImageUrl}
                alt={`${card.title} trained`}
                className="h-full w-full object-cover transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ) : (
          <img
            src={card.normalImageUrl}
            alt={`${card.title} normal`}
            className="h-full w-full object-cover hover:scale-120"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}

        <img
          src={card.frameUrl}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute left-1 top-1 flex flex-col gap-1">
          {Array.from({ length: card.starCount }).map((_, index) => (
            <img
              key={index}
              src={card.starUrl}
              alt=""
              className="h-6 w-6"
            />
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a1f] px-4 py-3 text-left text-white">
        <h3 className="text-lg font-bold">{card.cardSkillName}</h3>

        <div className="mt-4 grid gap-2 text-sm">
          <p>
            <span className="font-semibold">attribute:</span>{" "}
            {card.attr || "Unknown"}
          </p>

          <p>
            <span className="font-semibold">Gacha Phrase:</span>{" "}
            {card.gachaPhrase || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  )
}