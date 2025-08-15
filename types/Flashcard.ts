export type Flashcard = {
    id: number;
    question: string;
    answer: string;
    categoryId: number;
}

export type Category = {
    id: number;
    name: string;
    color: string;
    icon: string;
    cards: Flashcard[];
}