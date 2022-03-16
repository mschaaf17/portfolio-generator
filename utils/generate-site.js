const { resolveObjectURL } = require('buffer');
const fs= require('fs');
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            if (err) {
                reject(err);
                //return out of the function here to make sure the promost doesnt accidently execute the resolve function as well
                return;
            }

            //if everythign went well, resolve the promise and send the successful data to the `.then()` method
            resolveObjectURL({
                ok: true,
                message: 'file created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise ((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style/css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                messagE: 'stylesheet created'
            })
        })
    })
}


module.exports = { writeFile, copyFile };

