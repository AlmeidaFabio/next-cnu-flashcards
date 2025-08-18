import { StudyStats } from "@/types/StudyStats";
import { useState } from "react";

export function useFlashcard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<number[]>([]);
  const [studyStats, setStudyStats] = useState<StudyStats>({
    correctAnswers: 0,
    totalAnswered: 0,
    streak: 0,
  });

  const shuffleCards = (totalCards: number) => {
    const cardsArray = Array.from({length: totalCards}, (_, i) => i);
    // Algoritmo de Fisher-Yates para embaralhar
    for (let i = cardsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
    setShuffledCards(cardsArray);
  };

  const startStudySession = (categoryKey: number, totalCards: number) => {
    setSelectedCategory(categoryKey);
    
    // Só embaralha se for uma nova categoria ou se shuffledCards estiver vazio
    if (selectedCategory !== categoryKey || shuffledCards.length === 0) {
      shuffleCards(totalCards);
    }
    
    setCurrentView("study");
    setCurrentCard(0);
    setIsFlipped(false);
    setStudyStats({ correctAnswers: 0, totalAnswered: 0, streak: 0 });
  };

  const getAccuracy = () => {
    if (studyStats.totalAnswered === 0) return 0;
    return Math.round(
      (studyStats.correctAnswers / studyStats.totalAnswered) * 100
    );
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (isCorrect: boolean, nextCardFn: () => void) => {
    setStudyStats((prev) => ({
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      totalAnswered: prev.totalAnswered + 1,
      streak: isCorrect ? prev.streak + 1 : 0,
    }));
    nextCardFn();
  };

  const navigateCard = (direction: 'next' | 'prev', totalCards: number) => {
    if (direction === 'next') {
      setCurrentCard((prev) => (prev + 1) % totalCards);
    } else {
      setCurrentCard((prev) => (prev - 1 + totalCards) % totalCards);
    }
    setIsFlipped(false);
  };

  return {
    isFlipped,
    currentView,
    selectedCategory,
    currentCard,
    studyStats,
    shuffledCards,
    startStudySession,
    getAccuracy,
    handleFlip,
    handleAnswer,
    navigateCard,
    setCurrentView,
  };
}