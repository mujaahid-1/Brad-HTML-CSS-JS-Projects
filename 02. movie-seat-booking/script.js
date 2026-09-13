const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();
let tickPrice = +movieSelect.value;

// Save selected movie index and price.
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};

// Update total and count
function updateSelectedCount() {
  const selectedSeat = document.querySelectorAll(".row .seat.selected");

  // Copy selected seats into array.
  // Map through array
  // return a new array of indexes.
  const seatsIndex = [...selectedSeat].map((seat) => [...seats].indexOf(seat));

  // Save into local storage.
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatCount = selectedSeat.length;
  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * tickPrice;
}

// Get data from localStorage and populate UI.
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats?.length > 0 && selectedSeats !== null) {
    seats.forEach((seat, i) => {
      if (selectedSeats.indexOf(i) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event.
movieSelect.addEventListener("change", (e) => {
  tickPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// /Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
