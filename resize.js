function initialise(element) {
	dragElement(element);
	resizeElement(element);
}

function resizeElement(elmntSelector) {
	var startX = 0, startY = 0;
	var element = document.getElementById(elmntSelector);
	var resizer = document.createElement('div');
	resizer.className = 'resizer';
	resizer.style.width = '10px';
	resizer.style.height = '10px';
	resizer.style.background = 'red';
	resizer.style.position = 'absolute';
	resizer.style.right = 0;
	resizer.style.bottom = 0;
	resizer.style.cursor = 'se-resize';
	element.appendChild(resizer);
	resizer.addEventListener('mousedown', initResize, false);

	function startResize() {
		document.onmouseup = stopResize;
		document.onmousemove = Resize;
	}
	
	function initResize(e) {
		e = e || window.event;
		e.preventDefault();	
		//remove the drag handler temporarily
		document.getElementById("mydiv").onmousedown = undefined;
		// get the mouse cursor position at startup:
		//depending on container transform, the X and Y axis will change as mouse coordinates will always be in rotate(0deg) format
		/* var rotation = parseInt(document.getElementById('rotationSelect').value);
		if(rotation === 90 || rotation === 270) {
		} */
		
		startX = e.clientX;
		startY = e.clientY;
		startResize();
	}
	
	function Resize(e) {
		e = e || window.event;
		e.preventDefault();
		var newWidth = 0, newHeight = 0, diffX = 0, diffY = 0;
		var rotation = parseInt(document.getElementById('rotationSelect').value);
		switch(rotation) {
			case 0:
					diffX = e.clientX - startX;
					diffY = e.clientY - startY;
				break;
			case 90:
					diffX = e.clientY - startY;
					diffY = -(e.clientX - startX);
				break;
			case 180:
					diffX = -(e.clientX - startX);
					diffY = -(e.clientY - startY);
				break;
			case 270:
					diffX = -(e.clientY - startY);
					diffY = e.clientX - startX;
				break;
		}

		startX = e.clientX;
		startY = e.clientY;

		element.style.width = (element.offsetWidth + diffX)/element.parentNode.clientWidth * 100 + "%";
		element.style.height = (element.offsetHeight + diffY)/element.parentNode.clientHeight * 100 + "%";	
		console.log("resize");
	}
	function stopResize(e) {
		document.onmouseup = null;
		document.onmousemove = null;
		dragElement("mydiv");
		console.log("stopResize");
	}
}