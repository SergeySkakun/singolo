const MENU = document.getElementById('menu');
const TABS =  document.getElementById('tabs');
const TABS_LINK = TABS.querySelectorAll('a');
const GALEREA = document.getElementById('galerea');
const SUBMIT = document.getElementById('submit');
const SLIDER = document.getElementById('slider');


MENU.addEventListener('click', (event) => {
  MENU.querySelectorAll('li a').forEach( el => el.classList.remove('active') );
  event.target.classList.add('active');
});

TABS_LINK.forEach((el) => {
  el.addEventListener('click', event => event.preventDefault() );
});

TABS.addEventListener('click', (event) => {
  let indexActiveTab = Array.prototype.indexOf.call(TABS_LINK, event.target);

  TABS_LINK.forEach( el => {
    el.classList.remove('active_tab_text');
    el.parentNode.classList.remove('active_tab');
  });

  event.target.classList.add('active_tab_text');
  event.target.parentNode.classList.add('active_tab');

  let listOfImg = Array.prototype.map.call(GALEREA.querySelectorAll('img'), (element, index) => {
    return element.src.replace(/\d{1,2}.jpg/, () => {
      let finalIndex = index + 1 + indexActiveTab;

      if(finalIndex > 12) {
        finalIndex = finalIndex - 12;
      }

      return (finalIndex) + '.jpg';
    });
  });

  listOfImg.forEach( (element, index) => {
    GALEREA.querySelectorAll('img')[index].src = element;
  } );

});

GALEREA.addEventListener('click', (event) => {
  GALEREA.querySelectorAll('img').forEach( el => el.classList.remove('active') );
  event.target.classList.add('active');
});

SUBMIT.addEventListener('click', (event) => {
  if(document.querySelector('form').checkValidity()) {
    event.preventDefault();

    const subject = document.getElementById('subject').value.toString();
    const descrition = document.getElementById('description').value.toString();
    const newWidow = document.getElementById('new_window');

    newWidow.classList.remove('hidden');
    newWidow.querySelector('.new_window_subject').innerHTML = (subject) ? `Тема: ${subject}` : 'Без темы';
    newWidow.querySelector('.new_window_description').innerHTML = (descrition) ? `Описание: ${descrition}` : 'Без описания';
    newWidow.querySelector('.new_window_button').addEventListener('click', (event) => {
      event.target.parentNode.classList.add('hidden');
      document.querySelector('form').reset();
    });
    }
});



class Slide {
  constructor(element, next, prev) {
    this.data = element;
    this.nextSlide = next || this;
    this.prevSlide = prev || this;
  }
}

class SlidesList {
  constructor(element) {
    this.startSlide = element || null;
    this.endSlide = element || null;
    this.counter = element ? 1 : 0;
  }
}

SlidesList.prototype.add = function (element) {
  if(this.counter) {
    let newSlide = new Slide(element, this.endSlide, this.startSlide);
    this.endSlide.nextSlide = newSlide;
    this.startSlide.prevSlide = newSlide;
    this.endSlide = newSlide;
  }
  else {
    let newSlide = new Slide(element);
    this.startSlide = element;
    this.endSlide = element;
  }

  this.counter++;
}

let newDOMElement = document.createElement('img');
newDOMElement.setAttribute('src', './assets/images/slider2.png');
newDOMElement.classList.add('class');

let newSliderContent = document.createElement('div');
newSliderContent.setAttribute('id', 'slider_content');
newSliderContent.classList.add('slider_content_2');
newSliderContent.appendChild(newDOMElement);

let currentSlide = new Slide(document.getElementById('slider_content'));
let slidesList = new SlidesList(currentSlide);
slidesList.add(newSliderContent);
console.log(slidesList);

SLIDER.addEventListener('click', (event) => {
  event.preventDefault();
  const LEFT_BUTTON = SLIDER.querySelector('.slider_button_left');
  const RIGHT_BUTTON = SLIDER.querySelector('.slider_button_right');

  if(event.target == LEFT_BUTTON || event.target == LEFT_BUTTON.firstElementChild) {
    switchSlide(currentSlide.prevSlide);
  }

  if(event.target == RIGHT_BUTTON || event.target == RIGHT_BUTTON.firstElementChild) {
    switchSlide(currentSlide.nextSlide);
  }
});

function switchSlide(element) {
  document.getElementById('slider_content').replaceWith(element.data);
  SLIDER.classList.toggle('red');
  SLIDER.classList.toggle('blue');
  currentSlide = element;
}

const HORIZONTAL_BUTTON = document.getElementById('horizontal_phone_button');
const VERTICAL_BUTTON = document.getElementById('vertical_phone_button');

HORIZONTAL_BUTTON.addEventListener('click', () => {
  document.querySelector('.black_horizontal').classList.toggle('hidden');
});

VERTICAL_BUTTON.addEventListener('click', () => {
  document.querySelector('.black_vertical').classList.toggle('hidden');
});
