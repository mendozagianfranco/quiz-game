import { useReducer } from 'react';
import * as actions from '../services/domain/quizActions';
import { reducer, initialState } from '../services/domain/quizReducer';

export function useQuizGame() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const startQuiz = () => dispatch(actions.startQuiz());
    const setQuestions = (questions) => dispatch(actions.setQuestions(questions));
    const answerQuestion = (isCorrect) => dispatch(actions.answerQuestion(isCorrect));
    const nextQuestion = () => dispatch(actions.nextQuestion());
    const resetQuiz = () => dispatch(actions.resetQuiz());

    return {
        state,
        startQuiz,
        setQuestions,
        answerQuestion,
        nextQuestion,
        resetQuiz
    };
}