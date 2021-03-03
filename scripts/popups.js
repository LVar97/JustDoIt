const popupDelete = document.querySelector('.popup-delete');
const popupNew = document.querySelector('.popup-new');
const addButton = document.querySelector('.button-add');
const cardCase = document.querySelector('.month-tasks__cards-case');


const initialCards = [
	{
		task: 'Покормить кота',
		description: '',
		date: '14.03.2021',
		color: 'green',
	},
	{
		task: 'Сдать работу',
		description: '',
		date: '7.03.2021',
		color: 'red',
	},
]

function showPopup(popup){
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function clickOverlay (evt, popup){
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  } 
}


cardCase.addEventListener('click', () => {showPopup(popupDelete)});
addButton.addEventListener('click', () => {showPopup(popupNew)});
popupDelete.addEventListener('click', (evt) => {clickOverlay(evt, popupDelete)});
popupNew.addEventListener('click', (evt) => {clickOverlay(evt, popupNew)});