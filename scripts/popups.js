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


// карточки с 1 экрана, т.е задания которые у нас уже как будто есть

const taskCardsArray = [];


// Проверка на наличие карточек

const deleteEmptySpan = () => {

	if (taskCardsArray.length != 0) {

		document.querySelector('.month-tasks__empty').classList.remove('month-tasks__empty_active');
		addButton.classList.remove('button-add_animated');

	}
}


// оскрытие попапов

function showPopup(popup){

  popup.classList.add('popup_opened');
}


// закрытие

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}


// закрытие по оверлею

function clickOverlay (evt, popup){
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  } 
}


// функция удаления

function removeCard(el){
	
	el.remove();
}


// Создаем новый объект в массив карточек

const createNewArrObject = () => {
		
	let newObj = {};
	newObj.task = document.querySelector('#input-1').value;
	newObj.note = document.querySelector('#input-2').value;
	newObj.day = new Date(document.querySelector('#input-3').value).getDay();
	newObj.month = new Date(document.querySelector('#input-3').value).getMonth();
	newObj.year = new Date(document.querySelector('#input-3').value).getFullYear();
	newObj.time = new Date(document.querySelector('#input-3').value).getTime();
	newObj.hour = new Date(document.querySelector('#input-3').value).getHours();
	newObj.minutes = new Date(document.querySelector('#input-3').value).getMinutes();
	newObj.alert = document.querySelector('#input-4').value;
	newObj.color = colorInput.value;
	taskCardsArray.push(newObj);
}


// Вставляем карточки на первый экран Месяц, предварительно удаляя старые

const showCardsToUser = (arr) => {

	cardCase.innerHTML = ''
	for(i = 0; i < arr.length; i++) {
		
		const taskCard = cardTemplate.cloneNode(true);
		taskCard.querySelector('.month-tasks__heading').textContent = arr[i].task;
		taskCard.querySelector('.month-tasks__data').textContent = `${arr[i].day} ${monthNames[arr[i].month]}`;
		taskCard.querySelector('.month-tasks__time').textContent = `${arr[i].hour}:${arr[i].minutes}`;
		cardCase.append(taskCard);
	}
}


// Вставляем карточки на 3 экран День, предварительно удаляя старые

const showCardsToUserDaily = (arr) => {

	cardCaseDaily.innerHTML = ''
	for(i = 0; i < arr.length; i++) {
		
		const taskDayCard = cardDailyTemplate.cloneNode(true);
		taskDayCard.querySelector('.daily-tasks__heading').textContent = arr[i].task;
		taskDayCard.querySelector('.daily-tasks__time').textContent = `${arr[i].hour}:${arr[i].minutes}`;
		cardCaseDaily.append(taskDayCard);
	}
}

// функция активной/неактивной кнопки - надо даделать

function disabledBtnSubmit() {
  btnSubmit.setAttribute('disabled', true);
  btnSubmit.classList.add('popup-new__add-btn_disabled');
}


// Подтверждаем в попапе создание Таска, добавляем карточку
// в массив, выводим карточки в консоль, закрываем попап.

popupNew.addEventListener('submit', function (evt) {

	evt.preventDefault();

	createNewArrObject();

	showCardsToUser(taskCardsArray);

	showCardsToUserDaily(taskCardsArray);

	deleteEmptySpan();

	closePopup(popupNew);
	
})


// Event Listeners

addButton.addEventListener('click', () => {showPopup(popupNew)});
popupDelete.addEventListener('click', (evt) => {clickOverlay(evt, popupDelete)});
popupNew.addEventListener('click', (evt) => {clickOverlay(evt, popupNew)});

console.log()





















/*
// делаем копии карточек
function cloneTemplate(el){
  return el.querySelector('.month-tasks__task-card').cloneNode(true);
}


// выводим на экран карточки

taskCardsArray.forEach(function (element) {

  cardCase.append(createCard( element.task, element.date, element.time, element.note));
  
});
// создаем карточки

function createCard (taskValue, dateValue, timeValue, noteValue) {
	
  const taskCard = cloneTemplate(cardTemplate);
	
	// записываем что должно выводиться в маленьких карточка - задание,дата,время
  taskCard.task = taskValue;
  taskCard.date = dateValue;
	taskCard.time = timeValue;
  taskCard.querySelector('.month-tasks__heading').textContent = taskValue;
	taskCard.querySelector('.month-tasks__data').textContent = dateValue;
	taskCard.querySelector('.month-tasks__time').textContent = timeValue;

  // передаем значения карточки на которую кликнули в ее попап
	taskCard.addEventListener('click', function() {
		popupDelete.querySelector('.popup-delete__title').textContent = taskValue;
		noteDeletePopup.textContent = noteValue;
		dateDeletePopup.textContent = dateValue;
		timeDeletePopup.textContent = timeValue;
		// удаление карточки
		popupDelete.querySelector('.button-delete').addEventListener('click', (evt) => {
			evt.preventDefault(); 
			closePopup(popupDelete);
			removeCard(taskCard);
		});
		showPopup(popupDelete);
	});

  return taskCard;
}

// функция удаления
function removeCard(el){
  el.remove();
}

// добавление новой карточки

const taskInput = document.querySelector('#input-1');
const noteInput = document.querySelector('#input-2');
const dateInput = document.querySelector('#input-3');
const timeInput = document.querySelector('#input-4');

popupNew.addEventListener('submit', function (evt) {
  evt.preventDefault(); 

  cardCase.prepend(createCard(taskInput.value,  noteInput.value, dateInput.value, timeInput));
  closePopup(popupNew);

  // disabledBtnSubmit();

	taskInput.value = ''; 
	noteInput.value = '';
	dateInput.value = '';
	// timeInput.value = '';

});
*/