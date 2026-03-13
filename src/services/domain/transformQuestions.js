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
    for (let i = questions.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
}