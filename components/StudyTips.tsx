export function StudyTips() {
    const tips = [
      {
        icon: "🧠",
        title: "Repetição Espaçada",
        description: "Revise os cards que você errou com mais frequência"
      },
      {
        icon: "⏰",
        title: "Sessões Curtas",
        description: "Estude por 15-20 minutos para melhor retenção"
      },
      {
        icon: "🎯",
        title: "Seja Honesto",
        description: "Marque \"errei\" se não souber completamente a resposta"
      }
    ];
  
    return (
      <div className="mt-16 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          💡 Dicas de Estudo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-3">{tip.icon}</div>
              <h3 className="text-black font-semibold mb-2">{tip.title}</h3>
              <p className="text-blue-400 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }