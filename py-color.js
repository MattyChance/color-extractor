const execute = cmd => new Promise((resolve, reject) => {
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

async function getHexColors (imagePath) {
    try {
        let path = __dirname + '/assets/' + imagePath;
        
        await execute(`extcolors ${path} -o text`);
    } catch(e) {
        console.error(e);
    }
}


const run = async () => {
    console.log('Getting colors ... ');
    console.time("color-extracting");

    await getHexColors('201099F069020_1.png');
    await getHexColors('201381F054061_1.png');
    await getHexColors('201979F110005_1.png');

    console.log('Time used to extract colors: ');
    console.timeEnd('color-extracting');
}

run();
