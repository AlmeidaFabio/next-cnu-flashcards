import React from "react";
import { categories } from "@/data/categories";
import { DashboardStats } from "./DashboardStats";
import { CategoryCard } from "./CategoryCard";
import { StudyTips } from "./StudyTips";
import { StudyStats } from "@/types/StudyStats";

interface DashboardViewProps {
  studyStats: StudyStats;
  getAccuracy: () => number;
  startStudySession: (categoryId: number) => void;
  progressValues: number[];
}

const gradientClasses = "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8";
const containerClasses = "max-w-4xl w-full";

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  studyStats, 
  getAccuracy, 
  startStudySession 
}) => {
  // Validação de segurança
  if (!categories || !Array.isArray(categories)) {
    return (
      <div className={gradientClasses}>
        <div className="text-center text-white">
          <p>Não foi possível carregar as categorias.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={gradientClasses}>
      <div className={containerClasses}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            📚 CNU Flashcards
          </h1>
          <p className="text-blue-200">
            Escolha um assunto para começar a estudar
          </p>
        </div>

        <DashboardStats 
          studyStats={studyStats} 
          getAccuracy={getAccuracy} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onStartStudy={() => startStudySession(category.id - 1)}
            />
          ))}
        </div>

        <StudyTips />
      </div>
    </div>
  );
};