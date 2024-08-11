let width = 125;
let height = 125;
setDocDimensions(width, height);

function draw(origin, side) {
  if (side == 'left') {
      drawLines([[ 
        [origin[0] * tileSize, origin[1] * tileSize], 
        [origin[0] * tileSize, origin[1] * tileSize + tileSize]
      ]]);
  } else if (side == 'right') {
      drawLines([[ 
        [origin[0] * tileSize + tileSize, origin[1] * tileSize], 
        [origin[0] * tileSize + tileSize, origin[1] * tileSize + tileSize]
      ]]);
  } else if (side == 'bottom') {
      drawLines([[ 
        [origin[0] * tileSize, origin[1] * tileSize], 
        [origin[0] * tileSize + tileSize, origin[1] * tileSize]
      ]]);
  } else if (side == 'top') {
      drawLines([[ 
        [origin[0] * tileSize, origin[1] * tileSize + tileSize], 
        [origin[0] * tileSize + tileSize, origin[1] * tileSize + tileSize]
      ]]);
  }
}

function createPassway(fromDirection, toDirection, origin) {
  if (fromDirection == toDirection) {
    if (fromDirection == 'up' || fromDirection == 'down') {
      draw(origin, 'right')
      draw(origin, 'left')
    } else if (fromDirection == 'right' || fromDirection == 'left') {
      draw(origin, 'top')
      draw(origin, 'bottom')
    }
  } 
  
  else if (fromDirection == 'up') {
    draw(origin, 'top')
    if (toDirection == 'right') {
      draw(origin, 'left')
    } else if (toDirection == 'left') {
      draw(origin, 'right')
    }
  } 
  
  else if (fromDirection == 'down') {
    draw(origin, 'bottom')
    if (toDirection == 'right') {
      draw(origin, 'left')
    } else if (toDirection == 'left') {
      draw(origin, 'right')
    }
  } 
  
  else if (fromDirection == 'right') {
    draw(origin, 'right')
    if (toDirection == 'up') {
      draw(origin, 'bottom')
    } else if (toDirection == 'down') {
      draw(origin, 'top')
    }
  }

  else if (fromDirection == 'left') {
    draw(origin, 'left')
    if (toDirection == 'up') {
      draw(origin, 'bottom')
    } else if (toDirection == 'down') {
      draw(origin, 'top')
    }
  }
}

let tiles = 100
let tileSize = Math.sqrt(width*height/tiles)
let correctPath = [[0, 0]]
let visited = [[0, 0]]; // Initialize visited as an array with the starting tile

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
        let newPos = [newX, newY];

        // Check if newPos is within bounds and not already visited
        if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize && !visited.some(v => v[0] === newX && v[1] === newY)) {
          randomOptions.push(newPos);
        }
      }

      if (randomOptions.length > 0) {
        // Choose a random option and add it to the path
        let option = randomOptions[Math.floor(Math.random() * randomOptions.length)];
        correctPath.push(option);
        visited.push(option);

      } else {
        // Backtrack
        correctPath.pop();

        if (correctPath.length === 0) {
          routeComplete = true;
        }
      }
    }

    // Check if we've covered all tiles
    if (visited.length >= tiles) {
      routeComplete = true;
    }
  }
}

function drawPath() {
  const gridSize = Math.sqrt(tiles);

  for (let i = 1; i < visited.length-1; i++) {
    let tile = visited[i]
    let previousTile = visited[i-1]
    let nextTile = visited[i+1]
    let fromDirection = '';
    let toDirection = '';

    // Determine fromDirection
    if (tile[1] > previousTile[1]) {
        fromDirection = 'up';
    } else if (tile[1] < previousTile[1]) {
        fromDirection = 'down';
    } else if (tile[0] < previousTile[0]) {
        fromDirection = 'left';
    } else if (tile[0] > previousTile[0]) {
        fromDirection = 'right';
    }

    // Determine toDirection
    if (nextTile[1] > tile[1]) {
        toDirection = 'up';
    } else if (nextTile[1] < tile[1]) {
        toDirection = 'down';
    } else if (nextTile[0] < tile[0]) {
        toDirection = 'left';
    } else if (nextTile[0] > tile[0]) {
        toDirection = 'right';
    }

    createPassway(fromDirection, toDirection, tile)
  }
}

generatePath()
drawPath()