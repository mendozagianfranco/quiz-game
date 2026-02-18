import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizContext = createContext();

function QuizProvider({ children }) {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState('easy');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [fetchKey, setFetchKey] = useState(1);
    const [loading, setLoading] = useState(false);

    const TOTAL_QUESTION = 10;

    useEffect(() => {
        setLoading(true);
        fetch(`https://opentdb.com/api.php?amount=${TOTAL_QUESTION}&difficulty=${difficulty}&type=multiple`)
            .then(res => res.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    setQuestions(data.results);
                } else {
                    setQuestions([]);
                }
            })
            .catch(() => setQuestions([]))
            .finally(() => setLoading(false));
    }, [fetchKey]);

    let currentQuestion = questions.length > 0 ? questions[currentIndex] : null;

    function nextQuestion() {
        if (currentIndex + 1 >= questions.length) {
            navigate('/score');
            return false;
        }
        setCurrentIndex(prev => prev + 1);
        return true;
    }

    function startQuiz() {
        setFetchKey(prev => prev + 1);
        setCurrentIndex(0);
        setScore(0);
    }

    function resetGame() {
        setCurrentIndex(0);
        setQuestions([]);
        setScore(0);
    }


    return (
        <QuizContext.Provider value={{
            difficulty,
            setDifficulty,
            score,
            setScore,
            setCurrentIndex,
            currentIndex,
            currentQuestion,
            nextQuestion,
            resetGame,
            startQuiz,
            loading,
            TOTAL_QUESTION
        }}>
            {children}
        </QuizContext.Provider>
    );
}


export { QuizProvider, QuizContext };