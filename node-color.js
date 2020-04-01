console.log('Getting colors ... ');
console.time("color-extracting");

const fs = require('fs');
const IMAGE_FOLDER = './assets';

const images = [];
fs.readdirSync(IMAGE_FOLDER).map(image => images.push(image));

const ColorThief = require('color-thief');
const convert = require('color-convert');

function getHexColors() {
    const colorThief = new ColorThief();

    images.map(image => {
        const resultRbg = colorThief.getColor('assets/' + image);
        const resultPallette = colorThief.getPalette('assets/' + image);
    
        const primaryColor = convert.rgb.hex(resultRbg);
        const eightColors = resultPallette.map(color => {
            return convert.rgb.hex(color);
        });
        
        console.log(`The primary color for SKU ${image.slice(0, -6)} is: `, primaryColor);
        console.log(`The 8 primary colors for SKU ${image.slice(0, -6)} are: `, eightColors);
    })
}

getHexColors();

console.log('Time used to extract colors: ');
console.timeEnd('color-extracting');