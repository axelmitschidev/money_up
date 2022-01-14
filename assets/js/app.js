function rand(min, max) {
	return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) +1)) + Math.ceil(min);
}

function displayHisto(arr) {
	document.querySelector('.histo-container').innerHTML = '';
	let arrBuff = [];
	arr.forEach(o => {
		arrBuff.push(o.action);
	});
	let max = Math.max(...arrBuff);
	for (let i = 0; i < arr.length; i++) {
		let bar = document.createElement('div');
		bar.style.width = 1 + 'px';
		bar.style.height = ((arr[i].action / max) * 100) + '%';
		bar.style.backgroundColor = 'white';
		bar.style.bottom = 0;
		bar.style.left = (1 * i) + 'px';
		bar.style.position = 'absolute';
		bar.style.backgroundColor = arr[i].color;
		if (i === arr.length - 1) {
			bar.style.backgroundColor = 'slateblue';
		}
		document.querySelector('.histo-container').appendChild(bar);
	}
}

const historicalAction = [];

let action = 1;
let actionOwn = 0;
let money = 100;
let day = 0;

document.getElementById('day').textContent = day;
document.getElementById('action').textContent = action.toFixed(5);
document.getElementById('money').textContent = money.toFixed(2);
document.getElementById('action-own').textContent = actionOwn;

document.getElementById('btn-next').addEventListener('click', e => {
	day++;
	let r = rand(0, 1);
	if (r === 1) {
		action *= rand(100, 105) / 100;
		document.getElementById('action').style.color = 'green';
	} else {
		action *= rand(95, 100) / 100;
		document.getElementById('action').style.color = 'red';
	}
	document.getElementById('day').textContent = day;
	document.getElementById('action').textContent = action.toFixed(5);
	document.getElementById('money').textContent = money.toFixed(2);
	historicalAction.push({action, color: r === 1 ? 'green' : 'red'});
	if (historicalAction.length >= 1401) {
		historicalAction.shift();
	}
	displayHisto(historicalAction);
});

document.getElementById('btn-next-10').addEventListener('click', e => {
	for (let i = 0; i < 10; i++) {
		day++;
		let r = rand(0, 1);
		if (r === 1) {
			action *= rand(100, 105) / 100;
			document.getElementById('action').style.color = 'green';
		} else {
			action *= rand(95, 100) / 100;
			document.getElementById('action').style.color = 'red';
		}
		document.getElementById('day').textContent = day;
		document.getElementById('action').textContent = action.toFixed(5);
		document.getElementById('money').textContent = money.toFixed(2);
		historicalAction.push({action, color: r === 1 ? 'green' : 'red'});
		if (historicalAction.length >= 1401) {
			historicalAction.shift();
		}
		displayHisto(historicalAction);
	}
	
});

document.getElementById('btn-buy').addEventListener('click', e => {
	if (money >= action) {
		money -= action;
		actionOwn++;
		document.getElementById('action-own').textContent = actionOwn;
		document.getElementById('money').textContent = money.toFixed(2);
	}
});

document.getElementById('btn-sell').addEventListener('click', e => {
	if (actionOwn > 0) {
		actionOwn--;
		money += action;
		document.getElementById('action-own').textContent = actionOwn;
		document.getElementById('money').textContent = money.toFixed(2);
	}
});

document.getElementById('btn-buy-all').addEventListener('click', e => {
	while (money >= action) {
		money -= action;
		actionOwn++;
	}
	document.getElementById('action-own').textContent = actionOwn;
	document.getElementById('money').textContent = money.toFixed(2);
});

document.getElementById('btn-sell-all').addEventListener('click', e => {
	while (actionOwn > 0) {
		actionOwn--;
		money += action;
	}
	document.getElementById('action-own').textContent = actionOwn;
	document.getElementById('money').textContent = money.toFixed(2);
});

setInterval(()=>{
	day++;
	let r = rand(0, 1);
	if (r === 1) {
		action *= rand(100, 105) / 100;
		document.getElementById('action').style.color = 'green';
	} else {
		action *= rand(95, 100) / 100;
		document.getElementById('action').style.color = 'red';
	}
	document.getElementById('day').textContent = day;
	document.getElementById('action').textContent = action.toFixed(5);
	document.getElementById('money').textContent = money.toFixed(2);
	historicalAction.push({action, color: r === 1 ? 'green' : 'red'});
	if (historicalAction.length >= 1401) {
		historicalAction.shift();
	}
	displayHisto(historicalAction);
}, 1);