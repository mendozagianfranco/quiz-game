import { createContext, useState } from 'react';

const QuizContext = createContext();

function QuizProvider({ children }) {
    const [difficulty, setDifficulty] = useState('easy');

    return (
        <QuizContext.Provider value={{ difficulty, setDifficulty }}>
            {children}
        </QuizContext.Provider>
    );
}


export { QuizProvider, QuizContext };