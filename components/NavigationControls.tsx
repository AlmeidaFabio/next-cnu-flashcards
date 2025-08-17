interface NavigationControlsProps {
    currentCard: number;
    totalCards: number;
    onPrevious: () => void;
    onNext: () => void;
  }
  
  export function NavigationControls({
    onPrevious, 
    onNext 
  }: NavigationControlsProps) {
    return (
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onPrevious}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-6 py-3 rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
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
        <button
          onClick={onNext}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-6 py-3 rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
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
    );
  }