import "./style.css";
import { buildDOM, getImageSets } from "./modules/images";
const bg = document.querySelector("#background");
buildDOM(getImageSets(), bg);
const app = document.querySelector("#app");

//window.scroll(1800, 1800);
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const MAX_SPEED = 20;
const dist = {
  x: 0,
  y: 0,
};
const translated = {
  x: -3600,
  y: -3600,
};
bg.style.setProperty("--x", translated.x + "px");
bg.style.setProperty("--y", translated.y + "px");

//TODO: resizeoberserver

function update() {
  translated.x += dist.x;
  translated.y += dist.y;
  bg.style.setProperty("--x", translated.x + "px");
  bg.style.setProperty("--y", translated.y + "px");
  moveGrid();
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
function moveGrid() {
  document.title = dist.y;
  //DOWN
  if (dist.y < 0 && translated.y < (9000 - 2700) * -1) {
    bg.appendChild(document.querySelector(`[data-id="0"]`));
    bg.appendChild(document.querySelector(`[data-id="1"]`));
    bg.appendChild(document.querySelector(`[data-id="2"]`));
    bg.appendChild(document.querySelector(`[data-id="3"]`));
    bg.appendChild(document.querySelector(`[data-id="4"]`));
    translated.y += 1800;
    resetNumbers();
  }
  //UP
  if (dist.y > 0 && translated.y > -2700) {
    bg.insertBefore(
      document.querySelector(`[data-id="20"]`),
      document.querySelector(`[data-id="0"]`)
    );
    bg.insertBefore(
      document.querySelector(`[data-id="21"]`),
      document.querySelector(`[data-id="0"]`)
    );
    bg.insertBefore(
      document.querySelector(`[data-id="22"]`),
      document.querySelector(`[data-id="0"]`)
    );
    bg.insertBefore(
      document.querySelector(`[data-id="23"]`),
      document.querySelector(`[data-id="0"]`)
    );
    bg.insertBefore(
      document.querySelector(`[data-id="24"]`),
      document.querySelector(`[data-id="0"]`)
    );
    translated.y -= 1800;
    resetNumbers();
  }

  //RIGHT
  if (translated.x < (9000 - 2700) * -1 && dist.x < 0) {
    bg.insertBefore(
      document.querySelector(`[data-id="0"]`),
      document.querySelector(`[data-id="5"]`)
    );
    bg.insertBefore(
      document.querySelector(`[data-id="5"]`),
      document.querySelector(`[data-id="10"]`)
    );
    bg.insertBefore(
      document.querySelector(`[data-id="10"]`),
      document.querySelector(`[data-id="15"]`)
    );
    bg.insertBefore(
      document.querySelector(`[data-id="15"]`),
      document.querySelector(`[data-id="20"]`)
    );
    document
      .querySelector(`[data-id="20"]`)
      .after(document.querySelector(`[data-id="24"]`));

    translated.x += 1800;
    resetNumbers();
  }
  //LEFT
  if (translated.x > -2700 && dist.x > 0) {
    bg.insertBefore(
      document.querySelector(`[data-id="4"]`),
      document.querySelector(`[data-id="0"]`)
    );
    bg.insertBefore(
      document.querySelector(`[data-id="9"]`),
      document.querySelector(`[data-id="5"]`)
    );
    bg.insertBefore(
      document.querySelector(`[data-id="14"]`),
      document.querySelector(`[data-id="10"]`)
    );
    bg.insertBefore(
      document.querySelector(`[data-id="19"]`),
      document.querySelector(`[data-id="15"]`)
    );
    bg.insertBefore(
      document.querySelector(`[data-id="24"]`),
      document.querySelector(`[data-id="20"]`)
    );
    translated.x -= 1800;
    resetNumbers();
  }
}
function resetNumbers() {
  document
    .querySelectorAll(".inner-grid")
    .forEach((gr, index) => (gr.dataset.id = index));
}
function resetWindow(e, isMobile = false) {
  e.preventDefault();
  let event = e;
  if (isMobile) {
    event = e.touches[0];
  }
  //console.log(event);
  const xPercent = ((event.clientX - CENTER_X) / CENTER_X) * -1;
  const yPercent = ((event.clientY - CENTER_Y) / CENTER_Y) * -1;
  dist.x = xPercent * MAX_SPEED;
  dist.y = yPercent * MAX_SPEED;
  /* document.querySelector(".debug").innerHTML = `<p>x: ${dist.x} y: ${dist.y}</p>
  <p>xP ${xPercent} yP ${yPercent}</p>
  <p>eX ${event.clientX} eY ${event.clientY}</p>
  `; */
}

app.addEventListener("mousemove", resetWindow, false);
app.addEventListener(
  "touchmove",
  (e) => {
    console.log(e);
    resetWindow(e, true);
  },
  false
);
app.addEventListener(
  "touchend",
  (e) => {
    dist.x = 0;
    dist.y = 0;
  },
  false
);
