// do pip install extcolors before running this. Use python version > 3.0
const fs = require('fs');

// const execute = require('./helpers/spawnProcess').execute;
const execute = function(cmd) {
    new Promise((resolve, reject) => {
        const exec = require('child_process').exec
        exec(cmd, (error, stdout, stderr) => {
        stdout && console.log(stdout)
        stderr && !error && console.warn(stderr)

        if (error !== null) {
          console.error(`Error executing shell command ${cmd}`, error)
          return reject(error)
        }

        resolve()
    })
  });
}

const IMAGE_FOLDER = './assets';

async function getHexColors (image) {
    try {
        let path = __dirname + '/assets/' + image;
        
        await execute(`extcolors ${path} -o text`);
    } catch(e) {
        throw e;
    }
}

const run = function() {
    console.log('Getting colors ... ');
    console.time("color-extracting");

    const images = [];
    fs.readdirSync(IMAGE_FOLDER).map(image => images.push(image));

    return new Promise((res, rej) => {
        try {
            images.map(image => getHexColors(image));
            res();
        } catch (e) {
            rej(e);
        }
    });

    console.log('Time used to extract colors: ');
    console.timeEnd('color-extracting');
}

run();
