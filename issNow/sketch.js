

var mapimg;
let issData;
let x;
let y;

// center latitude and center longitude
var clat = 0;
var clon = 0;

// width and height
var ww = 1024;
var hh = 512;

var zoom = 1;

getData = data => {
  issData = data;
}

// load map of the world
function preload() {
  loadJSON('http://api.open-notify.org/iss-now.json', getData);

  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/light-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');
}

/* convert web mercator to coordinates */
// longitude to x coordinate
function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

// latitude to y coordinate
function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
}

function draw() {
  setInterval(() => {
    loadJSON('http://api.open-notify.org/iss-now.json', getData)
    console.log('latitude: ' + lat + '\nlongitude:' + lon);
  }, 1000);

  lat = issData.iss_position.latitude;
  lon = issData.iss_position.longitude;

  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  var cx = mercX(clon);
  var cy = mercY(clat);

  x = mercX(lon) - cx;
  y = mercY(lat) - cy;

  // This addition fixes the case where the longitude is non-zero and
  // points can go off the screen.
  if (x < - width / 2) {
    x += width;
  } else if (x > width / 2) {
    x -= width;
  }

  noStroke();
  fill(255, 0, 0, 150);
  ellipse(x, y, 10, 10);
}