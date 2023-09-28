
/* FUNZIONE TESTO NAVBAR */

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


/* FETCH LIBRI */

const url = "https://striveschool-api.herokuapp.com/books"

const fetchBooks = (query) => {
  fetch(url + query)
    .then((response) => response.json())
    .then((result) => {
      let bookSection = document.querySelector(".bookList .row");
      bookSection.innerHTML = result.map((book) => {
        return `<div class='col-lg-3 col-md-4 col-sm-6'> <div class="card shadow-sm mb-3">
                <img class="img-fluid" src='${book.img}'/> 
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center">
                  <small class="custom-ellipsis font-italic">Title: ${book.title}</small>
                  </div>
                  <span class="font-italic"> Price:</span> <span class="font-weight-bold"> ${book.price} €</span>
                  <div class="mt-3 d-flex justify-content-around">
                  <button type="button" class="btn btn-warning btn-sm addToCart" onclick="addToCart('${book.title}','${book.price}')" data-book-price="${book.price}" data-book-title="${book.title}"> Add to Cart 🛒</button>
                  <button class='btn btn-outline-danger btn-sm' onclick="removeItem('${book.price}')"> Remove 🗑️</button>
                  </div>
                  <div class="d-flex justify-content-center">
                  <button class='btn btn-outline-secondary btn-sm mt-2'><a class="text-decoration-none text-secondary" href="book-details.html?id=${book.asin}"> Check Book Details 🔖</a> </button>
                  </div>
                </div>
              </div> </div>`;
      }).join("");
    })
    .catch((err) => console.error(err));
};

/* FUNZIONE SEARCH BOOKS */

const searchBook = () => {
  const query = document.querySelector(".searchInput").value.toLowerCase();
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    const title = card.querySelector(".custom-ellipsis").textContent.toLowerCase();
    if (title.includes(query)) {
      card.classList.remove("d-none"); // Rimuovere la classe "d-none" per mostrare la card
    } else {
      card.classList.add("d-none"); // Aggiungere la classe "d-none" per nascondere la card
    }
  });
};


let bookElement;

const addToCart = (title, price) => {

  bookElement = document.createElement("div");
  bookElement.classList.add("book-in-cart");

  //div per contenere il titolo e il prezzo
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info-div");

  // Aggiungere il titolo al div
  const titleElement = document.createElement("p");
  titleElement.textContent = `${title}`;
  infoDiv.appendChild(titleElement);

  // Aggiungere il prezzo al div
  const priceElement = document.createElement("p");
  priceElement.textContent = `€${price}`;
  priceElement.classList.add("price");
  infoDiv.appendChild(priceElement);

  // Aggiungere il div di informazioni all'elemento del libro
  bookElement.appendChild(infoDiv);

  // Aggiungere il nuovo elemento del libro al modal
  const modalBody = document.querySelector("#cartModal .modal-body");
  modalBody.appendChild(bookElement);


  const cartIcon = document.querySelector("#cartIcon");
  cartIcon.addEventListener("click", () => {
    // Visualizzare il modal quando si clicca sul carrello
    $("#cartModal").modal("show");
  });

  // Aggiornare il conteggio degli elementi nel carrello
  const cartItems = document.querySelectorAll(".book-in-cart");
  const cartItemCount = cartItems.length;
  const cartItemCountElement = document.querySelector("#cartItemCount");
  cartItemCountElement.textContent = cartItemCount;

  const total = document.querySelector("#totalPrice")
  total.innerText = (Number(total.innerText) + Number(price)).toFixed(2)
}

const removeItem = (price) => {
  const cardToRemove = document.querySelector(".card");
  if (bookElement && cardToRemove) {
    bookElement.remove()
    cardToRemove.remove();
    const cartItemCountElement = document.querySelector("#cartItemCount");
    let cartItemCount = parseInt(cartItemCountElement.innerText, 10);
    // cartItemCount non dovrebbe andare in negativo
    if (cartItemCount > 0) {
      cartItemCount--;
    }
    cartItemCountElement.innerText = cartItemCount; // aggiornare il testo nel DOM
    // aggiornare il totale dei prezzi
    const totale = document.querySelector("#totalPrice")
    totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2)
    if (totale < 0) {
      //il totale non dovrebbe andare in negativo
      totale.innerText = "Total: 0.00 €";
    } else {
      totale.innerText = `${totale.toFixed(2)}`;
    }
  }
};

const emptyCart = () => {
  const modalBody = document.querySelector("#cartModal .modal-body");
  modalBody.innerHTML = "";
  const total = document.querySelector("#totalPrice");
  total.innerText = "0";
  // azzerrare il conteggio degli elementi nel carrello 
  const cartItemCountElement = document.querySelector("#cartItemCount");
  cartItemCountElement.innerText = "0"
};
window.onload = () => {
  fetchBooks("")
}



