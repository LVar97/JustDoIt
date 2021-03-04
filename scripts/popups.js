const popupDelete = document.querySelector('.popup-delete');
const popupNew = document.querySelector('.popup-new');
const addButton = document.querySelector('.button-add');
const titleDeletePopup = document.querySelector('.popup-delete__title');
const noteDeletePopup = document.querySelector('.popup-delete__note');
const dateDeletePopup = document.querySelector('.popup-delete__info_date');
const timeDeletePopup = document.querySelector('.popup-delete__info_time');
const cardCase = document.querySelector('.month-tasks__cards-case');
const cardTemplate = document.querySelector('#card').content; 

// карточки с 1 экрана, т.е задания которые у нас уже как будто есть
const initialCards = [
	{
		task: 'Сдать работу',
		note: '',
		date: '2021-03-08',
		time: '21:00',
		// color: 'red',
	},
	{
		task: 'Покормить кота соседа',
		note: 'корм стоит на 3 полке, справа от чайника',
		date: '2012-03-14',
		time: '13:00',
		// color: 'green',
	},
	{
		task: 'Выпить пива',
		note: 'А то че, работу сдали - можно и отдохнуть',
		date: '2021-03-08',
		time: '09:00',
		// color: 'green',
	},
]
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
// делаем копии карточек
function cloneTemplate(el){
  return el.querySelector('.month-tasks__task-card').cloneNode(true);
}
// выводим на экран карточки
initialCards.forEach(function (element) {

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

	initialCards.push({
		task: taskInput.value,
		note: noteInput.value,
		date: dateInput.value,
		time: timeInput,
		// color: 'red',
	},)

	// arraySorted = initialCards.sort((a, b) => (a.date > b.date) ? 1 : (a.date === b.date) ? ((a.time > b.time) ? 1 : -1) : -1 );
	// console.log(arraySorted)
  cardCase.prepend(createCard(taskInput.value,  noteInput.value, dateInput.value, timeInput));
	// reRender(arraySorted);
  closePopup(popupNew);

  // disabledBtnSubmit();

	taskInput.value = ''; 
	noteInput.value = '';
	dateInput.value = '';
	// timeInput.value = '';

});

// function reRender(array){
// 	cardCase.remove();
// 	console.log(cardCase);
// 	array.forEach(function (element) {

// 		cardCase.append(createCard( element.task, element.date, element.time, element.note));
		
// 	});
// 	console.log(cardCase);
// }


// функция активной/неактивной кнопки - надо даделать
const btnSubmit = popupNew.querySelector('.popup-new__add-btn');
function disabledBtnSubmit() {
  btnSubmit.setAttribute('disabled', true);
  btnSubmit.classList.add('popup-new__add-btn_disabled');
}
// 

addButton.addEventListener('click', () => {showPopup(popupNew)});
popupDelete.addEventListener('click', (evt) => {clickOverlay(evt, popupDelete)});
popupNew.addEventListener('click', (evt) => {clickOverlay(evt, popupNew)});