const binMessage = document.getElementById('bin-message');
const refreshButton = document.getElementById('refresh-button');
const binFaces = document.querySelectorAll('.bin-face');

const loadingQuips = [
  'Wheeling in the latest gossip...',
  'Peeking into the council crystal ball...',
  'Asking the bin fairies nicely...',
  'Polishing the recycling badge...'
];

const cheerQuips = [
  'Remember: lids down, smiles up!',
  'Give your bin a pep-talk the night before.',
  'Neighbourhood bin boogie incoming!'
];

async function fetchBinInfo() {
  spinFaces();
  setRandomLoadingMessage();

  try {
    const response = await fetch('/api/bin', {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    if (data.binType) {
      celebrateBin(data.binType);
    } else {
      throw new Error('No bin type in response.');
    }
  } catch (error) {
    console.error('Error fetching bin info', error);
    showError();
  }
}

function setRandomLoadingMessage() {
  const quip = loadingQuips[Math.floor(Math.random() * loadingQuips.length)];
  binMessage.textContent = quip;
  binMessage.classList.remove('bin-message--pop');
}

function celebrateBin(binType) {
  binMessage.textContent = `Next collection: ${binType}!`;
  void binMessage.offsetWidth;
  binMessage.classList.add('bin-message--pop');
  refreshButton.blur();

  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  confetti.textContent = '✨';
  document.body.append(confetti);
  setTimeout(() => confetti.remove(), 1200);

  const cheer = cheerQuips[Math.floor(Math.random() * cheerQuips.length)];
  refreshButton.setAttribute('aria-label', `${binMessage.textContent}. ${cheer}`);
}

function showError() {
  binMessage.textContent = 'Bin bots are snoozing. Try again soon!';
  binMessage.classList.remove('bin-message--pop');
  refreshButton.setAttribute('aria-label', 'Reload bin info');
}

function spinFaces() {
  binFaces.forEach((face, index) => {
    face.style.transform = `rotate(${index ? -12 : 12}deg) scale(1.05)`;
    setTimeout(() => {
      face.style.transform = '';
    }, 900);
  });
}

refreshButton.addEventListener('click', fetchBinInfo);

window.addEventListener('load', fetchBinInfo);
