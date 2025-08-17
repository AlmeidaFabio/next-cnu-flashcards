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
  onNavigate: (direction: 'next' | 'prev') => void;
  streak: number;
  cardData: Flashcard;
  totalCards: number;
}

const gradientClasses = "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8";

export const StudyView: React.FC<StudyViewProps> = ({
  selectedCategory,
  currentCardIndex,
  isFlipped,
  accuracy,
  streak,
  onFlip,
  onAnswer,
  onNavigate,
  onBackToDashboard,
}) => {
  // Validação de segurança
  const isValidCategory = selectedCategory >= 0 && selectedCategory < categories.length;
  const category = isValidCategory ? categories[selectedCategory] : null;
  const cards: Flashcard[] = category?.cards || [];
  
  // Garante que currentCard está dentro dos limites
  const safeCurrentCard = Math.max(0, Math.min(currentCardIndex, cards.length - 1));
  const currentCardData = cards[safeCurrentCard];

  if (!category || cards.length === 0) {
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
          currentCard={safeCurrentCard}
          totalCards={cards.length}
          accuracy={accuracy}
          streak={streak}
          onBack={onBackToDashboard}
        />

        {currentCardData && (
          <FlashCard3D
            card={currentCardData}
            isFlipped={isFlipped}
            onFlip={onFlip}
            onAnswer={onAnswer}
          />
        )}

        <NavigationControls
          currentCard={safeCurrentCard}
          totalCards={cards.length}
          onPrevious={() => onNavigate('prev')}
          onNext={() => onNavigate('next')}
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