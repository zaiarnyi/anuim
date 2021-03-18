const screeniOs = navigator.userAgent.match(/iPhone|iPad|iPod/i);
const finance = document.querySelector('.finance');
const animCircly = document.querySelectorAll('.finance__bird'); //подложка под галочку в кругляжках
const headMan = document.querySelectorAll('.head-circly'); //головы, направленные в разные стороны
const shadowBlazer = document.querySelectorAll('.blazer-shadow'); //воротники пиджака


const count = +finance.dataset.start; // номер стартового направления головы 1,2,3,4,5,6,7,8
const value = +finance.dataset.restart; //если требуется каждый раз возвращать голову в исходной положение 1 - Да/0 - нет

//===========================================
// В зависимости какой стартовый порядковый номер будет у переменой count
// то автоматом поменяется положение воротника
//===========================================
if (count >= 1 && count <= 4) {
	shadowBlazer[0].classList.add('visible-shadow');
	shadowBlazer[1].classList.remove('visible-shadow');
} else if (count >= 5 && count <= 8) {
	shadowBlazer[1].classList.add('visible-shadow');
	shadowBlazer[0].classList.remove('visible-shadow');
}
headMan.forEach((item, index) => {
	if (count - 1 != index) {
		item.classList.remove('visible');
	} else {
		item.classList.add('visible');
	}
});

if (screeniOs !== null) {
	document.querySelector('.right-hand').classList.add('ios'); //добавляем класс левой руке персонажа на устройства Apple с разрешением до 768px
}
animCircly.forEach((item, index) => {
	item.addEventListener('mouseenter', () => {
		item.classList.add('active'); //Добавляем активный класс, когда мышкой навели на круг с галочкой
		headMan.forEach((elem, num) => {
			elem.classList.remove('visible');
			if (index == num) {
				elem.classList.add('visible');
			}
			if (index >= 4 && index <= 7) {
				shadowBlazer[1].classList.add('visible-shadow');
				shadowBlazer[0].classList.remove('visible-shadow');
			} else if (index >= 0 && index <= 3) {
				shadowBlazer[0].classList.add('visible-shadow');
				shadowBlazer[1].classList.remove('visible-shadow');
			}
		});
	});
	item.addEventListener('mouseleave', () => {
		item.classList.remove('active'); //Удаляем активный класс если стрелка мышки покинула галочку
		if (value) {
			headMan.forEach((elem, num) => {
				elem.classList.remove('visible');
			});
			headMan[count - 1].classList.add('visible');
			shadowBlazer[1].classList.add('visible-shadow');
			shadowBlazer[0].classList.remove('visible-shadow');
		}
	});
});

//Popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue =
		window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
