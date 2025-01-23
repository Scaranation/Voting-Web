import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const voteForm = document.getElementById('vote-form');
const resultsDiv = document.getElementById('vote-results');

voteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const vote = voteForm.vote.value;

    if (sessionStorage.getItem('hasVoted')) {
        alert('Anda sudah memberikan suara.');
        return;
    }

    try {
        const newVoteRef = ref(db, 'votes');
        await push(newVoteRef, { vote });
        sessionStorage.setItem('hasVoted', true);
    } catch (error) {
        console.error('Error adding vote: ', error);
    }
});

const votesRef = ref(db, 'votes');
onValue(votesRef, (snapshot) => {
    const votes = snapshot.val();
    const voteCounts = { 'Fedoras': 0, 'Dhani': 0 };
    for (const key in votes) {
        voteCounts[votes[key].vote]++;
    }
    resultsDiv.innerHTML = `
        <p>Fedoras: ${voteCounts['Fedoras']} votes</p>
        <p>Dhani: ${voteCounts['Dhani']} votes</p>
    `;
});

function viewResults() {
    window.location.href = 'results.html';
}

document.addEventListener('DOMContentLoaded', (event) => {
    const viewResultsButton = document.getElementById('viewResultsButton');
    if (viewResultsButton) {
        viewResultsButton.addEventListener('click', viewResults);
    }
});
