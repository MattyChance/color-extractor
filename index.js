console.log('Getting colors ... ');
console.time("color-extracting");

var ColorThief = require('color-thief');
var Color = require('color');
var convert = require('color-convert');

function getHexColors(imagePath) {
    var colorThief = new ColorThief();
    const resultRbg = colorThief.getColor('assets/' + imagePath);
    const resultPallette = colorThief.getPalette('assets/' + imagePath);

    var primaryColor = convert.rgb.hex(resultRbg);
    var eightColors = resultPallette.map(color => {
        return convert.rgb.hex(color);
    });
    
    console.log(`The primary color for SKU ${imagePath.slice(0, -6)} is: `, primaryColor);
    console.log(`The 8 primary colors for SKU ${imagePath.slice(0, -6)} are: `, eightColors);
}

getHexColors('201099F069020_1.png');
getHexColors('201381F054061_1.png');
getHexColors('201979F110005_1.png');

console.log('Time used to extract colors: ')
console.timeEnd('color-extracting');