import { Category } from "@/types/Flashcard";
  
  interface CategoryCardProps {
    category: Category;
    onStartStudy: (categoryId: number) => void;
  }
  
  export function CategoryCard({ category, onStartStudy }: CategoryCardProps) {
    const progressValue = Math.min(95, Math.max(5, ((category.id) * 17.5) % 100));
  
    return (
      <div
        className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
        onClick={() => onStartStudy(category.id - 1)}
      >
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-opacity-20 transition-all">
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
            {category.icon}
          </div>
  
          <h3 className="text-2xl font-bold text-black mb-3">{category.name}</h3>
  
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
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
            <p className="text-xs text-blue-400 mt-2">Progresso geral</p>
          </div>
        </div>
      </div>
    );
  }