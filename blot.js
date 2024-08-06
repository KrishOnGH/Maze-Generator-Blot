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

// Example usage
const verticalleft = createPassway('vertical', 22, 5, [10, height-10-5])
drawLines(verticalleft)
const verticalright = createPassway('vertical', 22, 5, [10+22+5, height-10-5])
drawLines(verticalright)
const horizontaltop = createPassway('horizontal', 22, 5, [10+5, height-10])
drawLines(horizontaltop)
const horizontalbottom = createPassway('horizontal', 22, 5, [10+5, height-10-5-22])
drawLines(horizontalbottom)

const bottomrightcorner = CreateTurn([10+22+5, 125-10-5-22], 5, 5, 'bottomleft');
drawLines(bottomrightcorner);
const bottomleftcorner = CreateTurn([10, 125-10-5-22], 5, 5, 'bottomright');
drawLines(bottomleftcorner);
const topleftcorner = CreateTurn([10, 125-10], 5, 5, 'topright');
drawLines(topleftcorner);
const toprightcorner = CreateTurn([10+22+5, 125-10], 5, 5, 'topleft');
drawLines(toprightcorner);