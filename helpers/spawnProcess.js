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

module.exports = {
    execute: execute
}