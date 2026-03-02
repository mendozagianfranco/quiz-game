import { transformQuestions } from '../domain/transformQuestions';

export async function fetchQuestions(difficulty, total = 10) {

    const res = await fetch(`https://opentdb.com/api.php?amount=${total}&difficulty=${difficulty}&type=multiple`);
    const data = await res.json();
    if (!data.results) return [];
    return transformQuestions(data.results);
}
