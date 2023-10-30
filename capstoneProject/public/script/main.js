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

if (filterButton) {
  filterButton.addEventListener('click', handleFilter);
}
window.addEventListener('load', animateSection);
window.addEventListener('scroll', animateSection);
