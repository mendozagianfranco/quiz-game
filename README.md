# Quiz Game

Quiz Game è un’applicazione web che permette all’utente di rispondere a una serie di domande a scelta multipla e ottenere un punteggio finale.  
Il progetto è pensato per esercitare competenze su **React**, **React Router**, **Tailwind CSS** e **gestione dello stato globale**.

## Funzionalità

- Selezione del livello di difficoltà (Facile, Medio, Difficile)
- Visualizzazione delle domande con risposte multiple
- Evidenziazione della risposta corretta e sbagliata dopo la selezione
- Aggiornamento del punteggio in tempo reale
- Pagina finale con punteggio e percentuale di risposte corrette
- Possibilità di ripetere il quiz o tornare alla home

## Tecnologie utilizzate

- React
- Vite
- React Router DOM
- Tailwind CSS
- Fetch API per le domande da [Open Trivia Database](https://opentdb.com/api_config.php)

## Installazione e avvio

1. Clona il repository:
```bash
git clone https://github.com/mendozagianfranco/quiz-game.git
```
2. Entra nella cartella:
```bash
cd quiz-game
```
3. Installa le dipendenze:
```bash
npm install
```
4. Avvia il server di sviluppo:
```bash
npm run dev
```
5. Apri l’applicazione nel browser all’indirizzo mostrato dal terminale (di solito `http://localhost:5173`)

## Come funziona

- L’utente seleziona la difficoltà e avvia il quiz
- Le domande vengono recuperate tramite API (Open Trivia Database)
- L’utente seleziona una risposta e il sistema evidenzia il risultato
- Al termine del quiz viene mostrato il punteggio finale e un messaggio di valutazione
- È possibile riprovare il quiz senza ricaricare la pagina

## Possibili miglioramenti futuri

- Aggiungere timer per ogni domanda
- Supportare domande true/false
- Migliorare la UI con animazioni e transizioni

## Licenza

Open source, libero utilizzo e modifiche.

