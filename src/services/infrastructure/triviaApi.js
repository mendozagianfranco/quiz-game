import { transformQuestions } from '../domain/transformQuestions';

export async function fetchQuestions(difficulty, total = 10) {

    try {
        const res = await fetch(`https://opentdb.com/api.php?amount=${total}&difficulty=${difficulty}&type=multiple`);
        if (!res.ok) {
            throw new Error('Errore chiamate API');
        }
        const data = await res.json();
        if (!data.results) return [];
        return transformQuestions(data.results);
    } catch (error) {
        console.error(error);
        return [];
    }
}
