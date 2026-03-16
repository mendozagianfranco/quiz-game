import { transformQuestions } from '../domain/transformQuestions';

export async function fetchQuestions(difficulty, type, total = 10) {

    try {
        const res = await fetch(`https://opentdb.com/api.php?amount=${total}&difficulty=${difficulty}&type=${type}`);
        if (!res.ok) {
            throw new Error('Error API');
        }
        const data = await res.json();
        if (data.response_code === 1) {
            throw new Error('No Results');
        };
        return transformQuestions(data.results);
    } catch (error) {
        return { error: true, message: error.message };
    }
}
