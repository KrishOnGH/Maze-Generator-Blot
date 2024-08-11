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
let routeComplete = false
let directions = [[0, 0]]
drawLines([[[0, 0], [0, tileSize], [tileSize, tileSize], [tileSize, 0], [0, 0]]])

function arrayEquals(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
}

function isVisited(coord, directions) {
  return directions.some(dir => arrayEquals(dir, coord));
}

async function generatePath() {
  while (!routeComplete) {
    let randomOptions = [];
    let lastDirection = directions[directions.length - 1];
  
    if (lastDirection && lastDirection[0] > 0 && !isVisited([lastDirection[0] - 1, lastDirection[1]], directions)) {
      randomOptions.push([lastDirection[0] - 1, lastDirection[1]]);
    }
    if (lastDirection && lastDirection[0] < Math.sqrt(tiles) - 1 && !isVisited([lastDirection[0] + 1, lastDirection[1]], directions)) {
      randomOptions.push([lastDirection[0] + 1, lastDirection[1]]);
    }
    if (lastDirection && lastDirection[1] > 0 && !isVisited([lastDirection[0], lastDirection[1] - 1], directions)) {
      randomOptions.push([lastDirection[0], lastDirection[1] - 1]);
    }
    if (lastDirection && lastDirection[1] < Math.sqrt(tiles) - 1 && !isVisited([lastDirection[0], lastDirection[1] + 1], directions)) {
      randomOptions.push([lastDirection[0], lastDirection[1] + 1]);
    }
  
    if (randomOptions.length > 0 || randomOptions.includes([Math.sqrt(tiles), Math.sqrt(tiles)])) {
      let option = randomOptions[Math.floor(Math.random() * randomOptions.length)];
      directions.push(option);
      drawLines([[ [option[0]*tileSize, option[1]*tileSize], [option[0]*tileSize, option[1]*tileSize + tileSize], [option[0]*tileSize + tileSize, option[1]*tileSize + tileSize], [option[0]*tileSize + tileSize, option[1]*tileSize], [option[0]*tileSize, option[1]*tileSize] ]])
    } else {
      routeComplete = true;
    }
  }
}

generatePath()