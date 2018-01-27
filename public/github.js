
function getNumberOfDownloads(extension) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "https://api.github.com/repos/tahnik/devRantron/releases", true);
  xhr.send();

  let downloads = 0;

  xhr.onreadystatechange = processRequest;
  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const response = JSON.parse(xhr.responseText);
      response.forEach(releases => {
        const { assets } = releases;
        assets.forEach((asset) => {
          if (
            endsWith('exe', asset.name) ||
            endsWith('AppImage', asset.name) ||
            endsWith('dmg', asset.name) ||
            endsWith('deb', asset.name)
          ) {
            downloads += parseInt(asset.download_count);
          }
        })
      });
      document.getElementById('downloads').innerHTML = kFormatter(downloads);
    }
  }
}

getNumberOfDownloads();