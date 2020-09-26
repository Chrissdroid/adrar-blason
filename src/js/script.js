(function() {
	const config = {
		numberOfPeople: 11
	};

	let circleList = document.querySelectorAll('.circle-container > li');

	circleList.forEach(element => {
		element.addEventListener('click', e => {
			let target = e.currentTarget;
			var number = parseInt(target.className.match(/elem-(\d+)/)[1]);

			if (target.classList.contains('active') || !number || number > config.numberOfPeople) return;
			[].forEach.call(circleList, el => {
				var position = parseInt(el.className.match(/elem-(\d+)/)[1]);
				if (position >= 1 && position <= config.numberOfPeople && position < number) {
					el.className = el.className.replace(/elem-(\d+)/, 'elem-'+(++position));
				}
				el.className = el.className.replace(/\bactive\b/, '').trim();
			});
			target.classList = target.className.replace(/elem-(\d+)/, 'elem-1 active').trim();
		});
	});
})();