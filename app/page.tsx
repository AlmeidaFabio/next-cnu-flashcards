"use client";

import { useEffect, useMemo, useState } from "react";
import { categories } from "@/data/categories";

export default function Flashcard3D() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [studyStats, setStudyStats] = useState({
    correctAnswers: 0,
    totalAnswered: 0,
    streak: 0,
  });

  const [mounted, setMounted] = useState(false);

  // Usar useMemo para gerar valores fixos que não mudam entre renders
  const progressValues = useMemo(() => {
    return categories.map((_, index) => {
      // Usar o índice como seed para gerar valores consistentes
      const seed = (index + 1) * 17.5; // Multiplicador para variar os valores
      return Math.min(95, Math.max(5, (seed % 100))); // Entre 5% e 95%
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getCurrentCards = () => {
    if (selectedCategory === null) return [];
    return categories[selectedCategory]?.cards || [];
  };

  const startStudySession = (categoryKey: number) => {
    setSelectedCategory(categoryKey);
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

  const handleAnswer = (isCorrect: boolean) => {
    setStudyStats((prev) => ({
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      totalAnswered: prev.totalAnswered + 1,
      streak: isCorrect ? prev.streak + 1 : 0,
    }));
    nextCard();
  };

  const nextCard = () => {
    const cards = getCurrentCards();
    setCurrentCard((prev) => (prev + 1) % cards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    const cards = getCurrentCards();
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
    setIsFlipped(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white text-lg font-medium">Carregando flashcards...</p>
        </div>
      </div>
    );
  }

  // Dashboard View
  if (currentView === "dashboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              📚 CNU Flashcards
            </h1>
            <p className="text-blue-200">
              Escolha um assunto para começar a estudar
            </p>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="text-black font-semibold mb-1">Total de Cards</h3>
              <p className="text-2xl font-bold text-blue-300">
                {Object.values(categories).reduce(
                  (acc, cat) => acc + cat.cards.length,
                  0
                )}
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-black font-semibold mb-1">Categorias</h3>
              <p className="text-2xl font-bold text-green-300">
                {Object.keys(categories).length}
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">🔥</div>
              <h3 className="text-black font-semibold mb-1">
                Última Sequência
              </h3>
              <p className="text-2xl font-bold text-orange-300">
                {studyStats.streak}
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="text-black font-semibold mb-1">Taxa de Acerto</h3>
              <p className="text-2xl font-bold text-emerald-300">
                {getAccuracy()}%
              </p>
            </div>
          </div>

          {/* Grid de Categorias */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => startStudySession(category.id -1)}
              >
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-opacity-20 transition-all">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-black mb-3">
                    {category.name}
                  </h3>

                  <p className="text-blue-400 mb-6">
                    {category.cards.length} flashcards disponíveis
                  </p>

                  <div
                    className={`bg-gradient-to-r ${category.color} text-white px-6 py-3 rounded-lg font-semibold group-hover:shadow-lg transition-all`}
                  >
                    Começar Estudo
                  </div>

                  {/* Barra de Progresso Visual */}
                  <div className="mt-4">
                    <div className="bg-white bg-opacity-20 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-blue-400 mt-2">
                      Progresso geral
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Seção de Dicas */}
          <div className="mt-16 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-black mb-6 text-center">
              💡 Dicas de Estudo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🧠</div>
                <h3 className="text-black font-semibold mb-2">
                  Repetição Espaçada
                </h3>
                <p className="text-blue-400 text-sm">
                  Revise os cards que você errou com mais frequência
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">⏰</div>
                <h3 className="text-black font-semibold mb-2">
                  Sessões Curtas
                </h3>
                <p className="text-blue-400 text-sm">
                  Estude por 15-20 minutos para melhor retenção
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-black font-semibold mb-2">Seja Honesto</h3>
                <p className="text-blue-400 text-sm">
                  Marque "errei" se não souber completamente a resposta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Study View
  const cards = getCurrentCards();
  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <p>Nenhum card encontrado para esta categoria.</p>
          <button
            onClick={() => setCurrentView("dashboard")}
            className="mt-4 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentCardData = cards[currentCard];
  const category = categories[selectedCategory!];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setCurrentView("dashboard")}
            className="flex items-center gap-2 text-black bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar
          </button>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2 justify-center">
              {category.name}
            </h1>
            <p className="text-blue-200">
              Card {currentCard + 1} de {cards.length}
            </p>
          </div>

          <div className="text-right">
            <div className="text-white text-sm">
              <div>Acertos: {getAccuracy()}%</div>
              <div>Sequência: {studyStats.streak}</div>
            </div>
          </div>
        </div>

        {/* Card Container */}
        <div className="relative">
          {/* 3D Perspective Container */}
          <div
            className="w-full h-80 cursor-pointer"
            onClick={handleFlip}
            style={{ perspective: "1000px" }}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700`}
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front Side - Question */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-white to-blue-50 shadow-2xl border border-blue-100"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                    Pergunta
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                    {currentCardData.question}
                  </h2>
                  <div className="mt-8 text-blue-500 text-sm">
                    Clique para ver a resposta
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-blue-100 rounded-full opacity-50"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-purple-100 rounded-full opacity-30"></div>
              </div>

              {/* Back Side - Answer */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl border border-green-100"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                    Resposta
                  </div>
                  <p className="text-xl text-gray-800 leading-relaxed mb-8">
                    {currentCardData.answer}
                  </p>

                  {/* Botões de Avaliação */}
                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAnswer(false);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all"
                    >
                      ❌ Errei
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAnswer(true);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all"
                    >
                      ✅ Acertei
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevCard}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-6 py-3 rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Anterior
            </button>

            <div className="text-black bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
              {currentCard + 1} de {cards.length}
            </div>

            <button
              onClick={nextCard}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-6 py-3 rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              Próximo
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-blue-200 text-sm">
          <p>
            💡 Dica: Clique no card para virar e use os botões de navegação para
            alternar entre os cards
          </p>
        </div>
      </div>
    </div>
  );
}
