const popupDelete = document.querySelector('.popup-delete');
const popupNew = document.querySelector('.popup-new');
const addButton = document.querySelector('.button-add');
const titleDeletePopup = document.querySelector('.popup-delete__title');
const noteDeletePopup = document.querySelector('.popup-delete__note');
const dateDeletePopup = document.querySelector('.popup-delete__info_date');
const timeDeletePopup = document.querySelector('.popup-delete__info_time');
const cardCase = document.querySelector('.month-tasks__cards-case');
const cardCaseDaily = document.querySelector('.daily-tasks__cards-case');
const cardTemplate = document.querySelector('#card').content;
const cardDailyTemplate = document.querySelector('#card-daily').content;
const btnSubmit = popupNew.querySelector('.popup-new__add-btn');

const taskInput = document.querySelector('#input-1');
const noteInput = document.querySelector('#input-2');
const dateInput = document.querySelector('#input-3');
const timeInput = document.querySelector('#input-4');


// карточки с 1 экрана, т.е задания которые у нас уже как будто есть

const taskCardsArray = [
	// {
	// task: 'Покормить кота соседа',
	// note: 'корм стоит на 3 полке, справа от чайника',
	// date: '14.03.2012',
	// time: '13:00',
	// // color: 'green',
	// },
];


// Проверка на наличие карточек

const deleteEmptySpan = () => {

	if (taskCardsArray.length != 0) {

		document.querySelector('.month-tasks__empty').classList.remove('month-tasks__empty_active');
		addButton.classList.remove('button-add_animated');

	}
}


// Открытие попапов

function showPopup(popup){

  popup.classList.add('popup_opened');
}


// Закрытие

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}


// Закрытие по оверлею 
function clickOverlay (evt, popup){
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
		// и очищение полей ввода в popupNew
		clearInputs(taskInput,  noteInput, dateInput, timeInput);
  } 
}


// функция активной/неактивной кнопки - надо даделать
function disabledBtnSubmit() {
	btnSubmit.setAttribute('disabled', true);
	btnSubmit.classList.add('popup-new__add-btn_disabled');
  }
  
  
  // функция очищения полей в popupNew
  function clearInputs(taskEl,  noteEl, dateEl) {
	  taskEl.value = ''; 
	  noteEl.value = '';
	  dateEl.value = '';
  }

// функция удаления. сравнивает значения task и удаляет карточку 
//из массива из которого рендериться, чтобы карточки не задваивались. 
//Карточки удаляются сразу отовсюду

function removeCard(el, string) {

	for (i=0; i < taskCardsArray.length; i++) {
		
		if (taskCardsArray[i].task === el.querySelector(`.${string}__heading`).textContent){
			
			taskCardsArray.splice(i, 1);
		}
	}

	renderCardsToFirstScreen();
	renderCardsToSecondScreen();
}


// Создаем новый объект в массив карточек

const createNewArrObject = () => {
		
	let newObj = {};
	newObj.task = document.querySelector('#input-1').value;
	newObj.note = document.querySelector('#input-2').value;
	newObj.date = new Date(document.querySelector('#input-3').value).getDate();
	newObj.month = new Date(document.querySelector('#input-3').value).getMonth();
	newObj.year = new Date(document.querySelector('#input-3').value).getFullYear();
	newObj.time = new Date(document.querySelector('#input-3').value).getTime();
	newObj.hour = new Date(document.querySelector('#input-3').value).getHours();
	newObj.minutes = new Date(document.querySelector('#input-3').value).getMinutes();
	newObj.color = colorInput.value;

	taskCardsArray.push(newObj);
}

// функция сортирует карточки по дням и времени

function sortByDateTime(arr) {
	
	arr.sort((a, b) => (a.date > b.date) ? 1 : (a.date === b.date) ? ((a.time > b.time) ? 1 : -1) : -1 );
	return arr
}

// функция сортирует и создает массив с карточками у которых один и тот же день. Это нужно для второго экрана
function sortByDate(date, arr){
	let sortedArr = [];
	for (i=0; i < arr.length; i++) {
		if (arr[i].date.toString() === date){
			sortedArr.push(arr[i]);		
		}
	}
	return sortedArr
}

