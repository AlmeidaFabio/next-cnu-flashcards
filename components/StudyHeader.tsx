import { Category } from "@/types/Flashcard";

interface StudyHeaderProps {
  category: Category;
  currentCard: number;
  totalCards: number;
  accuracy: number;
  streak: number;
  onBack: () => void;
}

export function StudyHeader({
  category,
  currentCard,
  totalCards,
  accuracy,
  streak,
  onBack,
}: StudyHeaderProps) {
  return (
    <div>
      <div className="flex-1 flex items-center, justify-center p-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2 justify-center">
          {category.name}
        </h1>
      </div>
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-black bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all cursor-pointer"
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
          <p className="text-blue-200">
            Card {currentCard + 1} de {totalCards}
          </p>
        </div>

        <div className="text-right">
          <div className="text-white text-sm">
            <div>Acertos: {accuracy}%</div>
            <div>Sequência: {streak}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
