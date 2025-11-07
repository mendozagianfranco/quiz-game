import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <div>
                <div>
                    <h1>Quiz Game</h1>
                    <p> Metti alla prova le tue conoscenze!
                        Rispondi a una serie di domande e scopri il tuo punteggio finale.
                    </p>
                    <div>
                        <select >
                            <option>Facile</option>
                            <option>Medio</option>
                            <option>Difficile</option>
                        </select>
                    </div>
                    <Link to={'/quiz'}>Inizia il Quiz</Link>
                </div>
            </div>
        </>
    );
}