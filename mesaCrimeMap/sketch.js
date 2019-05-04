let mapImg;
let crimeData;

// map variables
let w = 1200;
let h = 800;
let clat = 33.4152;
let clon = -111.8315;
let zoom = 12;


preload = () => {
    loadJSON('https://data.mesaaz.gov/resource/37q9-d27y.json', getData);

    mapImg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/' + clon + ',' + clat + ',' + zoom + '/' + w + 'x' + h + 
    '?access_token=pk.eyJ1Ijoia2ltY2hvbmciLCJhIjoiY2p1eWpkanV1MDYwcTQ0cGgyMW92N3JsdSJ9.ycCi6k3GpnZroP-tb5OgKQ');
}

function mercX(lon) {
    lon = radians(lon);
    let a = (256 / PI) * pow(2, zoom);
    let b = lon + PI;
    return a * b;
  }
  
  function mercY(lat) {
    lat = radians(lat);
    let a = (256 / PI) * pow(2, zoom);
    let b = tan(PI / 4 + lat / 2);
    let c = PI - log(b);
    return a * c;
  }

getData = data => {
    crimeData = data;
}

setup = () => {
    createCanvas(w, h);
    translate(width / 2, height / 2);
    imageMode(CENTER);
    image(mapImg, 0, 0);

    let cx = mercX(clon);
    let cy = mercY(clat);
    
    // draw shape per reported crime incident
    for (let i = 0; i < crimeData.length; i++) {
        let lat = crimeData[i].latitude;
        let lon = crimeData[i].longitude;
        let x = mercX(lon) - cx;
        let y = mercY(lat) - cy;
        
        let alpha = 50;

        // aggravated assault, larceny, motor vehicle theft, burglary, Forcible Rape
        if (crimeData[i].crime_type == 'Aggravated Assault') {
            colorCode = color(255, 0, 0, alpha); // red
        } else if (crimeData[i].crime_type == 'Motor Vehicle Theft') {
            colorCode = color(0, 255, 0, alpha); // green
        } else if (crimeData[i].crime_type == 'Larceny') {
            colorCode = color(255, 255, 0, alpha); // yellow
        } else if (crimeData[i].crime_type == 'Burglary') {
            colorCode = color(255, 0, 255, alpha); // pink
        } else if (crimeData[i].crime_type == 'Forcible Rape') {
            colorCode = color(0, 255, 255, alpha); // light blue
        }
         else {
            colorCode = color(255, alpha);
        }

        noStroke();
        fill(colorCode);
        square(x, y, 25);
    }

    console.log('Aggravated Assault: red\nMotor Vehicle Theft: green\nLarceny: yellow\nForcicle Rape: blue\nOther: white')



}

draw = () => {

}