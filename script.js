const MENU = document.getElementById('menu');
const TABS =  document.getElementById('tabs');
const GALEREA = document.getElementById('galerea');
const SUBMIT = document.getElementById('submit');

MENU.addEventListener('click', (event) => {
  MENU.querySelectorAll('li a').forEach( el => el.classList.remove('active') );
  event.target.classList.add('active');
});

TABS.addEventListener('click', (event) => {
  let listOfTabsLink = TABS.querySelectorAll('li a');
  let indexActiveTab = Array.prototype.indexOf.call(listOfTabsLink, event.target);

  listOfTabsLink.forEach( el => {
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
  event.preventDefault();
  const subject = document.getElementById('subject').value.toString();
  const descrition = document.getElementById('description').value.toString();
  const newWidow = document.getElementById('new_window');

  newWidow.classList.remove('hidden');
  newWidow.querySelector('.new_window_subject').innerHTML = (subject) ? `Тема: ${subject}` : 'Без темы';
  newWidow.querySelector('.new_window_description').innerHTML = (descrition) ? `Описание: ${descrition}` : 'Без описания';
  newWidow.querySelector('.new_window_button').addEventListener('click', (event) => {
    event.target.parentNode.classList.add('hidden');
  })
});
