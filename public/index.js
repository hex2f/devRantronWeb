var OSName="Unknown";

if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

switch (OSName) {
  case "Windows":
    document.getElementsByClassName('windows')[0].classList += " active";
    break;
  case "MacOS":
    document.getElementsByClassName('macOS')[0].classList += " active";
    break;
  case "Linux":
    document.getElementsByClassName('debian')[0].classList += " active";
    break;
  default:
    break;
}

function endsWith (needle, haystack) {
  return haystack.indexOf(needle) === (haystack.length - needle.length);
};

function getDownloadLink(extension) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "https://api.github.com/repos/tahnik/devRantron/releases/latest", true);
  xhr.send();

  xhr.onreadystatechange = processRequest;
  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const response = JSON.parse(xhr.responseText);
      const assets = response.assets;
      assets.forEach(function(element) {
        if (endsWith('exe', element.name)) {
          document.getElementById('windows').href = element.browser_download_url;
        }
        if (endsWith('dmg', element.name)) {
          document.getElementById('macOS').href = element.browser_download_url;
        }
        if (endsWith('deb', element.name)) {
          document.getElementById('debian').href = element.browser_download_url;
        }
        if (endsWith('AppImage', element.name)) {
          document.getElementById('linux').href = element.browser_download_url;
        }
      }, this);
    }
  }
}

getDownloadLink();
