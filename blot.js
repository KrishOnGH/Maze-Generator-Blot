// Difficulties:
// 25: Fetus
// 100: Preschooler
// 225: 5th Grader
// 400: Beginner
// 1600: Intermediate
// 4900: Arthritis
// 10000: Impossible
let tiles = 400; // 400 Reccomended (Perfect Square Required) Change for difficulty

let width = 125;
let height = 125;
let gridSize = Math.sqrt(tiles)
let tileSize = Math.min(width, height) / Math.sqrt(tiles);

setDocDimensions(width, height);

let grid = [];
for (let y = 0; y < gridSize; y++) {
    let row = [];
    for (let x = 0; x < gridSize; x++) {
        row.push({top: true, right: true, bottom: true, left: true});
    }
    grid.push(row);
}

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
        [origin[0] * tileSize, origin[1] * tileSize + tileSize], 
        [origin[0] * tileSize + tileSize, origin[1] * tileSize + tileSize]
      ]]);
  } else if (side == 'top') {
      drawLines([[ 
        [origin[0] * tileSize, origin[1] * tileSize], 
        [origin[0] * tileSize + tileSize, origin[1] * tileSize]
      ]]);
  }
}

function breakWall(x, y, direction) {
    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
        console.error("Invalid cell coordinates");
        return;
    }
    
    if (!['top', 'right', 'bottom', 'left'].includes(direction)) {
        console.error("Invalid direction");
        return;
    }
    
    grid[y][x][direction] = false;

    let [dx, dy, oppDir] = {
        'top': [0, -1, 'bottom'],
        'right': [1, 0, 'left'],
        'bottom': [0, 1, 'top'],
        'left': [-1, 0, 'right']
    }[direction];

    let newX = x + dx;
    let newY = y + dy;
    
    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
        grid[newY][newX][oppDir] = false;
    }
}

function renderGrid() {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            let cell = grid[y][x];
            if (cell.top) draw([x, y], 'top');
            if (cell.right) draw([x, y], 'right');
            if (cell.bottom) draw([x, y], 'bottom');
            if (cell.left) draw([x, y], 'left');
        }
    }
}

let correctPath = [[0, 0]];
let visited = [[0, 0]];
let furthestTile = [];

function generatePath() {
  const gridSize = Math.sqrt(tiles);
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let furthestTileCounter = 1;
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
        let option = randomOptions[bt.randIntInRange(0, randomOptions.length-1)];

        let direction = ''
        if (option[0] > lastPosition[0]) {
          direction = 'right'
        } else if (option[0] < lastPosition[0]) {
          direction = 'left'
        } else if (option[1] > lastPosition[1]) {
          direction = 'bottom'
        } else if (option[1] < lastPosition[1]) {
          direction = 'top'
        }
        
        breakWall(lastPosition[0], lastPosition[1], direction);
        console.log(lastPosition[0] + ' ' + lastPosition[1] + ' ' + direction)
  
        correctPath.push(option);
        visited.push(option);
        if (correctPath.length > furthestTileCounter) {
          furthestTileCounter++
          furthestTile = option
        }
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

generatePath();
renderGrid();

function generateDot(origin) {
  const radius = tileSize/4;

  const dot = []  

  const disections = 100;
  const circle = [];
  for (let i = 0; i <= disections; i++) {
    const angle = (2 * Math.PI / disections) * i;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    circle.push([x, y]);
  }
  dot.push(circle);

  bt.translate(dot, [radius+tileSize/4+(origin[0]*tileSize), radius+tileSize/4+(origin[1]*tileSize)], bt.bounds(dot).cc);
  return dot
}

drawLines(generateDot(correctPath[0]), {fill: 'black'})
drawLines(generateDot(furthestTile), {fill: 'black'})