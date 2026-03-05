export function startQuiz() { ({ type: 'START_QUIZ' }); }

export function setQuestions(questions) { ({ type: 'SET_QUESTIONS', payload: questions }); }

export function answerQuestion(isCorrect) { dispatch({ type: 'ANSWER', payload: { isCorrect } }); }

export function nextQuestion() { ({ type: 'NEXT' }); }

export function resetQuiz() { dispatch({ type: 'RESET' }); }