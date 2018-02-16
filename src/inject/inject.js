chrome.extension.sendMessage({}, function(response) {

	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			GuardCompleteButton();


		}
	}, 10);

	function setActivity(el, active) {
		return el.classList.toggle('active', !!active);
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