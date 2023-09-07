function updateTime() {
  var dateInfo = new Date();
  var hr,
    _min = dateInfo.getMinutes() < 10 ? "0" + dateInfo.getMinutes() : dateInfo.getMinutes(),
    sec = dateInfo.getSeconds() < 10 ? "0" + dateInfo.getSeconds() : dateInfo.getSeconds(),
    ampm = dateInfo.getHours() >= 12 ? "م" : "ص";

  if (dateInfo.getHours() == 0) {
    hr = 12;
  } else if (dateInfo.getHours() > 12) {
    hr = dateInfo.getHours() - 12;
  } else {
    hr = dateInfo.getHours();
  }

  // Format numbers to Arabic numerals
  hr = hr.toLocaleString("ar-EG");
  _min = _min.toLocaleString("ar-EG");
  sec = sec.toLocaleString("ar-EG");

  var currentTime = hr + ":" + _min + ":" + sec;
  document.getElementsByClassName("hms")[0].innerHTML = currentTime;
  document.getElementsByClassName("ampm")[0].innerHTML = ampm;

  // Get the current date
  const currentDate = new Date();

  // Create a formatter for the desired format
  const formatter = new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
    day: "numeric",
    month: "long",
    numberingSystem: "arab" // Specify Arabic numbering system
  });

  // Get the formatted date
  const formattedDate = formatter.format(currentDate);

  // Extract day and month components
  const [day, month] = formattedDate.split(" ");

  // Display day and month in separate div elements
  document.getElementById("day").textContent = day;
  document.getElementById("month").textContent = month;
}

// Call updateTime to initially set the time and date
updateTime();

// Set up an interval to update time and date every second
setInterval(function() {
  updateTime();
}, 1000);
/* content*/
function show() {
  console.log('worl');
}
/* Gallery Slides */
const slides = document.querySelectorAll('.slide');
let active = document.querySelector('.slide.active');

slides.forEach((slide) => {
  slide.onclick = () => {
    active.classList.remove('active');
    active = slide;
    slide.classList.add('active');
  }
})
/* Open Gallery*/
const home = document.getElementById('home');
const homeBtn = document.getElementById('home-button');
const galleryBtn = document.getElementById('gallery-button');
const gallery = document.getElementById('gallery');
gallery.style.display = 'none';
// add photo
homeBtn.addEventListener('click', () => {
  gallery.style.display = 'none';
  home.style.display = 'block';
  seriesA.style.display = 'none';
})
galleryBtn.addEventListener('click', () => {
  seriesA.style.display = 'none';
  home.style.display = 'none';
  gallery.style.display = 'flex';

})

// Dark mode
var html = document.getElementsByTagName('html');
var radios = document.getElementsByName('themes');

/*for (i = 0; i < radios.length; i++) {
  radios[i].addEventListener('change', function() {
    html[0].classList.remove(html[0].classList.item(0));
    html[0].classList.add(this.id);
    
  });
 
}*/
for (let i = 0; i < radios.length; i++) {
  radios[i].addEventListener('change', function() {
    html[0].classList.remove(html[0].classList.item(0));
    html[0].classList.add(this.id);
    setDarkModePreference(this.id); // Pass the selected mode to the function
  });
}

function setDarkModePreference(mode) {
  localStorage.setItem('darkMode', mode); // Store the selected mode in local storage
}

// When the page loads, check if a dark mode preference exists in local storage
const savedMode = localStorage.getItem('darkMode');
if (savedMode) {
  html[0].classList.remove(html[0].classList.item(0));
  html[0].classList.add(savedMode);
}

// D mode end
const setting = document.getElementById('setting');
const menu = document.getElementById('menu');
const exitSvg = document.getElementById('exit-button');

/*
setting.addEventListener('click', (event) => {
  event.stopPropagation(); // Prevent the click event from reaching the body
  menu.style.width = '60%';
});
exitSvg.addEventListener('click',  ()=>{
  menu.style.width='0'
});
document.body.addEventListener('click', (event) => {
  if (menu.style.width === '60%' && !menu.contains(event.target)) {
    menu.style.width = '0%';
  }
});*/
setting.addEventListener('click', (event) => {
  if (!event.target.clicked) {
    document.body.removeEventListener('click', bodyClickHandler);
    event.target.clicked = true;
  } else {
    document.body.addEventListener('click', bodyClickHandler);
  }//error 
  event.stopPropagation();
  exitSvg.addEventListener('click', () => {
    menu.style.width = '0';
  });
  menu.style.width = '60%';

});



function bodyClickHandler(event) {
  if (menu.style.width === '60%' && !menu.contains(event.target)) {
    menu.style.width = '0';
  }
}
/* Set to local storage*/
/* Series A */
homeBtn.addEventListener('dblclick', ()=>{
  seriesA.style.display = 'none';
})
const seriesA = document.getElementById('series-a');
function openSeriesA(){
  seriesA.style.display = 'block';
  home.style.display = 'none';
  document.body.style.overflow = 'scroll';
}
introduction.addEventListener('click',()=>{
  // Book series A
const bookWrap = document.getElementById('book-wrap');
  seriesA.style.display = 'none';
  bookWrap.style.display = 'block';
});
