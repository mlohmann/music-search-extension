const allPlatforms = [
  { id: "searchSpotify", name: "Spotify", url: "https://open.spotify.com/search/" },
  { id: "searchYouTube", name: "YouTube", url: "https://www.youtube.com/results?search_query=" },
  { id: "searchYouTubeMusic", name: "YouTube Music", url: "https://music.youtube.com/search?q=" },
  { id: "searchBandcamp", name: "Bandcamp", url: "https://bandcamp.com/search?q=" },
  { id: "searchSoundCloud", name: "SoundCloud", url: "https://soundcloud.com/search?q=" },
  { id: "searchAmazonMusic", name: "Amazon Music", url: "https://music.amazon.com/search/" },
  { id: "searchAppleMusic", name: "Apple Music", url: "https://music.apple.com/us/search?term=" },
  { id: "searchTidal", name: "Tidal", url: "https://listen.tidal.com/search?q=" },
  { id: "searchDeezer", name: "Deezer", url: "https://www.deezer.com/search/" },
  { id: "searchPandora", name: "Pandora", url: "https://www.pandora.com/search/" },
  { id: "searchIHeartRadio", name: "iHeart Radio", url: "https://www.iheart.com/search/?q=" },
  { id: "searchSiriusXM", name: "Sirius XM", url: "https://www.siriusxm.com/search?term=" }
];

function updateContextMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.storage.sync.get('activePlatforms', (data) => {
      const activePlatforms = data.activePlatforms || allPlatforms.map(p => p.id);
      allPlatforms.forEach(platform => {
        if (activePlatforms.includes(platform.id)) {
          chrome.contextMenus.create({
            id: platform.id,
            title: `Search ${platform.name} for '%s'`,
            contexts: ["selection"]
          });
        }
      });
    });
  });
}

chrome.runtime.onInstalled.addListener(updateContextMenus);

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.activePlatforms) {
    updateContextMenus();
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const platform = allPlatforms.find(p => p.id === info.menuItemId);
  if (platform) {
    const searchQuery = encodeURIComponent(info.selectionText);
    const searchUrl = `${platform.url}${searchQuery}`;
    
    chrome.tabs.create({ url: searchUrl, active: false });
  }
});