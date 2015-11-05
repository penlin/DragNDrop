var g_dragSrcEl = null;

function handleDragStart(e) {
	this.style.opacity = '0.4';  // this / e.target is the source node.
	g_dragSrcEl = this;

	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this / e.target is current target element.
  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }
  this.classList.remove('over');
  // See the section on the DataTransfer object.
  if (g_dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    g_dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
	
  return false;
}

function handleDragEnd(e) {
	// this/e.target is the source node.
	var cols = document.querySelectorAll('#columns .column');
	this.style.opacity = '1';
  	g_dragSrcEl = null;
}

function onLoadDone() {
	var cols = document.querySelectorAll('#columns .column');
	console.log('document onload done ! #cols:' + cols.length);
	[].forEach.call(cols, function(col) {
	  	col.addEventListener('dragstart', handleDragStart, false);
		col.addEventListener('dragenter', handleDragEnter, false);
		col.addEventListener('dragover', handleDragOver, false);
		col.addEventListener('dragleave', handleDragLeave, false);
		col.addEventListener('drop', handleDrop, false);
		col.addEventListener('dragend', handleDragEnd, false);
	});
}
