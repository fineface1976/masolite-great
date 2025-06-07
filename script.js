 // ICO timer
const icoEndDate = new Date('2024-12-31T23:59:59').getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = icoEndDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((diff % 1000));
    document.getElementById('icoTimer').textContent = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}, 1);

// ICO totalizer
document.getElementById('buyBtn').addEventListener('click', () => {
    const totalizer = parseFloat(document.getElementById('icoTotalizer').textContent);
    document.getElementById('icoTotalizer').textContent = (totalizer + 100).toFixed(3);
});

// Mining functionality
let isMining = false;
let miningInterval;
let miningHours = 24;
let miningMinutes = 0;
let miningSeconds = 0;
let miningMilliseconds = 0;

function updateMiningTimer() {
    document.getElementById('miningTimer').textContent = `${miningHours.toString().padStart(2, '0')}:${miningMinutes.toString().padStart(2, '0')}:${miningSeconds.toString().padStart(2, '0')}.${miningMilliseconds.toString().padStart(3, '0')}`;
}

document.getElementById('miningBtn').addEventListener('click', () => {
    if (!isMining) {
        isMining = true;
        document.getElementById('miningStatus').textContent = 'ACTIVE';
        document.getElementById('miningStatus').classList.remove('status-inactive');
        document.getElementById('miningStatus').classList.add('status-active');
        miningInterval = setInterval(() => {
            miningMilliseconds -= 10;
            if (miningMilliseconds < 0) {
                miningMilliseconds = 990;
                miningSeconds--;
            }
            if (miningSeconds < 0) {
                miningSeconds = 59;
                miningMinutes--;
            }
            if (miningMinutes < 0) {
                miningMinutes = 59;
                miningHours--;
            }
            if (miningHours < 0) {
                clearInterval(miningInterval);
                isMining = false;
                document.getElementById('miningStatus').textContent = 'INACTIVE';
                document.getElementById('miningStatus').classList.remove('status-active');
                document.getElementById('miningStatus').classList.add('status-inactive');
            }
            updateMiningTimer();
            const totalMined = parseFloat(document.getElementById('totalMined').textContent);
            document.getElementById('totalMined').textContent = (totalMined + 0.001).toFixed(3);
        }, 10);
    } else {
        clearInterval(miningInterval);
        isMining = false;
        document.getElementById('miningStatus').textContent = 'INACTIVE';
        document.getElementById('miningStatus').classList.remove('status-active');
        document.getElementById('miningStatus').classList.add('status-inactive');
    }
});

// Toggle mining status
document.getElementById('miningToggle').addEventListener('change', (e) => {
    if (e.target.checked) {
        document.getElementById('miningBtn').click();
    } else {
        document.getElementById('miningBtn').click();
    }
});

// Initialize mining timer
updateMiningTimer();
