export function startQuiz() { return { type: 'START_QUIZ' }; }

export function setQuestions(questions) { return { type: 'SET_QUESTIONS', payload: questions }; }

export function answerQuestion(isCorrect) { return { type: 'ANSWER', payload: { isCorrect } }; }

export function nextQuestion() { return { type: 'NEXT' }; }

export function resetQuiz() { return { type: 'RESET' }; }

export function setError(message) { return { type: 'SET_ERROR', payload: { message } }; }