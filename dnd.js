var g_dragSrcEl = null;
var g_dragFromCondition = null;
function handleDragStart(e) {
	// this / e.target is the source node.
	g_dragSrcEl = this;
	//e.dataTransfer.effectAllowed = 'move';
	//e.dataTransfer.setData('text/html', this.outerHTML);
	this.style.opacity = '0.4';  
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
  g_dragSrcEl.style.opacity = '1';
  var node = g_dragSrcEl.cloneNode(true);
  node.addEventListener('dragstart',handleDragStart, false);
  node.addEventListener('dragend',handleDragEnd, false);
  this.getElementsByClassName('content-list')[0].appendChild(node);
  g_dragSrcEl.parentNode.removeChild(g_dragSrcEl);
  return false;
}

function handleDragEnd(e) {
	// this/e.target is the source node.
	if (g_dragSrcEl != null) {
		g_dragSrcEl.style.opacity = '1';
		g_dragSrcEl = null;
	}
}

function onLoadDone() {
	var cols = document.querySelectorAll('#columns .column');
	console.log('document onload done ! #cols:' + cols.length);
	[].forEach.call(cols, function(col) {
	  	//col.addEventListener('dragstart', handleDragStart, false);
		col.addEventListener('dragenter', handleDragEnter, false);
		col.addEventListener('dragover', handleDragOver, false);
		col.addEventListener('dragleave', handleDragLeave, false);
		col.addEventListener('drop', handleDrop, false);
		//col.addEventListener('dragend', handleDragEnd, false);
	});

	var items = document.querySelectorAll('p.listitem');
	[].forEach.call(items, function(item){
		item.addEventListener('dragstart',handleDragStart, false);
		item.addEventListener('dragend',handleDragEnd, false);
	});
}
