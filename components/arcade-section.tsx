"use client"

import { motion, useInView } from "framer-motion"
import { useState, useEffect, useCallback, useRef } from "react"
import { Gamepad2, Trophy, Clock, Zap, RotateCcw, Play, ArrowRight } from "lucide-react"

// Mini-game: Memory Cards
function MemoryGame() {
  const emojis = ["⚡", "🚀", "💡", "🎯", "🔮", "✨", "🎨", "💎"]
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const initGame = useCallback(() => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }))
    setCards(shuffled)
    setFlippedCards([])
    setMoves(0)
    setGameWon(false)
  }, [])

  useEffect(() => {
    initGame()
  }, [initGame])

  const handleCardClick = (id: number) => {
    if (isProcessing || flippedCards.length === 2) return
    if (cards[id].flipped || cards[id].matched) return

    const newCards = [...cards]
    newCards[id].flipped = true
    setCards(newCards)
    setFlippedCards([...flippedCards, id])

    if (flippedCards.length === 1) {
      setMoves((m) => m + 1)
      setIsProcessing(true)
      
      const firstId = flippedCards[0]
      if (cards[firstId].emoji === cards[id].emoji) {
        setTimeout(() => {
          const matchedCards = [...cards]
          matchedCards[firstId].matched = true
          matchedCards[id].matched = true
          setCards(matchedCards)
          setFlippedCards([])
          setIsProcessing(false)
          
          if (matchedCards.every((c) => c.matched)) {
            setGameWon(true)
          }
        }, 500)
      } else {
        setTimeout(() => {
          const resetCards = [...cards]
          resetCards[firstId].flipped = false
          resetCards[id].flipped = false
          setCards(resetCards)
          setFlippedCards([])
          setIsProcessing(false)
        }, 1000)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Movimientos: <span className="text-foreground font-mono">{moves}</span></span>
        </div>
        <button
          onClick={initGame}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-lg text-2xl flex items-center justify-center transition-all duration-300 ${
              card.flipped || card.matched
                ? "bg-primary/20 rotate-0"
                : "bg-secondary hover:bg-muted"
            } ${card.matched ? "opacity-50" : ""}`}
          >
            {(card.flipped || card.matched) ? card.emoji : "?"}
          </button>
        ))}
      </div>

      {gameWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4"
        >
          <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-primary font-medium">¡Ganaste en {moves} movimientos!</p>
        </motion.div>
      )}
    </div>
  )
}

// Mini-game: Reaction Time
function ReactionGame() {
  const [gameState, setGameState] = useState<"waiting" | "ready" | "go" | "result">("waiting")
  const [startTime, setStartTime] = useState(0)
  const [reactionTime, setReactionTime] = useState(0)
  const [bestTime, setBestTime] = useState<number | null>(null)

  const startGame = () => {
    setGameState("ready")
    const delay = Math.random() * 3000 + 2000 // 2-5 seconds
    setTimeout(() => {
      setGameState("go")
      setStartTime(Date.now())
    }, delay)
  }

  const handleClick = () => {
    if (gameState === "waiting") {
      startGame()
    } else if (gameState === "ready") {
      setGameState("waiting")
      setReactionTime(-1) // Too early
    } else if (gameState === "go") {
      const time = Date.now() - startTime
      setReactionTime(time)
      setGameState("result")
      if (!bestTime || time < bestTime) {
        setBestTime(time)
      }
    } else if (gameState === "result") {
      startGame()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Mejor tiempo: <span className="text-foreground font-mono">{bestTime ? `${bestTime}ms` : "-"}</span></span>
        <Zap className="w-4 h-4 text-primary" />
      </div>

      <button
        onClick={handleClick}
        className={`w-full aspect-[2/1] rounded-xl flex flex-col items-center justify-center transition-all duration-200 border ${
          gameState === "waiting" ? "bg-secondary hover:bg-muted border-transparent" :
          gameState === "ready" ? "bg-destructive/20 border-transparent" :
          gameState === "go" ? "bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/30" :
          "bg-secondary border-transparent"
        }`}
      >
        {gameState === "waiting" && (
          <>
            <Play className="w-8 h-8 mb-2 text-muted-foreground" />
            <span className="text-muted-foreground">Click para empezar</span>
          </>
        )}
        {gameState === "ready" && (
          <>
            <Clock className="w-8 h-8 mb-2 text-destructive animate-pulse" />
            <span className="text-destructive">Espera el verde...</span>
          </>
        )}
        {gameState === "go" && (
          <>
            <Zap className="w-8 h-8 mb-2 text-emerald-400 animate-bounce" />
            <span className="text-emerald-400 font-bold text-2xl tracking-wide animate-pulse">¡AHORA!</span>
          </>
        )}
        {gameState === "result" && (
          <>
            {reactionTime === -1 ? (
              <>
                <span className="text-2xl mb-2">😅</span>
                <span className="text-destructive">¡Muy pronto!</span>
              </>
            ) : (
              <>
                <span className="text-3xl font-bold text-foreground">{reactionTime}ms</span>
                <span className="text-muted-foreground text-sm mt-1">Click para reintentar</span>
              </>
            )}
          </>
        )}
      </button>
    </div>
  )
}

// Mini-game: Click Challenge
function ClickChallenge() {
  const [clicks, setClicks] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [isPlaying, setIsPlaying] = useState(false)
  const [highScore, setHighScore] = useState(0)

  // Game-over logic
  useEffect(() => {
    if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false)
      if (clicks > highScore) {
        setHighScore(clicks)
      }
    }
  }, [timeLeft, isPlaying, clicks, highScore])

  // Timer logic
  useEffect(() => {
    if (!isPlaying) return
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying])

  const startGame = () => {
    setClicks(0)
    setTimeLeft(10)
    setIsPlaying(true)
  }

  const handleClick = () => {
    if (isPlaying) {
      setClicks((c) => c + 1)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Récord: <span className="text-foreground font-mono">{highScore}</span></span>
        <span className="font-mono text-primary">{timeLeft}s</span>
      </div>

      {!isPlaying && timeLeft === 10 ? (
        <button
          onClick={startGame}
          className="w-full aspect-[2/1] rounded-xl bg-secondary hover:bg-muted flex flex-col items-center justify-center transition-colors"
        >
          <Play className="w-8 h-8 mb-2 text-muted-foreground" />
          <span className="text-muted-foreground">Click para empezar</span>
        </button>
      ) : isPlaying ? (
        <button
          onClick={handleClick}
          className="w-full aspect-[2/1] rounded-xl bg-primary/20 hover:bg-primary/30 active:scale-95 flex flex-col items-center justify-center transition-all"
        >
          <span className="text-5xl font-bold text-foreground">{clicks}</span>
          <span className="text-muted-foreground text-sm mt-1">¡Sigue clickeando!</span>
        </button>
      ) : (
        <div className="w-full aspect-[2/1] rounded-xl bg-secondary flex flex-col items-center justify-center">
          <Trophy className="w-8 h-8 text-primary mb-2" />
          <span className="text-2xl font-bold">{clicks} clicks</span>
          <button
            onClick={startGame}
            className="text-primary text-sm mt-2 hover:underline"
          >
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  )
}

const games = [
  {
    id: "memory",
    name: "Memory",
    description: "Encuentra los pares",
    component: MemoryGame,
  },
  {
    id: "reaction",
    name: "Reacción",
    description: "¿Qué tan rápido eres?",
    component: ReactionGame,
  },
  {
    id: "clicks",
    name: "Click Challenge",
    description: "10 segundos, máximos clicks",
    component: ClickChallenge,
  },
]

export function ArcadeSection() {
  const [activeGame, setActiveGame] = useState(games[0])
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={sectionRef}
      id="arcade" 
      className="relative py-16 px-6 overflow-hidden"
      aria-labelledby="arcade-heading"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 text-primary text-sm font-mono tracking-wider uppercase mb-4">
            <Gamepad2 className="w-4 h-4" />
            <span>Arcade</span>
          </div>
          <h2 
            id="arcade-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance"
          >
            Tómate un break
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Mini-juegos para despejar la mente. Porque incluso nosotros 
            necesitamos pausas creativas.
          </p>
        </motion.div>

        {/* Arcade Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card/50 border border-border rounded-3xl overflow-hidden">
            {/* Game Selector */}
            <div className="flex border-b border-border">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game)}
                  className={`flex-1 px-4 py-4 text-sm font-medium transition-colors duration-75 ${
                    activeGame.id === game.id
                      ? "bg-primary/10 text-primary border-b-2 border-primary -mb-px"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <span className="block">{game.name}</span>
                  <span className="block text-xs opacity-70 mt-0.5">{game.description}</span>
                </button>
              ))}
            </div>

            {/* Game Area */}
            <div className="p-6 md:p-8">
              <activeGame.component />
            </div>
          </div>

          {/* Fun fact */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Tip: Los mini-juegos mejoran tu creatividad y enfoque
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-2">
            ¿Te gustaría una herramienta personalizada para tu negocio?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4"
          >
            Contanos tu idea
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
