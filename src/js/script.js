const config = {
	numberOfPeople: 11
};

const circleClickHandler = e => {
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
};

const circleList = document.querySelectorAll('.circle-container > li');
circleList.forEach(element => {
	element.onclick = circleClickHandler;
});
