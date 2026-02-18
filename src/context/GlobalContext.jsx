import { createContext, useState } from 'react';

const QuizContext = createContext();

function QuizProvider({ children }) {
    const [difficulty, setDifficulty] = useState('easy');
    const [score, setScore] = useState(0);

    return (
        <QuizContext.Provider value={{ difficulty, setDifficulty, score, setScore }}>
            {children}
        </QuizContext.Provider>
    );
}


export { QuizProvider, QuizContext };