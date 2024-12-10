const cards = document.querySelectorAll(".card");
const container = document.querySelector(".container");
let currentIndex = Math.floor(cards.length / 2);

// Initial render
updateCards();

function updateCards() {
  cards.forEach((card, index) => {
    // Calculate offset using circular indexing for infinite dragging
    const totalCards = cards.length;
    const offset = (index - currentIndex + totalCards) % totalCards;
    const adjustedOffset =
      offset <= totalCards / 2 ? offset : offset - totalCards;

    card.style.transform = `translateY(${adjustedOffset * 50}px) scale(${
      1 - Math.abs(adjustedOffset) * 0.2
    })`;
    card.style.zIndex = -Math.abs(adjustedOffset);
    card.classList.toggle("center", adjustedOffset === 0);
  });
}

// Drag functionality
let startY = 0;
let isDragging = false;

// Desktop drag events
container.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Prevent text selection or default behaviors
  startY = e.clientY;
  isDragging = true;
});

container.addEventListener("mouseup", () => {
  isDragging = false;
});

container.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault(); // Prevent default behavior like text selection or scrolling
  const deltaY = e.clientY - startY;

  if (deltaY > 50) {
    // Dragging down
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCards();
    startY = e.clientY; // Reset starting point for smooth dragging
  } else if (deltaY < -50) {
    // Dragging up
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
    startY = e.clientY; // Reset starting point for smooth dragging
  }
});

// Prevent scroll events during dragging
container.addEventListener("wheel", (e) => {
  if (isDragging) {
    e.preventDefault();
  }
});
