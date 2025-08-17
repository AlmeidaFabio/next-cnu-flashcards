import { democraciaEcidaniaFlashcards } from "./flashcards/democracia-e-cidadania";
import { politicasPublicasFlashcards } from "./flashcards/politicas-publicas";
import { eticaEIntegridadeFlashcards } from "./flashcards/etica-e-integridade";
import { diversidadeEInclusaoFlashcards } from './flashcards/diversidade-e-inclusao'
import { admnistracaoPublicaFederalFlashcards } from './flashcards/adm-pub-federal'
import { trabalhoETecnologiaFlashcards } from './flashcards/trabalho-e-tecnologia'
import { eixo1 } from './flashcards/des-sustent-inclusao'
import { eixo2 } from './flashcards/des-produtivo-e-regional'
import { eixo3 } from './flashcards/gestao-e-regulacao'
import { eixo4 } from './flashcards/desenv-socioeconomico'
import { eixo5 } from './flashcards/desigualdades-e-dinamicas-socioeconomicas'

export const categories = [
  {
    id: 1,
    name: "Desafios do estado de direito: democracia e cidadania",
    color: "from-green-500 to-emerald-600",
    icon: "⚖️",
    cards: democraciaEcidaniaFlashcards,
  },
  {
    id: 2,
    name: "Políticas Públicas",
    color: "from-blue-500 to-cyan-600",
    icon: "📋",
    cards: politicasPublicasFlashcards,
  },
  {
    id: 3,
    name: "Ética e Integridade",
    color: "from-purple-500 to-violet-600",
    icon: "🤝",
    cards: eticaEIntegridadeFlashcards,
  },
  {
    id: 4,
    name: "Diversidade e Inclusão",
    color: "from-pink-500 to-rose-600",
    icon: "🌈",
    cards: diversidadeEInclusaoFlashcards
  },
  {
    id: 5,
    name: "Administração Pública Federal",
    color: "from-indigo-500 to-blue-700",
    icon: "🏛️",
    cards: admnistracaoPublicaFederalFlashcards
  },
  {
    id: 6,
    name: "Trabalho e Tecnologia",
    color: "from-teal-500 to-cyan-700",
    icon: "💻",
    cards: trabalhoETecnologiaFlashcards
  },
  {
    id: 7,
    name: "Desenvolvimento, Sustentabilidade e Inclusão",
    color: "from-emerald-500 to-green-700",
    icon: "🌱",
    cards: eixo1
  },
  {
    id: 8,
    name: "Desenvolvimento Produtivo e Regional no Brasil",
    color: "from-orange-500 to-red-600",
    icon: "🏭",
    cards: eixo2
  },
  {
    id: 9,
    name: "Gestão Estratégica e Regulação",
    color: "from-slate-500 to-gray-700",
    icon: "📊",
    cards: eixo3
  },
  {
    id: 10,
    name: "Desenvolvimento Socioeconômico no Brasil",
    color: "from-amber-500 to-yellow-600",
    icon: "📈",
    cards: eixo4
  },
  {
    id: 11,
    name: "Desigualdades e Dinâmicas Socioeconômicas no Brasil",
    color: "from-red-500 to-pink-700",
    icon: "📊",
    cards: eixo5
  },
];