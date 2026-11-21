const dialog = document.getElementById('signup');
const form = dialog.querySelector('form');

const closeBtn = dialog.querySelector('.close_signup_form');
const people = document.getElementById('people');

const company = document.getElementById('company');
const standard = dialog.querySelector('input[value="standard"]');

const alone = dialog.querySelector('input[value="ialone"]');
const itog = dialog.querySelector('.itog');



/* ---------- Цены (берутся со страницы «Стоимость») ---------- */
// person — за человека, table — за стол (своя компания)
const PRICES = {
	weekday: { // понедельник – четверг
		day:     { person: 1200, table: 6000 },
		evening: { person: 1600, table: 8000 },
	},
	weekend: { // пятница – воскресенье
		day:     { person: 1500, table: 7500 },
		evening: { person: 1900, table: 9500 },
	},
};
const FIRST_TIME_DISCOUNT = 0.15;
const rubles = new Intl.NumberFormat('ru-RU');

function calcPrice() {
	const type = form.elements.typerecord.value;   // standard | ialone | yourowncompany
	const format = form.elements.format.value;     // day | evening | '' (не выбрано)
	const dateValue = form.elements.date.value;    // 'YYYY-MM-DD' | ''
	if (!format || !dateValue) return null;

	// getDay(): 0 — воскресенье, 1 — понедельник ... 6 — суббота
	const weekday = new Date(dateValue + 'T00:00:00').getDay();
	const season = weekday >= 1 && weekday <= 4 ? 'weekday' : 'weekend';
	const price = PRICES[season][format];

	let total;
	if (type === 'yourowncompany') {
		total = price.table;
	} else {
		const count = type === 'ialone' ? 1 : Number(form.elements.people.value);
		if (!count || count < 1) return null;
		total = price.person * count;
	}

	if (form.elements.first_time.checked) {
		total = Math.round(total * (1 - FIRST_TIME_DISCOUNT));
	}
	return total;
}

function updatePrice() {
	const total = calcPrice();
	itog.textContent = total === null
		? 'Выберите дату и формат'
		: rubles.format(total) + ' ₽';
}

/* ---------- Открытие / закрытие ---------- */
document.querySelectorAll('[data-open-signup]').forEach((btn) => {
	btn.addEventListener('click', () => dialog.showModal());
});

closeBtn.addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (e) => {
	if (e.target === dialog) dialog.close();
});

function syncCompany() {
	const enough = Number(people.value) >= 5;
	company.disabled = !enough;
	if (!enough && company.checked) standard.checked = true;
	updatePrice();
}

people.addEventListener('input', syncCompany);

alone.addEventListener('change', () => {
	if (alone.checked) {
		people.value = 1;
		syncCompany();
	}
});

form.addEventListener('input', updatePrice);
form.addEventListener('change', updatePrice);

syncCompany();
(() => {
	const dialog = document.getElementById('Askaquestion_Window');
	if (!dialog) return;

	const form = dialog.querySelector('form');
	const closeBtn = dialog.querySelector('.close_signup_form');
	const submitBtn = form.querySelector('button[type="submit"]');
	const openBtns = document.querySelectorAll('.Askaquestion'); // кнопка «Задать вопрос» в FAQ

	/* ---------- Открытие / закрытие ---------- */
	openBtns.forEach((btn) => {
		btn.addEventListener('click', () => dialog.showModal());
	});

	closeBtn.addEventListener('click', () => dialog.close());

	dialog.addEventListener('click', (e) => {
		if (e.target !== dialog) return;
		const r = dialog.getBoundingClientRect();
		const inside =
			e.clientX >= r.left && e.clientX <= r.right &&
			e.clientY >= r.top && e.clientY <= r.bottom;
		if (!inside) dialog.close();
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault(); // не перезагружать страницу

		const data = Object.fromEntries(new FormData(form));
		data.comment = data.comment.trim();

		const oldText = submitBtn.textContent;
		submitBtn.textContent = 'Отправлено ✓';
		submitBtn.disabled = true;

		setTimeout(() => {
			dialog.close();
			form.reset();
			submitBtn.textContent = oldText;
			submitBtn.disabled = false;
		}, 1200);
	});
})();