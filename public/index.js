var OSName="Unknown";

if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

switch (OSName) {
  case "Windows":
    document.getElementById('downloadButtons').innerHTML = `
      <a href="https://github.com/tahnik/devRantron/releases/download/v1.0.0/devrantron-setup-1.0.0.exe"><button class="downloadBtn active"><i class="ion-social-windows"></i><span>Windows</span></button></a>
      <a href="https://github.com/tahnik/devRantron/releases/download/v1.0.0/devrantron-1.0.0.dmg"><button class="downloadBtn"><i class="ion-social-apple"></i><span>macOS</span></button></a>
      <a href="https://github.com/tahnik/devRantron/releases/download/v1.0.0/devrantron_1.0.0_amd64.deb"><button class="downloadBtn"><i class="ion-social-tux"></i><span>Linux</span></button></a>
    `;
    break;
  case "MacOS":
    document.getElementById('downloadButtons').innerHTML = `
      <a href="https://github.com/tahnik/devRantron/releases/download/v1.0.0/devrantron-1.0.0.dmg"><button class="downloadBtn active"><i class="ion-social-apple"></i><span>macOS</span></button></a>
      <a href="https://github.com/tahnik/devRantron/releases/download/v1.0.0/devrantron-setup-1.0.0.exe"><button class="downloadBtn"><i class="ion-social-windows"></i><span>Windows</span></button></a>
      <a href="https://github.com/tahnik/devRantron/releases/download/v1.0.0/devrantron_1.0.0_amd64.deb"><button class="downloadBtn"><i class="ion-social-tux"></i><span>Linux</span></button></a>
    `;
    break;
  case "Linux":
    document.getElementById('downloadButtons').innerHTML = `
      <a href="https://github.com/tahnik/devRantron/releases/download/v1.0.0/devrantron_1.0.0_amd64.deb"><button class="downloadBtn active"><i class="ion-social-tux"></i><span>Linux</span></button></a>
      <a href="https://github.com/tahnik/devRantron/releases/download/v1.0.0/devrantron-setup-1.0.0.exe"><button class="downloadBtn"><i class="ion-social-windows"></i><span>Windows</span></button></a>
      <a href="https://github.com/tahnik/devRantron/releases/download/v1.0.0/devrantron-1.0.0.dmg"><button class="downloadBtn"><i class="ion-social-apple"></i><span>macOS</span></button></a>
    `;
    break;

  default:
    break;
}

function setStatNumbers () {
  var res = JSON.parse(this.responseText);
  document.getElementById('statsTotal').innerHTML = res.total;
  document.getElementById('statsMonth').innerHTML = res.month;
  document.getElementById('statsToday').innerHTML = res.today;

  document.getElementById('statsLinux').innerHTML = Math.round((res.onLinux / res.total) * 1000) / 10 + "%";
  document.getElementById('statsWindows').innerHTML = Math.round((res.onWindows / res.total) * 1000) / 10 + "%";
  document.getElementById('statsMacOS').innerHTML = Math.round((res.onMac / res.total) * 1000) / 10 + "%";
}

var req = new XMLHttpRequest();
req.addEventListener("load", setStatNumbers);
req.open("GET", "https://devrantron.firebaseio.com/stats.json");
req.send();