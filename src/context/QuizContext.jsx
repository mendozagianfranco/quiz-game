import { createContext } from 'react';
import { useQuizGame } from '../hooks/useQuizGame';

const QuizContext = createContext();

function QuizProvider({ children }) {
    const quiz = useQuizGame();

    return (
        <QuizContext.Provider value={quiz}>
            {children}
        </QuizContext.Provider>
    );
}


export { QuizProvider, QuizContext };