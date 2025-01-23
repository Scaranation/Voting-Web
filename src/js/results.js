import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const resultsChartElem = document.getElementById('resultsChart').getContext('2d');
let chart;

function updateChart(voteCounts) {
    const data = {
        labels: ['Fedoras', 'Dhani'],
        datasets: [{
            label: 'Votes',
            data: [voteCounts['Fedoras'], voteCounts['Dhani']],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverOffset: 4
        }]
    };

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(resultsChartElem, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    });
}

const votesRef = ref(db, 'votes');
onValue(votesRef, (snapshot) => {
    const votes = snapshot.val();
    const voteCounts = { 'Fedoras': 0, 'Dhani': 0 };
    for (const key in votes) {
        voteCounts[votes[key].vote]++;
    }
    updateChart(voteCounts);
});
