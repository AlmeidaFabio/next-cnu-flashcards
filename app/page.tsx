"use client";

import { useEffect, useMemo, useState } from "react";
import { categories } from "@/data/categories";
import { DashboardView } from "@/components/DashboardView";
import { useFlashcard } from "@/hooks/useFlashcard";
import { StudyView } from "@/components/StudyView";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function FlashcardPage() {
  const { 
    studyStats, 
    shuffledCards,
    getAccuracy, 
    startStudySession,
    currentCard,
    currentView,
    handleAnswer,
    handleFlip,
    isFlipped,
    navigateCard,
    selectedCategory,
    setCurrentView, 
  } = useFlashcard();

  const [mounted, setMounted] = useState(false);

  const progressValues = useMemo(() => {
    return categories.map((_, index) => {
      const seed = (index + 1) * 17.5;
      return Math.min(95, Math.max(5, (seed % 100)));
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getCurrentCards = () => {
    if (selectedCategory === null) return [];
    return categories[selectedCategory]?.cards || [];
  };

  const getCurrentCardData = () => {
    if (selectedCategory === null || shuffledCards.length === 0) return null;
    const cardIndex = shuffledCards[currentCard];
    return categories[selectedCategory]?.cards[cardIndex];
  };

  if (!mounted) {
    return <LoadingSpinner />;
  }

  // Dashboard View
  if (currentView === "dashboard") {
    return (
      <DashboardView 
        studyStats={studyStats} 
        getAccuracy={getAccuracy} 
        startStudySession={(categoryKey) => {
          const cards = categories[categoryKey]?.cards || [];
          startStudySession(categoryKey, cards.length);
        }}
        progressValues={progressValues}
      />
    );
  }

  // Study View
  const cards = getCurrentCards();
  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <p className="text-white text-lg">Nenhum card encontrado nesta categoria</p>
      </div>
    );
  }

  const currentCardData = getCurrentCardData();
  const accuracy = getAccuracy();

  if (!currentCardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <p className="text-white text-lg">Dados do card não encontrados</p>
      </div>
    );
  }

  return (
    <StudyView 
      selectedCategory={selectedCategory as number}
      currentCardIndex={currentCard}
      isFlipped={isFlipped}
      accuracy={accuracy}
      onAnswer={(isCorrect: boolean) => handleAnswer(isCorrect, () => navigateCard('next', cards.length))}
      onBackToDashboard={() => setCurrentView("dashboard")}
      onFlip={handleFlip}
      onNavigate={(dir: 'next' | 'prev') => navigateCard(dir, cards.length)}
      streak={studyStats.streak}
      cardData={currentCardData}
      totalCards={cards.length}
    />
  );
}