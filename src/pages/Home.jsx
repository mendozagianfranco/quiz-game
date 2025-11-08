import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <div className='flex flex-col justify-center items-center text-white text-center bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800  h-screen '>
                <div className='px-6' >
                    <h1 className='text-5xl font-bold mb-4'>Quiz Game</h1>
                    <p className='text-lg mb-8 text-gray-100'> Metti alla prova le tue conoscenze!
                        Rispondi a una serie di domande e scopri il tuo punteggio finale.
                    </p>

                    <div className='flex flex-col sm:flex-row gap-4 mb-6 justify-center'>
                        <select className="px-4 py-2 rounded-lg border-2 border-white bg-white text-blue-600 font-semibold shadow-md transition">
                            <option>Facile</option>
                            <option>Medio</option>
                            <option>Difficile</option>
                        </select>
                    </div>
                    <Link
                        to={'/quiz'}
                        className='bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition'
                    >Inizia il Quiz</Link>
                </div>
            </div>
        </>
    );
}