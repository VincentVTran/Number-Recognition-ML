var express = require('express')
var neuralNetwork = require('./neuralNetwork');
const imageDriver = require('./processImage');

//ExpressJS Controller
var app = express();
const port = 3000;

const networkModel = neuralNetwork.InitializingProperModel();

app.get('/testInput', function (req, res) {
    var imagePath = process.env.USERPROFILE + "/Downloads/result.png";
    imageDriver.processImage(imagePath).then(result => {
        console.log(result);
        res.send("BitMap Size: " + result.length + "\n" + "--Check Console for BitMap--");
    });
});

app.get('/testNeuralNetwork', async function (req, res) {
    //console.log(networkModel);
    visibleData = await networkModel;
    await console.log(visibleData);
    await res.send(visibleData);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


// function imageToBitMap() {
//     var imagePath = process.env.USERPROFILE + "/Downloads/result.png";
//     var originalInputSize = 0;
//     imageDriver.processImage(imagePath).then(result => {
//         originalInputSize = result.length
//         console.log(originalInputSize);
//     });
// }
