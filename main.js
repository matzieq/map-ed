const form = document.getElementById("form");
const mapWidthInput = document.getElementById("map-width");
const mapHeightInput = document.getElementById("map-height");
const mapContainer = document.getElementById("map");
const clearButton = document.getElementById("clear-button");
const generateButton = document.getElementById("generate-button");

let mapDimensions = { w: 0, h: 0 };
let isDrawing = false;
let isErasing = false;

const range = (num) => Array(num).fill(0);

const setMapDimensions = (newDim) => {
  mapDimensions = { ...mapDimensions, ...newDim };
};

function generateNewMap() {
  let mapHtml = "";
  console.log(mapDimensions);
  range(mapDimensions.h).forEach(() => {
    let row = '<div class="row">';
    range(mapDimensions.w).forEach(() => {
      row += '<div class="tile" data-value="0"></div>';
    });
    row += "</div>";

    mapHtml += row;
  });
  mapContainer.innerHTML = mapHtml;
}

function prepareTiles() {
  document.querySelectorAll(".tile").forEach((tile) => {
    normalizeTileSize(tile);
    tile.addEventListener("mouseover", () => {
      isDrawing && markTile(tile);
      isErasing && eraseTile(tile);
    });

    tile.addEventListener("mousedown", () => {
      if (tile.dataset.value === "0") {
        isDrawing = true;
        markTile(tile);
      } else {
        isErasing = true;
        eraseTile(tile);
      }
    });
  });
}

const normalizeTileSize = (tile) => {
  tile.style.width = `${window.innerWidth / mapDimensions.w}px`;
  tile.style.height = `${window.innerWidth / mapDimensions.w}px`;
};

const markTile = (tile) => {
  tile.dataset.value = "1";
  tile.style.backgroundColor = "darkgray";
};

const eraseTile = (tile) => {
  tile.dataset.value = "0";
  tile.style.backgroundColor = "transparent";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  setMapDimensions({
    w: parseInt(mapWidthInput.value),
    h: parseInt(mapHeightInput.value),
  });
  generateNewMap();
  prepareTiles();
});

window.addEventListener("mouseup", () => {
  isDrawing = false;
  isErasing = false;
});

clearButton.addEventListener("click", () => {
  document.querySelectorAll(".tile").forEach((tile) => eraseTile(tile));
});
