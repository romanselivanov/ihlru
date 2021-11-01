
document.getElementById("bottom-form").addEventListener('submit', footerForm)
document.getElementById('BackCallModal').addEventListener('show.bs.modal', callBackForm)
document.getElementById('BackCallModal').addEventListener('submit', callBackSubmit)
let careerA = document.getElementById('careerAnketa')
if(careerA){
	careerA.addEventListener('show.bs.modal', careerAnketa)
	careerA.addEventListener('submit', careerAnketaSubmit)
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


function footerForm(e) {
	e.preventDefault();
	
	grecaptcha.ready(function() {
		grecaptcha.execute('6LfTo7scAAAAACx5oHpKGBB7Z-D8kqP2qmHLNl1y', {action: 'homepage'}).then(function(token) {
			document.getElementById("g-recaptcha-response").value = token;
			let form = document.querySelector('#bottom-form');
			let url = form.action
			let dataObject = new FormData(form);
			var object = {};
			dataObject.forEach(function(value, key){
			  if (value != "") {
				  object[key] = value;                                                      
			  }
			});
			var json = JSON.stringify(object);
		
			var xhr = new XMLHttpRequest();	
			xhr.open("POST", url); 
			xhr.setRequestHeader('X-CSRFToken', csrftoken);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.onload = function(){ 
				document.querySelector('.call_back_form_content').classList.add("hidden");
				document.querySelector('.call_back_form_succes').classList.remove("hidden");
			}; 
			xhr.send(json);
		});
	  });

};

function callBackForm(e) {
	var button = e.relatedTarget
	let url = button.getAttribute('href')
	var divid = document.getElementById('BackCallModal').querySelector('.modal-body')

	var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
		divid.innerHTML=xhr.responseText;
	}
	xhr.send();

};

function callBackSubmit(e) {
	e.preventDefault();
		
	let form = document.querySelector('#call-back');
	let url = form.action
	let dataObject = new FormData(form);
	var object = {};
	dataObject.forEach(function(value, key){
	  if (value != "") {
		  object[key] = value;                                                      
	  }
	});
	var json = JSON.stringify(object);
	
	var xhr = new XMLHttpRequest();	
	xhr.open("POST", url); 
	xhr.setRequestHeader('X-CSRFToken', csrftoken);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onload = function(){ 
		var divid = document.getElementById('BackCallModal').querySelector('.modal-body')
		divid.innerHTML=xhr.responseText;
	}; 
	xhr.send(json);
};

function careerAnketa(e) {
	var button = e.relatedTarget
	let url = button.getAttribute('href')
	var divid = document.getElementById('careerAnketa').querySelector('.modal-body')

	var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
		divid.innerHTML=xhr.responseText;
	}
	xhr.send();

};

function careerAnketaSubmit(e) {
	e.preventDefault();
		
	let form = document.querySelector('#anketa-oper');
	let url = form.action
	let dataObject = new FormData(form);
	var object = {};
	dataObject.forEach(function(value, key){
	  if (value != "") {
		  object[key] = value;                                                      
	  }
	});
	var json = JSON.stringify(object);

	var xhr = new XMLHttpRequest();	
	xhr.open("POST", url); 
	xhr.setRequestHeader('X-CSRFToken', csrftoken);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onload = function(){ 
		var divid = document.getElementById('careerAnketa').querySelector('.modal-body')
		divid.innerHTML=xhr.responseText;
	}; 
	xhr.send(json);
};

/***carousel Effect**/
document.addEventListener("DOMContentLoaded", function(){
	let items = document.querySelectorAll('.recipe-carousel .carousel-item')
	
	items.forEach((el) => {
		const minPerSlide = 4
		let next = el.nextElementSibling
		for (var i = 1; i < minPerSlide; i++) {
			if (!next) {
				// wrap carousel by using first child
				next = items[0]
			}
			let cloneChild = next.cloneNode(true)
			el.appendChild(cloneChild.children[0])
			next = next.nextElementSibling
		}
	})
	});

/***carousel Effect**/
document.addEventListener("DOMContentLoaded", function(){
	let items = document.querySelectorAll('.client-carousel .carousel-item')
	
	items.forEach((el) => {
		const minPerSlide = 4
		let next = el.nextElementSibling
		for (var i = 1; i < minPerSlide; i++) {
			if (!next) {
				// wrap carousel by using first child
				next = items[0]
			}
			let cloneChild = next.cloneNode(true)
			el.appendChild(cloneChild.children[0])
			next = next.nextElementSibling
		}
	})
	});

/***Header Effect**/

document.addEventListener("DOMContentLoaded", function(){	
	el_autohide = document.querySelector('.container-fluid');

	if(el_autohide){			
		var last_scroll_top = 0;
		window.addEventListener('scroll', function() {
			let scroll_top = window.scrollY;
			if(scroll_top > 0) {
				el_autohide.classList.remove('scrolled-up');
				el_autohide.classList.add('scrolled-down');
			}
			else {
				el_autohide.classList.remove('scrolled-down');
				el_autohide.classList.add('scrolled-up');
			}
		}); 
		// window.addEventListener
	}	
}); 



{	// scrollbar behaviour
	let timer = null, isOver = false, isDown = false;
	const remove = t => timer = setTimeout(() => document.body.classList.remove('hover'), t || 1000);

	window.addEventListener('mousemove', e => {
		if (timer) clearTimeout(timer);
		if (e.pageX > document.body.offsetWidth) {
			isOver = true;
			if (!document.body.classList.contains('hover'))
				document.body.classList.add('hover');
		} else {
			isOver = false;
			if (!isDown) remove();
		}
	});

	document.addEventListener('mouseleave', remove);
	document.addEventListener('mousedown', () => {
		if (timer) clearTimeout(timer);
		if (isOver) isDown = true;
	});
	document.addEventListener('mouseup', () => (isDown = false));
	window.addEventListener('scroll', () => {
		if (timer) clearTimeout(timer);
		if (!document.body.classList.contains('hover'))
			document.body.classList.add('hover');
		if (!isDown) remove();
	});
}