// фукция копии карточки - не удалять

function cloneTemplate(el, string){
  return el.querySelector(`.${string}__task-card`).cloneNode(true);
}

// Эта функция принимает в себя элемент массива и для каждого элемента отрисовывает карточку.
// Функция универсальна - отрисовывает карточки сразу на два экрана

const preparingCardsToFirstScreen = (el, string, template) => {
	
	const taskCard = cloneTemplate(template, string);
	
	taskCard.querySelector(`.${string}__heading`).textContent = el.task;
	taskCard.querySelector(`.${string}__time`).textContent = `${el.hour}:${el.minutes}`;
	taskCard.querySelector(`.${string}__data`).textContent = `${el.date} ${monthNames[el.month]}`;

	taskCard.addEventListener('click', function(evt) {
		// условие для чекеда карточки
		if (evt.target.classList.contains(`${string}__done-icon`)) {

			evt.target.classList.toggle(`${string}__done-icon_active`);
		} else {

			titleDeletePopup.textContent = el.task;
			noteDeletePopup.textContent = el.note;
			dateDeletePopup.textContent = `${el.date} ${monthNames[el.month]}`;
			timeDeletePopup.textContent = `${el.hour}:${el.minutes}`;

			// удаление карточки
			popupDelete.querySelector('.button-delete').addEventListener('click', (evt) => {
				evt.preventDefault(); 
				closePopup(popupDelete);
				removeCard(taskCard, string);
			});

		showPopup(popupDelete);

			// чекед попапа
			const spanCheked = popupDelete.querySelector('.popup-delete__span');

			popupDelete.querySelector('.popup__done-icon').addEventListener('click', (evt) => {

				evt.target.classList.toggle(`${string}__done-icon_active`);

				if (evt.target.classList.contains(`${string}__done-icon_active`)) {
					popupDelete.querySelector('.popup-delete__span').textContent = 'выполнено';
					titleDeletePopup.classList.add('popup-delete__title_done');
				} else{
					spanCheked.textContent = 'не выполнено';
					titleDeletePopup.classList.remove('popup-delete__title_done');
				}
			});
		}
	});

	return taskCard;
}

//Создаем массив карточек в подсвеченный день

const preparingCardsToSecondScreen = () => {
	
	let ligthenDay = document.querySelector('.calendar__day_active');

	let newArr = []

	for (i=0; i < taskCardsArray.length; i++) {
		if (taskCardsArray[i].date.toString() === ligthenDay.textContent){
			newArr.push(taskCardsArray[i]);		
		} else {
			
			console.log('hi again')
		}
	}
	
	return newArr
}


// Функция сравнивает значение отмеченного дня в календаре с днем в карточке и отрисовывает на втором экране только карточки выбранного дня - они сразу отсортированы по времени

function renderCardsToFirstScreen() {

	const toDay = document.querySelector('.calendar__day_active');
	
	cardCase.innerHTML = '';
	cardCaseDaily.innerHTML = '';

	sortByDateTime(taskCardsArray);
	
	dailyTasks = sortByDate(toDay.textContent, taskCardsArray);

	taskCardsArray.forEach((el) => {
		cardCase.append(preparingCardsToFirstScreen(el, 'month-tasks', cardTemplate));
	});

	createCalendar(calendar, (new Date()).getFullYear(), (new Date()).getMonth());

}

//Рендерим карточки на второй экран

