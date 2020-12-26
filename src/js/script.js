const config = {
	numberOfPeople: 11
};

const overlay = document.querySelector('.overlay');
overlay.onclick = overlayClickHandler;

const textBox = document.querySelector('.card');
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
			el.classList.remove('elem-' + position, 'active');
			el.classList.add('elem-' + (position + 1));
		} else el.classList.remove('active');
	});
	e.currentTarget.classList.remove('elem-' + number);
	e.currentTarget.classList.add('elem-1', 'active');

	const title = textBox.querySelector('.card-header > h2 > span');
	const name = textBox.querySelector('.card-header > h2 > small');
	const description = textBox.querySelector('.card-body > p');

	if (title) title.innerHTML = e.currentTarget.dataset.title;
	if (name) name.innerHTML = e.currentTarget.dataset.name;
	if (description) description.innerHTML = e.currentTarget.dataset.description;
	overlay.classList.add('active');
	textBox.classList.add('active');
}

function overlayClickHandler(e) {
	e.preventDefault();
	if (e.target !== e.currentTarget) return;
	e.currentTarget.classList.remove('active');
	textBox.classList.remove('active');
	[].forEach.call(circleList, el => el.classList.remove('active'));
}

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
	constructor(el) {
		this.el = el;
		this.chars = '!<>-_\\/[]{}—=+*^?#________';
		this.update = this.update.bind(this);
	}
	setText(newText) {
		const oldText = this.el.innerText;
		const length = Math.max(oldText.length, newText.length);
		const promise = new Promise(resolve => this.resolve = resolve);
		this.queue = [];
		for (let i = 0; i < length; i++) {
			const from = oldText[i] || '';
			const to = newText[i] || '';
			const start = Math.floor(Math.random() * 40);
			const end = start + Math.floor(Math.random() * 40);
			this.queue.push({
				from,
				to,
				start,
				end
			});
		}
		cancelAnimationFrame(this.frameRequest);
		this.frame = 0;
		this.update();
		return promise;
	}
	update() {
		let output = '';
		let complete = 0;
		for (let i = 0, n = this.queue.length; i < n; i++) {
			let {
				from,
				to,
				start,
				end,
				char
			} = this.queue[i];
			if (this.frame >= end) {
				complete++;
				output += to;
			} else if (this.frame >= start) {
				if (!char || Math.random() < 0.28) {
					char = this.randomChar();
					this.queue[i].char = char;
				}
				output += `<span class="dud">${char}</span>`;
			} else {
				output += from;
			}
		}
		this.el.innerHTML = output;
		if (complete === this.queue.length) {
			this.resolve();
		} else {
			this.frameRequest = requestAnimationFrame(this.update);
			this.frame++;
		}
	}
	randomChar() {
		return this.chars[Math.floor(Math.random() * this.chars.length)];
	}
}

const phrases = [
	'Solidarité',
	'Curiosité',
	'Flexibilité',
	'Autonomie',
	'Organisation',
	'Se perdre',
	'Stress',
	'Contacts',
	'Veille technologique',
	'Épanouissement pro'
];


const el = document.querySelector('#animatedText');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
	fx.setText(phrases[counter]).then(() => {
		setTimeout(next, 2000);
	});
	counter = (counter + 1) % phrases.length;
};

setTimeout(next, 5000);

// geting canvas by Boujjou Achraf
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//chinese characters - taken from the unicode charset
var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
//converting the string into an array of single characters
matrix = matrix.split("");

var font_size = 12.5;
var lines = c.height / font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < lines; x++)
	drops[x] = 1;

//drawing the characters
function draw() {
	//Black BG for the canvas
	//translucent BG to show trail
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = "#17A8FE"; //green text
	ctx.font = font_size + "px arial";
	//looping over drops
	for (var i = 0; i < drops.length; i++) {
		//a random chinese character to print
		var text = matrix[Math.floor(Math.random() * matrix.length)];
		//x = i*font_size, y = value of drops[i]*font_size
		ctx.fillText(text, drops[i] * font_size, i * font_size);

		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if (drops[i] * font_size > c.height && Math.random() > 0.975)
			drops[i] = 0;

		//incrementing Y coordinate
		drops[i]++;
	}
}

setInterval(draw, 50);

console.log('Made with lightspeed by Alex²');