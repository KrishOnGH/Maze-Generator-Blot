let width = 125;
let height = 125;
setDocDimensions(width, height);

function createPassway(horizontalOrVertical, length, width, origin) {
  if (horizontalOrVertical == 'horizontal') {
    const passwayTop = [ [origin[0], origin[1]], [origin[0]+length, origin[1]] ]
    const passwayBottom = [ [origin[0], origin[1]-width], [origin[0]+length, origin[1]-width] ]
    return [passwayTop, passwayBottom]
  } else if (horizontalOrVertical == 'vertical') {
    const passwayTop = [ [origin[0], origin[1]], [origin[0], origin[1]-length] ]
    const passwayBottom = [ [origin[0]+width, origin[1]], [origin[0]+width, origin[1]-length] ]
    return [passwayTop, passwayBottom]
  }
}

function CreateTurn(origin, radius, width, direction) {
    let outerPath, innerPath;
    
    outerPath = [
        [origin[0], origin[1] - radius],
        [origin[0], origin[1]],
        [origin[0] + radius, origin[1]]
    ]
    innerPath = [
        [origin[0] + width, origin[1] - radius],
        [origin[0] + width, origin[1] - width],
        [origin[0] + radius, origin[1] - width]
    ]

    let pathway = [outerPath, innerPath]
  
    if (direction == 'bottomright') {
      return bt.rotate(pathway, 90)
    } else if (direction == 'bottomleft') {
      return bt.rotate(pathway, 180)
    } else if (direction == 'topleft') {
      return bt.rotate(pathway, 270)
    }

    return pathway
}

let tiles = 100
let tileSize = Math.sqrt(width*height/tiles)
let correctPath = [[0, 0]]
let visited = new Set();
visited.add([0, 0].toString());
drawLines([[[0, 0], [0, tileSize], [tileSize, tileSize], [tileSize, 0], [0, 0]]])

function generatePath() {
  const gridSize = Math.sqrt(tiles);
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let routeComplete = false;

  while (!routeComplete) {
    let lastPosition = correctPath[correctPath.length - 1];

    if (lastPosition) {
      let [x, y] = lastPosition;
      let randomOptions = [];

      // Check all possible directions
      for (const [dx, dy] of directions) {
        let newX = x + dx;
        let newY = y + dy;
        let newPos = [newX, newY].toString();

        if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize && !visited.has(newPos)) {
          randomOptions.push([newX, newY]);
        }
      }

      if (randomOptions.length > 0) {
        // Choose a random option and add it to the path
        let option = randomOptions[Math.floor(Math.random() * randomOptions.length)];
        correctPath.push(option);
        visited.add(option.toString());

        drawLines([[ 
          [option[0] * tileSize, option[1] * tileSize], 
          [option[0] * tileSize, option[1] * tileSize + tileSize], 
          [option[0] * tileSize + tileSize, option[1] * tileSize + tileSize], 
          [option[0] * tileSize + tileSize, option[1] * tileSize], 
          [option[0] * tileSize, option[1] * tileSize]
        ]]);

      } else {
        // Backtrack
        correctPath.pop();

        if (correctPath.length === 0) {
          routeComplete = true;
        }
      }
    }

    // Check if we've covered all tiles
    if (visited.size >= tiles) {
      routeComplete = true;
    }
  }
}

generatePath()

// Draw correct path
for (let i = 0; i < correctPath.length; i++) {
    let option = correctPath[i]
    drawLines([[ 
      [option[0] * tileSize, option[1] * tileSize], 
      [option[0] * tileSize, option[1] * tileSize + tileSize], 
      [option[0] * tileSize + tileSize, option[1] * tileSize + tileSize], 
      [option[0] * tileSize + tileSize, option[1] * tileSize], 
      [option[0] * tileSize, option[1] * tileSize]
    ]], {fill: 'orange'});
}