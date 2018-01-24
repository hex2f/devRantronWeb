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
        if (element.name.indexOf('exe') !== -1) {
          document.getElementById('windows').href = element.browser_download_url;
        }
        if (element.name.indexOf('dmg') !== -1) {
          document.getElementById('macOS').href = element.browser_download_url;
        }
        if (element.name.indexOf('deb') !== -1) {
          document.getElementById('debian').href = element.browser_download_url;
        }
        if (element.name.indexOf('AppImage') !== -1) {
          document.getElementById('linux').href = element.browser_download_url;
        }
      }, this);
    }
  }
}

getDownloadLink();