const item = document.querySelector('.item')
const placeholders = document.querySelectorAll('.placeholder')
const headers = document.querySelectorAll('.col-header')
const addBtns = document.querySelectorAll('.add-note')
const body = document.querySelector('body')
let currentCard = ''

body.addEventListener('dragenter', deleteItem)

addListeners(item)

for (const addBtn of addBtns) {
  addBtn.addEventListener('click', addItem)
}

for (const placeholder of placeholders) {
  placeholder.addEventListener('dragover', dragover)
  placeholder.addEventListener('dragenter', dragenter)
  placeholder.addEventListener('dragleave', dragleave)
  placeholder.addEventListener('drop', drop)
}

function dragstart(event) {
  event.target.classList.add('hold')
  currentCard = event.target
  setTimeout(() => {
    event.target.classList.add('hide')
  }, 0)
}

function dragend(event) {
  event.target.className = 'item'
}

function dragover(event) {
  event.preventDefault()
}

function dragenter(event) {
  if (!event.target.classList.contains('placeholder')) return
  event.target.classList.add('hovered')
  addAnimation(event.target.dataset.id)
}

function dragleave(event) {
  if (!event.target.classList.contains('placeholder')) return
  event.target.classList.remove('hovered')
  removeAnimation(event.target.dataset.id)
}

function drop(event) {
  const target = event.target
  const id = event.target.dataset.id
  if (target.classList.contains('placeholder')) {
    target.append(currentCard);
    target.classList.remove('hovered');
  } else if (target.classList.contains('item')) {
    const parent = target.closest('.placeholder');
    parent.insertBefore(currentCard, target);
  }
  removeAnimation(id)
}

function addAnimation(id) {
  headers[id].classList.add('animation')
}

function removeAnimation(id) {
  headers[id].classList.remove('animation')
}

function addItem() {
  const item = createItem()
  const id = event.target.dataset.id
  placeholders[id].append(item)
}

function createItem() {
  const item = document.createElement('div')
  item.classList.add('item')
  item.setAttribute('draggable', true);
  item.textContent = 'New task';

  addListeners(item)

  return item
}

function addListeners(item) {
  item.addEventListener('dragstart', dragstart)
  item.addEventListener('dragend', dragend)
  item.addEventListener('dblclick', editItem)
  item.addEventListener('focusout', () => stopEditItem(item));
  item.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.ctrlKey === true) {
      event.preventDefault();
      stopEditItem(item);
    }
  });
}

function editItem() {
  const target = event.target
  target.setAttribute('contenteditable', true);
  target.focus();
}

function stopEditItem(target) {
  target.blur()
  target.removeAttribute('contenteditable');
}

function deleteItem() {
  if (event.target.dataset.trash) {
    currentCard.remove()
  }
}
