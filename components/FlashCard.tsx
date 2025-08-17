"use client";

import { Flashcard } from "@/types/Flashcard";
import { useState } from "react";

interface FlashCard3DProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
  onAnswer: (isCorrect: boolean) => void;
}

export default function FlashCard3D({ 
  card, 
  isFlipped, 
  onFlip, 
  onAnswer 
}: FlashCard3DProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    onFlip();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleAnswer = (isCorrect: boolean) => {
    onAnswer(isCorrect);
    // Reset flip state for next card
    if (isFlipped) {
      onFlip();
    }
  };

  return (
    <div className="relative w-full h-80 perspective-1000">
      {/* 3D Card Container */}
      <div
        className={`
          relative w-full h-full transform-style-preserve-3d transition-transform duration-300 cursor-pointer
          ${isFlipped ? 'rotate-y-180' : ''}
          ${isAnimating ? 'pointer-events-none' : ''}
        `}
        onClick={handleFlip}
      >
        {/* Front of Card (Question) */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl border border-gray-200 flex flex-col justify-center items-center p-8 hover:shadow-3xl transition-shadow duration-300">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">
                Pergunta
              </h3>
              <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
                {card.question}
              </p>
            </div>
            
            {/* Flip Indicator */}
            <div className="absolute bottom-4 right-4 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
        </div>

        {/* Back of Card (Answer) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-2xl flex flex-col justify-center items-center p-2 text-white">
            <div className="text-center flex-1 flex flex-col justify-center">
              <h3 className="text-sm font-medium text-blue-200 mb-4 uppercase tracking-wider">
                Resposta
              </h3>
              <p className="text-xl md:text-2xl font-semibold leading-relaxed">
                {card.answer}
              </p>
            </div>

            {/* Answer Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnswer(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Errei
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnswer(true);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Acertei
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}