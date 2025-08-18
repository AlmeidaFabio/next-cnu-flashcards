import { categories } from "@/data/categories";
import { StudyHeader } from "./StudyHeader";
import FlashCard3D from "./FlashCard";
import { NavigationControls } from "./NavigationControls";
import { Category, Flashcard } from "@/types/Flashcard";
import React from "react";

interface StudyViewProps {
  selectedCategory: number;
  categoryData?: Category;
  currentCardIndex: number;
  isFlipped: boolean;
  accuracy: number;
  onAnswer: (isCorrect: boolean) => void;
  onBackToDashboard: () => void;
  onFlip: () => void;
  onNavigate: (direction: "next" | "prev") => void;
  streak: number;
  cardData: Flashcard;
  totalCards: number;
}

const gradientClasses =
  "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8";

export const StudyView: React.FC<StudyViewProps> = ({
  selectedCategory,
  currentCardIndex,
  isFlipped,
  accuracy,
  streak,
  cardData,
  totalCards,
  onFlip,
  onAnswer,
  onNavigate,
  onBackToDashboard,
}) => {
  const category = categories[selectedCategory];

  if (!category || !cardData) {
    return (
      <div className={gradientClasses}>
        <div className="text-center text-white">
          <p>Nenhum card encontrado para esta categoria.</p>
          <button
            onClick={onBackToDashboard}
            className="mt-4 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={gradientClasses}>
      <div className="max-w-2xl w-full">
        <StudyHeader
          category={category}
          currentCard={currentCardIndex}
          totalCards={totalCards}
          accuracy={accuracy}
          streak={streak}
          onBack={onBackToDashboard}
        />

        <FlashCard3D
          card={cardData}
          isFlipped={isFlipped}
          onFlip={onFlip}
          onAnswer={onAnswer}
        />

        <NavigationControls
          currentCard={currentCardIndex}
          totalCards={totalCards}
          onPrevious={() => onNavigate("prev")}
          onNext={() => onNavigate("next")}
        />

        <div className="mt-8 text-center text-blue-200 text-sm">
          <p>
            💡 Dica: Clique no card para virar e use os botões de navegação para
            alternar entre os cards
          </p>
        </div>
      </div>
    </div>
  );
};
