const paragraphs = document.querySelectorAll('.letter-transition');
let currentIndex = 0;

function changeText() {
  paragraphs[currentIndex].classList.remove('visible');
  paragraphs[currentIndex].classList.add('hidden');

  currentIndex = (currentIndex + 1) % paragraphs.length;

  paragraphs[currentIndex].classList.remove('hidden');
  paragraphs[currentIndex].classList.add('visible');

  setTimeout(changeText, 3000);
}
changeText();


const params = new URLSearchParams(window.location.search);
const id = params.get("id")

fetch(`https://striveschool-api.herokuapp.com/books/${id}`)
    .then(r => r.json())
    .then(displayBook);

const bookTitle = document.querySelector("#bookTitle");
const bookImage = document.querySelector("#bookImage");

function displayBook(book) {
    bookTitle.innerHTML = book.title;
    bookImage.src = book.img;
    bookImage.alt= book.title;
}
