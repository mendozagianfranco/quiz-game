import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Score from './pages/Score';
import { QuizProvider } from './context/GlobalContext';

function App() {
  return (
    <>
      <QuizProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/score' element={<Score />} />
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    </>
  );
}

export default App;
