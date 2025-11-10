import { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

function QuizProvider({ children }) {
    const [difficulty, setDifficulty] = useState('easy');

    return (
        <QuizContext.Provider value={{ difficulty, setDifficulty }}>
            {children}
        </QuizContext.Provider>
    );
}

function useQuizContext() {
    const context = useContext(QuizContext);
    return context;
}

export { QuizProvider, useQuizContext };