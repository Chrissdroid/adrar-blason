const config = {
	numberOfPeople: 11
};

const overlay = document.querySelector('.overlay');
overlay.onclick = overlayClickHandler;

const textBox = document.querySelector('.text-box');
const circleList = document.querySelectorAll('.circle-container > li.item');
circleList.forEach(element => {
	element.onclick = circleClickHandler;
});

function circleClickHandler(e) {
	e.preventDefault();
	const number = parseInt(e.currentTarget.className.match(/elem-(\d+)/)[1]);

	if (e.currentTarget.classList.contains('active') || !number || number < 1 || number > config.numberOfPeople) return;
	[].forEach.call(circleList, el => {
		const position = parseInt(el.className.match(/elem-(\d+)/)[1]);
		if (position <= config.numberOfPeople && position < number) {
			el.classList.remove('elem-'+position, 'active');
			el.classList.add('elem-'+(position+1));
		}
		else el.classList.remove('active');
	});
	e.currentTarget.classList.remove('elem-'+number);
	e.currentTarget.classList.add('elem-1', 'active');

	const title = textBox.querySelector('.card-header > h2');
	const description = textBox.querySelector('.card-body > p');

	title.innerHTML = e.currentTarget.dataset.name;
	description.innerHTML = e.currentTarget.dataset.description;
	overlay.classList.add('active');
	textBox.classList.add('active');
}

function overlayClickHandler(e) {
	e.preventDefault();
	e.currentTarget.classList.remove('active');
	textBox.classList.remove('active');
	[].forEach.call(circleList, el => el.classList.remove('active'));
}
