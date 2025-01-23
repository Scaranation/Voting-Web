// Fungsi untuk mengarahkan ke halaman voting
export function startVoting() {
    window.location.href = 'voting.html';
}

// Tunggu sampai DOM selesai dimuat
document.addEventListener('DOMContentLoaded', (event) => {
    const startVotingButton = document.getElementById('startVotingButton');
    if (startVotingButton) {
        startVotingButton.addEventListener('click', startVoting);
    }
});
