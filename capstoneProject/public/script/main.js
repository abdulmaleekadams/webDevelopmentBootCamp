const filterButton = document.getElementById('filterButton'),
  filterForm = document.querySelector('.filter form'),
  bookContainers = document.querySelectorAll('.bookContainer');

const handleFilter = () => {
  filterForm.classList.toggle('show');
};

const animateSection = () => {
  const windowHeight = this.innerHeight - 50;
  bookContainers.forEach((bookContainer) => {
    const bookContainerTop = bookContainer.getBoundingClientRect().top;
    const bookContainerHeight = bookContainer.offsetHeight;

    if (bookContainerTop < windowHeight) {
      bookContainer.classList.add('show');
    }
  });
};

function autoGrowTextArea(element, textarea) {
  textarea.value = element.innerText;
  element.classList.remove('truncate');
  element.style.height = element.scrollHeight + 'px';
}

const editBtns = document.querySelectorAll('.edit');

if (editBtns) {
  for (let editBtn of editBtns) {
    const id = editBtn.id.split('-')[1];
    const editForm = document.querySelector(`#editForm-${id}`);
    const closeBtn = document.querySelector(`#closeBtn-${id}`);
    const textArea = document.querySelector(`#form-${id}  .textarea`);
    const textarea = document.querySelector(`#form-${id}  textarea`);
    textarea.value = textArea.innerHTML;

    const initialContent = textArea.innerHTML;

    textArea.addEventListener('click', () =>
      autoGrowTextArea(textArea, textarea)
    );
    textArea.addEventListener('input', () =>
      autoGrowTextArea(textArea, textarea)
    );
    editBtn.addEventListener('click', () => editForm.classList.add('showUI'));
    closeBtn.addEventListener('click', () =>
      editForm.classList.remove('showUI')
    );
    closeBtn.addEventListener('click', () => {
      textArea.innerText = initialContent;
      textArea.classList.add('truncate');
      textArea.style.height = '100px';
    });
  }
}

if (filterButton) {
  filterButton.addEventListener('click', handleFilter);
}

window.addEventListener('load', animateSection);
window.addEventListener('scroll', animateSection);
