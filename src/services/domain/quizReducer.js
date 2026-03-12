export const initialState = {
    status: "idle",
    questions: [],
    currentIndex: 0,
    score: 0,
};


export function reducer(state, action) {
    switch (action.type) {
        case 'START_QUIZ':
            {
                return { ...state, status: 'loading', currentIndex: 0, score: 0, questions: [] };
            }
        case 'SET_QUESTIONS':
            {
                return { ...state, status: 'playing', currentIndex: 0, questions: action.payload };
            }
        case 'ANSWER':
            {
                if (state.status !== 'playing' || state.questions.length === 0) return state;
                return {
                    ...state,
                    score: action.payload.isCorrect ? state.score + 1 : state.score
                };
            }
        case 'NEXT':
            {
                if (state.status !== 'playing' || state.questions.length === 0) return state;
                const isLast = state.currentIndex + 1 >= state.questions.length;
                return {
                    ...state,
                    currentIndex: isLast ? state.currentIndex : state.currentIndex + 1,
                    status: isLast ? 'finished' : state.status
                };
            }
        case 'RESET':
            {
                return { ...initialState };
            }
        default:
            {
                return state;
            }
    }
}