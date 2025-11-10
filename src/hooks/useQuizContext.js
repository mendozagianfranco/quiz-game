import { useContext } from 'react';
import { QuizContext } from '../context/GlobalContext';

export function useQuizContext() {
    const context = useContext(QuizContext);
    return context;
}