function renderCardsToSecondScreen() {

	let newArr = preparingCardsToSecondScreen();

	cardCaseDaily.innerHTML = '';

	newArr.forEach((el) => {

		const taskCard = cardDailyTemplate.querySelector('.daily-tasks__task-card').cloneNode(true);
	
		taskCard.querySelector('.daily-tasks__heading').textContent = el.task;
		taskCard.querySelector('.daily-tasks__time').textContent = `${el.hour}:${el.minutes}`;

		taskCard.addEventListener('click', function(evt) {

			// условие для чекеда карточки
			if (evt.target.classList.contains('daily-tasks__done-icon')) {

				evt.target.classList.toggle('daily-tasks__done-icon_active');
			} else {

					titleDeletePopup.textContent = el.task;
					noteDeletePopup.textContent = el.note;
					dateDeletePopup.textContent = `${el.date} ${monthNames[el.month]}`;
					timeDeletePopup.textContent = `${el.hour}:${el.minutes}`;

					// удаление карточки
					popupDelete.querySelector('.button-delete').addEventListener('click', (evt) => {
						evt.preventDefault(); 
						closePopup(popupDelete);
						removeCard(taskCard, string);
					});

					showPopup(popupDelete);

					// чекед попапа
					const spanCheked = popupDelete.querySelector('.popup-delete__span');

					popupDelete.querySelector('.popup__done-icon').addEventListener('click', (evt) => {

						evt.target.classList.toggle('daily-tasks__done-icon_active');

						if (evt.target.classList.contains('daily-tasks__done-icon_active')) {
							popupDelete.querySelector('.popup-delete__span').textContent = 'выполнено';
							titleDeletePopup.classList.add('popup-delete__title_done');
						} else{
							spanCheked.textContent = 'не выполнено';
							titleDeletePopup.classList.remove('popup-delete__title_done');
						}
				});
			}	
		});

		cardCaseDaily.append(taskCard);
	});
};

// функция должна сортировать карточки по месяцу и выводить на главный экран только карточки этого месяца, но у меня не получилось ее доделать. либо попробуй доделать либо удали ее вообще
// function sortByMounth(month, arr){
// 	let sortedArr = [];
// 	for (i=0; i < arr.length; i++) {
// 		if ((new Date(2021,arr[i].month)).toLocaleString('ru', { month: 'long' }) === month.toLowerCase()){
// 			sortedArr.push(arr[i]);		
// 		}
// 	}
// 	return sortedArr
// }


// Подтверждаем в попапе создание Таска, добавляем карточку
// в массив, выводим карточки в консоль, закрываем попап.
popupNew.addEventListener('submit', function (evt) {

	evt.preventDefault();

	createNewArrObject();

	renderCardsToFirstScreen();

	deleteEmptySpan();

	closePopup(popupNew);
	
	clearInputs(taskInput,  noteInput, dateInput);

	renderCardsToSecondScreen();
	
})


// Event Listeners

addButton.addEventListener('click', () => {showPopup(popupNew)});
popupDelete.addEventListener('click', (evt) => {clickOverlay(evt, popupDelete)});
popupNew.addEventListener('click', (evt) => {clickOverlay(evt, popupNew)});


/*
//Функция создания нового массива по выбранной дате

function newArrByDate () {

	const toDay = document.querySelector('.calendar__day_active');
	console.log(toDay)
}
newArrByDate()
*/
// ВНИМАНИЕ! ЭТА ФУНКЦИЯ НЕ НУЖНА - ТАК КАК ДУБЛИРУЕТ ФУНКЦИОНАЛ ДРУГОЙ

// Вставляем карточки на 3 экран День, предварительно удаляя старые
// const renderCardsToFirstScreenDaily = (arr) => {
// 	const taskDayCard = cloneDailyCardTemplate(cardDailyTemplate);
// 	for(i = 0; i < arr.length; i++) {
// 		taskDayCard.querySelector('.daily-tasks__heading').textContent = arr[i].task;
// 		taskDayCard.querySelector('.daily-tasks__time').textContent = `${arr[i].hour}:${arr[i].minutes}`;
// 		cardCaseDaily.append(taskDayCard);
// 	}

// 	taskDayCard.addEventListener('click', function() {
		
// 		for(i = 0; i < arr.length; i++) {
// 			titleDeletePopup.textContent = arr[i].task;
// 			noteDeletePopup.textContent = arr[i].note;
// 			dateDeletePopup.textContent = `${arr[i].date} ${monthNames[arr[i].month]}`;
// 			timeDeletePopup.textContent = `${arr[i].hour}:${arr[i].minutes}`;
// 		}
// 		// удаление карточки
// 		popupDelete.querySelector('.button-delete').addEventListener('click', (evt) => {
// 			evt.preventDefault(); 
// 			closePopup(popupDelete);
// 			removeCard(taskDayCard);
// 		});
// 		showPopup(popupDelete);
// 	});
// }