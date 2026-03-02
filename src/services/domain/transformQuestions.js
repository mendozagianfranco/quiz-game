export function transformQuestions(rawQuestions) {
    return rawQuestions.map(q => ({
        id: generateId(),
        question: q.question,
        answers: shuffle([q.correct_answer, ...q.incorrect_answers]),
        correctAnswer: q.correct_answer,
        difficulty: q.difficulty,
        type: q.type,
    }));
}

function generateId() {
    return `q-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function shuffle(questions) {
    return questions.sort(() => Math.random() - 0.5);
}