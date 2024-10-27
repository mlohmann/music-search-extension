const allPlatforms = [
  { id: "searchSpotify", name: "Spotify" },
  { id: "searchYouTube", name: "YouTube" },
  { id: "searchYouTubeMusic", name: "YouTube Music" },
  { id: "searchBandcamp", name: "Bandcamp" },
  { id: "searchSoundCloud", name: "SoundCloud" },
  { id: "searchAmazonMusic", name: "Amazon Music" },
  { id: "searchAppleMusic", name: "Apple Music" },
  { id: "searchTidal", name: "Tidal" },
  { id: "searchDeezer", name: "Deezer" },
  { id: "searchPandora", name: "Pandora" },
  { id: "searchIHeartRadio", name: "iHeart Radio" },
  { id: "searchSiriusXM", name: "Sirius XM" }
];

function saveOptions() {
  const activePlatforms = allPlatforms
    .filter(platform => document.getElementById(platform.id).checked)
    .map(platform => platform.id);
  
  chrome.storage.sync.set({ activePlatforms: activePlatforms }, () => {
    const status = document.createElement('p');
    status.textContent = 'Options saved.';
    document.body.appendChild(status);
    setTimeout(() => {
      status.remove();
    }, 3000);
  });
}

function restoreOptions() {
  chrome.storage.sync.get('activePlatforms', (data) => {
    const activePlatforms = data.activePlatforms || allPlatforms.map(p => p.id);
    allPlatforms.forEach(platform => {
      const checkbox = document.getElementById(platform.id);
      checkbox.checked = activePlatforms.includes(platform.id);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const optionsDiv = document.getElementById('options');
  allPlatforms.forEach(platform => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = platform.id;
    const checkmark = document.createElement('div');
    checkmark.className = 'checkmark';
    label.appendChild(checkbox);
    label.appendChild(checkmark);
    label.appendChild(document.createTextNode(platform.name));
    optionsDiv.appendChild(label);
  });
  
  restoreOptions();
  document.getElementById('save').addEventListener('click', saveOptions);
});
