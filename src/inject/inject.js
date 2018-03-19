var MOVES = {
	LEFT: "left",
	RIGHT: "right"
}
var KEYCODES = {
	LEFTARROW: 37,
	RIGHTARROW: 39
}

chrome.extension.sendMessage({}, function(response) {

	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// make left and right keys work just like up and down keys...
			document.onkeydown = checkKey;

			GuardCompleteButton();

			setDefaultWildcards();

			makeMonthtlyTotalsClickable();

			calculateBetween();
		}
	}, 10);


	function checkKey(e) {
		e = e || window.event;
		var inputElement = e.target;

		var isNormalHoursInput = inputElement && inputElement.id === 'normalHoursInput';

		if (!isNormalHoursInput) {
			return;
		}

		if (e.keyCode === KEYCODES.LEFTARROW) {
			move(MOVES.LEFT, inputElement);
		}
		else if (e.keyCode === KEYCODES.RIGHTARROW) {
			move(MOVES.RIGHT, inputElement);
		}
	}

	function triggerMove(direction, input) {
		var activeRowElements = document.querySelectorAll('.active-row-level.hours-input');

		var activeIndex;
		for (var i = 0; i <= activeRowElements.length -1; i++) {
			var item = activeRowElements[i];
			var isActive = item.classList.contains('active');
			if (isActive) {
				activeIndex = i;
			}
		}

		var newIndex;
		if (activeIndex !== undefined) {
			if (direction === MOVES.LEFT) {
				newIndex = activeIndex - 1;
			} else {
				newIndex = activeIndex + 1;
			}
		}

		if (newIndex === undefined) {
			return
		}

		var newActiveItem = activeRowElements[newIndex];
		if (newActiveItem) {
				newActiveItem.click();
		}
	}

	function move(direction, input) {
		var value = input.value;
		var selectionStart = input.selectionStart;

		switch(direction) {
			case MOVES.LEFT:
				if (selectionStart === 0) {
					triggerMove(direction, input);
				}
			break;
			case MOVES.RIGHT:
				if (selectionStart === value.length) {
					triggerMove(direction, input);
				}
			break;
		}
	}

	function setActivity(el, active) {
		return el.classList.toggle('active', !!active);
	}

	function calculateBetween() {
		var hours = document.querySelectorAll('.day-hours-container');

		var firstEl;
		var firstElev;
		var secondEl;

		function selectEl(el, elev) {
			if (!firstEl) {
				firstEl = el;
				firstElev = elev;
				el.classList.add("selectedDay");
			} else {
				if (elev.x <= firstElev.x) {
					return;
				}
				secondEl = el;
			}
			el.classList.add("selectedDay");

			if (firstEl && secondEl) {
				var nextEl = firstEl;
				var elements = 0;
                var i = 0;

				while (i <= 31) {

					if (nextEl === secondEl) {
							
						elements = elements + parseFloat(secondEl.getElementsByTagName('input')[0].value);
						i = 31;
					}
					else {
						
						elements = elements + parseFloat(nextEl.getElementsByTagName('input')[0].value);
						nextEl = nextEl.nextSibling;						
					}
					i++;
				}

				copyTextToClipBoard(elements)

				setTimeout(function(){
					firstEl.classList.remove("selectedDay");
					firstEl = undefined;
					firstElev = undefined;
					secondEl.classList.remove("selectedDay");
					secondEl = undefined;
				}, 600);
			}
		}

		for (let i = 0; i < hours.length; i++) {
			hours[i].addEventListener("click", function(e){
				
				if(e.metaKey){
					selectEl(hours[i], e);
				} else {
				}
			}, false);
		}
	}

	function setDefaultWildcards() {
		document.getElementsByClassName('react-autosuggest__input')[0].value = "%%";
	}

	function makeMonthtlyTotalsClickable() {

		var totals = document.querySelectorAll('.timesheet-code-total');

		for (let i = 0; i < totals.length; i++) {
			totals[i].addEventListener("click", function(){
				copyTextToClipBoard(totals[i].innerHTML);
			}, false);
		}

	}

	function copyTextToClipBoard(text) {
		try{
			navigator.clipboard.writeText(text || "<3 Cronos")
			.then(() => {
			})
			.catch(err => {
				// This can happen if the user denies clipboard permissions:
				console.error('Could not copy text: ', err);
			});
		}
		catch(err) {
			console.warn("Clipboard API not supported in your version of chrome!");
			
		}
	}

	function GuardCompleteButton() {
		var toggleWrap = document.createElement("div");
		var toggleSwitch = document.createElement("span");
		var toggleKnob = document.createElement("span");
		var toggleIcon = document.createElement("span");
		toggleIcon.className = "fa fa-exclamation";
		toggleSwitch.className = "toggle-switch";
		toggleKnob.className = "toggle-knob";
		toggleSwitch.setAttribute("title", "Danger, flip at your own risk!");
		toggleKnob.appendChild(toggleIcon);
		toggleSwitch.appendChild(toggleKnob);
		toggleWrap.appendChild(toggleSwitch);

		var completeButton = document.querySelector('.timesheet-complete input');
		completeButton.parentNode.appendChild(toggleWrap);
		setTimeout(function() {
			completeButton.setAttribute("disabled", "disabled");
			setActivity(toggleSwitch);
		}, 1000);

		toggleSwitch.addEventListener("click", onClickToggle, false);

		function onClickToggle() {
			var toggled = toggleSwitch.classList.toggle('active');
			if (toggled) {
				completeButton.removeAttribute("disabled");
				toggleSwitch.setAttribute("title", "Back to safety!");
				return;
			}

			toggleSwitch.setAttribute("title", "Danger, flip at your own risk!");
			completeButton.setAttribute("disabled", "disabled");
		}
	}
});