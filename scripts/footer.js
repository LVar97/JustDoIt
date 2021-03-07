const listCase = document.querySelector('#list-container')
const listBtn = document.querySelector('#list-button')
const listPopup = document.querySelector('.popup-list')

const preparingCardsToListPopup = (el, string, template) => {
	
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

function renderCardsToListPopup() {

	sortByDateTime(taskCardsArray);
	
	taskCardsArray.forEach((el) => {
		listCase.append(preparingCardsToListPopup(el, 'month-tasks', cardTemplate));
	});
}

listBtn.addEventListener('click', (evt) => {

    listCase.innerHTML = '';

	evt.preventDefault();

	//createNewArrObject();

	renderCardsToListPopup();

    showPopup(listPopup)

});



listPopup.addEventListener('click', (evt) => {clickOverlay(evt, listPopup)});