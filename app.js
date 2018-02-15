
let data = {
    size: 300,
    sectors: [
      { percentage: 0.10 },
      { percentage: 0.10 },
      { percentage: 0.10 },
      { percentage: 0.10 },
      { percentage: 0.10 },
      { percentage: 0.10 },
      { percentage: 0.10 },
      { percentage: 0.10 },
      { percentage: 0.10 },
      { percentage: 0.10 }
    ]
}
// calculateSectors
function calculateSectors(data) {
  let sectors = [];
  let colors = [
    "#ff96b2",
    "#d1cfe2",
    "#473bf0",
    "#74f2ce",
    "#ff0f80",
    "#7b0828",
    "#06d6a0",
    "#39a0ed",
    "#ef476f",
    "#ffd166"
  ];
  let l = data.size / 2 // l is radius
  let a = 0; // Angle
  let aRad = 0; // Angle in Rad
  let z = 0; // Side z
  let x = 0; // Side x
  let y = 0; // Side y
  let X = 0; // SVG X coordinate
  let Y = 0; // SVG Y coordinate
  let R = 0; // Rotation

  data.sectors.map(function(item, key) {
    a = 360 * item.percentage;
    aCalc = (a > 180) ? 360 - a : a;
    // Javascript calculates trigonometry functions in radians.
    // Convert a degree value to radians by multiply by PI and divide by 180.
    aRad = aCalc * Math.PI / 180;
    z = Math.sqrt(2*l*l - (2*l*l*Math.cos(aRad)));
      if(aCalc <= 90) {
        x = l*Math.sin(aRad);
      } else {
        x = l*Math.sin((180 - aCal) * Math.PI/180);
      }

      y = Math.sqrt(z*z - x*x);
      Y = y;

      if(a <= 180) {
        X = l + x;
        arcSweep = 0;
      } else {
        X = l - x;
        arcSweep = 1;
      }

    sectors.push({
      percentage: item.percentage,
      // label: item.label,
      color: colors[key],
      arcSweep: arcSweep,
      L: l,
      X: X,
      Y: Y,
      R: R
    });

    R = R + a;
  })
  return sectors
}

sectors = calculateSectors(data);
let newSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

// SVG dimensions
newSVG.setAttributeNS(null, 'style', "width: " + data.size + "px; height: " + data.size + "px");
let pageWrap = document.getElementById('page-wrap');
pageWrap.appendChild(newSVG);
console.log(sectors);
let group = document.createElementNS("http://www.w3.org/2000/svg", "g");
group.classList.add('groupSVG');
newSVG.appendChild(group);

sectors.map(function(sector) {
  let newSector = document.createElementNS("http://www.w3.org/2000/svg", "path");
  newSector.setAttributeNS(null, 'fill', sector.color);
  newSector.setAttributeNS(null, 'd', 'M' + sector.L + ',' + sector.L + ' L' + sector.L + ',0 A' + sector.L + ',' + sector.L + ' 1 0,1 ' + sector.X + ', ' + sector.Y + ' z');
  newSector.setAttributeNS(null, 'transform', 'rotate(' + sector.R + ', ' + sector.L + ', ' + sector.L + ')');
  group.appendChild(newSector);
})

let grp = document.createElementNS("http://www.w3.org/2000/svg", "g");
grp.classList.add('group');
let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttributeNS(null, `fill`, `orangered`);
path.setAttributeNS(null, 'd', 'M' + 143 + ',' + 0 + ' L' + 153 + ',' + 50 + ' L' + 163 + ',' + 0 + ' Z');
grp.appendChild(path);
newSVG.appendChild(grp);

let degree = 0;


// Event
group.addEventListener('click', function(){
// Game logic
  degree = Math.floor(Math.random() * (360 - 0) - 0);
// @Keyframes array

  let keyframes = [
    { transform: `rotate(0deg)`, offset: 0 },
    { transform: `rotate(750deg)`, offset: 0.2 },
    { transform: `rotate(-450deg)`, offset: 0.4 },
    { transform: `rotate(380deg)`, offset: 0.6 },
    { transform: `rotate(${degree}deg)`, offset: 0.8 },
    { transform: `rotate(${360 - degree}deg)`, offset: 1 }
  ]
// Animation @Keyframes cssRules
  let keyframeOptions = {
      duration: 5500,
      easing: 'linear',
      endDelay: 500,
      fill: 'forwards',
      iterations: 1
  }
  // Build in Javascript animate method
  group.animate(keyframes, keyframeOptions)

  let scoreNum = 0;
  if(degree > 0 && degree < 36) {
    scoreNum = 1;
  } else if (degree > 36 && degree < 72) {
    scoreNum = 2;
  } else if (degree > 72 && degree < 108) {
    scoreNum = 3;
  } else if (degree > 108 && degree < 144) {
    scoreNum = 4;
  } else if (degree > 144 && degree < 180) {
    scoreNum = 5;
  } else if (degree > 180 && degree < 216) {
    scoreNum = 6;
  } else if (degree > 216 && degree < 252) {
    scoreNum = 7;
  } else if (degree > 252 && degree < 288) {
    scoreNum = 8;
  } else if (degree > 288 && degree < 324) {
    scoreNum = 9;
  } else if (degree > 324 && degree < 360) {
    scoreNum = 10;
  } else {
    document.getElementById('score').innerHTML =`<strong>Spin Again! </strong>`
  }
setTimeout(function() => {
  document.getElementById('score').innerHTML =`<strong>- The Winning Number: </strong> ${scoreNum} !!!`;
}, 5700);


  console.log(`Degree: ${degree}`);
}, false)
