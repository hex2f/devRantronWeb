var database = firebase.database();

function isInToday(inputDate)
{

  var input = new Date(parseInt(inputDate));
  var today = new Date;

  var inputDate = input.getDate() + '' + input.getMonth();
  var todayDate = today.getDate() + '' + today.getMonth();

  if (inputDate === todayDate) {
    return true;
  }
  return false;
}

function isInThisMonth(inputDate) {
  var input = new Date(parseInt(inputDate));
  var today = new Date;

  if (
    input.getMonth() === today.getMonth()
    && input.getFullYear() === today.getFullYear()
  ) {
    return true;
  }
  return false;
}

function kFormatter(num) {
  return num > 999 ? (num/1000).toFixed(1) + 'k' : num
}

function updateStats(stats) {
  let day = 0;
  let month = 0;
  // This was our total before we moved to new logging system
  let total = 0;
  let windows = 0;
  let macOS = 0;
  let linux = 0;

  Object.keys(stats).forEach((key) => {
    if (isInToday(key)) {
      day += 1;
    }
    if (isInThisMonth(key)) {
      month += 1;
    }
    if (stats[key] === "windows") {
      windows += 1;
    } else if (stats[key] === "macos") {
      macOS += 1;
    } else {
      linux += 1;
    }
    total += 1;
  })

  windows = (windows / total) * 100;
  macOS = (macOS / total) * 100;
  linux = (linux / total) * 100;

  // The magic number is the stat we had before new logging system
  document.getElementById('total').innerHTML = kFormatter(total + 18354);
  document.getElementById('month').innerHTML = kFormatter(month);
  document.getElementById('day').innerHTML = day;

  document.getElementById('windows_stat').innerHTML = Math.floor(windows) + '%';
  document.getElementById('macOS_stat').innerHTML = Math.floor(macOS) + '%';
  document.getElementById('linux_stat').innerHTML = Math.floor(linux) + '%';
}

var statsRef = firebase.database().ref('stats/usage');
statsRef.on('value', function(snapshot) {
  updateStats(snapshot.val());
});