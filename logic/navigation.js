/*const list = document.querySelectorAll('.list');
const nav = document.querySelector('.navigation');
list.forEach(item => item.addEventListener('click', function(e){
	list.forEach(li => li.classList.remove('active'));
	e.currentTarget.classList.add('active');
}));
*/
const navItems = document.querySelectorAll('.list');

// Function to handle navigation item clicks
function handleNavigationClick(target) {
  navItems.forEach(item => item.classList.remove('active'));
  target.classList.add('active');
}

navItems.forEach(item => item.addEventListener('click', function(e) {
  handleNavigationClick(e.currentTarget);
}));
/* Drop-down*/
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.dropdown-menu');
  const options = dropdown.querySelectorAll('.dropdown-menu li');
  const selected = dropdown.querySelector('.selected');


  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;
      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-open');

      options.forEach(option => {
        option.classList.remove('drop-active');
      });
      option.classList.add('drop-active');
    });
  });
});
/* Dd end */
/* Search */
const input = document.querySelector('#filterByKeyword');
const resultStatus = document.querySelector('#resultStatus');
const ul = document.querySelector('.issue-list');

function searchFilter() {
  let filter = input.value.toLowerCase();
  let liArray = Array.from(ul.querySelectorAll('.issue'));
  let noLi = liArray.length;

  liArray.forEach(function (issue) {
    let query = issue.dataset.originalContent || issue.textContent; // Use the original content

    let lowerQuery = query.toLowerCase();
    let index = lowerQuery.indexOf(filter);

    if (index > -1) {
      let highlightedQuery = query.substring(0, index) +
        '<span class="highlight">' + query.substring(index, index + filter.length) + '</span>' +
        query.substring(index + filter.length);
      issue.innerHTML = highlightedQuery;
      issue.style.display = '';
    } else {
      issue.style.display = 'none';
      noLi--;
    }

    resultStatus.textContent = noLi + ' results found for "' + filter + '"';

    if (filter === '') {
      //location.reload();
      resultStatus.textContent = '';
      issue.dataset.originalContent = query; // Restore original content if input is empty
    }
  });
}

input.addEventListener('input', function () {
  searchFilter();
});

/* Autocomplete*/
let choices = [
"عرض ناشر",
"تعارف",
"مقدمه",
"کشمیر میں اسلام کی اشاعت",
"جناب امیر کبیر سید علی ہمدائی",
"شیعہ مسلک",
"کشمیر میں شیعہ مسلک کی اشاعت",
"سید محمد مدنی علیہ الرحمہ",
"سید حسین نبی علیہ الرحمہ",
"میر شمس الدین اراکی",
"میر کی واپسی",
"میرے کا ورود کشمیر میں دوسری دفعہ",
"تعمیر خانقاہ جڑ یبل",
"علاقہ لداخ میں تبلیغ اسلام",
"وادی کشمیر میں میر کی تبلیغی سرگرمیاں",
"میر کی وفات",
"میر شمس الدین کا مسلک",
"ملک موسی رین",
"چک خاندان",
"سلطان زین العابدین کے جانشین",
"کا جی چک کے خلاف سازشیں اور بغاوتیں",
"بابر کا حملہ",
"کا جی چک کی دوسری وزارت",
"بابر کا دوسرا حملہ",
"ملک ابدال کی وزارت",
"مرزا کامران کا حملہ",
"مرزا حیدر کا شغری کا حملہ",
"قحط",
"کا جی چک کی تیسری وزارت",
"کشمیر پر مرزا حیدر کا شغری ( دوغلت) کا تسلط",
"کا جی چک کا پہلا حملہ",
"کا جی چک کا دوسرا حملہ",
"کا جی چک کی وفات",
"کا جی چک کا دشمنوں سے سلوک",
"کا جی چک کی دانشمندی",
"تعمیر امام باڑہ",
"کشمیر پر مرزا حیدر کا شغری کا تسلط",
"مرزا حیدر کا شغری کے مظالم",
"مرزا کاشغری کا انجام",
"دولت چک",
"دولت چک کی تباہی",
"دولت چک کی شجاعت",
"مذہبی آزادی",
"غازی چک",
"غازی شاہ کے فتوحات",
"ابوالمعالی کا حملہ مغل افواج سے جنگ",
"قرا بہادر کا حملہ",
"بادشاہ کا بڑا کارنامہ",
"غازی شاہ کے اوصاف",
"غازی شاہ کا عدل و انصاف",
"حسین شاہ",
"یوسف میر کا قتل",
"یوسف میر کا قصاص",
"بادشاہت سے دستبرداری",
"بادشاہ کے اوصاف",
"مذہبی آزادی اور رواداری",
"ایام ہفتہ کی تقسیم",
"علی شاہ",
"حیدر خان اور سلیم خان کا حملہ",
"کشتوار کی لڑائی",
"قحط",
"بادشاہ کا انتقال",
"بادشاہ کی رعایا پروری",
"یوسف شاہ پہلی بار۹۸۷ھ/۱۵۷۹ء",
"ابدال بٹ کی سازش"
];
let $ = document;
let list_group = $.querySelector(".list-group");

function ListItemGenerator() {
  if (!input.value) {
    input.parentElement.classList.remove("active");
    list_group.style.display = "none";
  } else {
    input.parentElement.classList.add("active");
    list_group.style.display = "block";

    let SearchResults = choices.filter(function (choice) {
      return choice.toLowerCase().startsWith(input.value.toLowerCase());
    });

    CreatingList(SearchResults);

    function CreatingList(Words) {
      let createdList = Words.map(function (word) {
        return "<li>" + word + "</li>";
      });
      let CustomListItem;
      if (!CreatingList.length) {
        CustomListItem = "<li>" + input.value + "</li>";
      } else {
        CustomListItem = createdList.join("");
      }
      list_group.innerHTML = CustomListItem;
      CompleteText();
    }
  }

  function CompleteText() {
    all_list_items = list_group.querySelectorAll("li");
    all_list_items.forEach(function (list) {
      list.addEventListener("click", function (e) {
        input.value = e.target.textContent;
        list_group.style.display = "none";
      });
    });
  }
}
input.addEventListener("keyup", ListItemGenerator
);