const calendar = document.querySelector('.calendar')
const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

const colorInput = document.querySelector('#color');
const pseudoColor = document.querySelector('.popup-new__color');

//Инпут выбора цвета

colorInput.onchange = function() {

  pseudoColor.style.backgroundColor = colorInput.value;
}


function createCalendar(elem, year, month) {

  let mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
  let d = new Date(year, mon);

  let table = '<span class="calendar__year-title"></span><span class="calendar__month-title"></span><table class="calendar__table"><tr class="calendar__week"><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

  // пробелы для первого ряда
  // с понедельника до первого дня месяца
  // * * * 1  2  3  4
  for (let i = 0; i < getDay(d); i++) {
    table += '<td class="calendar__day"></td>';
  }

  // <td> ячейки календаря с датами
  while (d.getMonth() == mon) {
    table += '<td class="calendar__day">' + d.getDate() + '</td>';

    if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
      table += '</tr><tr>';
    }

    d.setDate(d.getDate() + 1);
  }

  // добить таблицу пустыми ячейками, если нужно
  // 29 30 31 * * * *
  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      table += '<td class="calendar__day"></td>';
    }
  }

  // закрыть таблицу
  table += '</tr></table>';

  elem.innerHTML = table;

  monthTitle = elem.querySelector('.calendar__month-title');
  monthTitle.textContent = monthNames[month]
  yearTitle = elem.querySelector('.calendar__year-title');
  yearTitle.textContent = year
}

function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
  let day = date.getDay();
  if (day == 0) day = 7; // сделать воскресенье (0) последним днем
  return day - 1;
}



console.log(pseudoColor.style.backgroundColor)

createCalendar(calendar, 2012, 9);