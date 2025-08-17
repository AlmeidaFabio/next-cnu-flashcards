
import { categories } from "@/data/categories";
import { StudyStats } from "@/types/StudyStats";

interface DashboardStatsProps {
  studyStats: StudyStats;
  getAccuracy: () => number;
}

export function DashboardStats({ studyStats, getAccuracy }: DashboardStatsProps) {
  const totalCards = Object.values(categories).reduce(
    (acc, cat) => acc + cat.cards.length,
    0
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2">📊</div>
        <h3 className="text-black font-semibold mb-1">Total de Cards</h3>
        <p className="text-2xl font-bold text-blue-300">{totalCards}</p>
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
        <h3 className="text-black font-semibold mb-1">Última Sequência</h3>
        <p className="text-2xl font-bold text-orange-300">{studyStats.streak}</p>
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2">✅</div>
        <h3 className="text-black font-semibold mb-1">Taxa de Acerto</h3>
        <p className="text-2xl font-bold text-emerald-300">{getAccuracy()}%</p>
      </div>
    </div>
  );
}