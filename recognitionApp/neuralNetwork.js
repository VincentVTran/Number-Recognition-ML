const tf = require('@tensorflow/tfjs');
var express = require('express')
const imageDriver = require('./processImage');


var imagePath = 'C:/Users/jisavt5/Downloads/result.png';
var originalInputSize = 0;
imageDriver.processImage(imagePath).then(result => {
    originalInputSize = result.length
    console.log(originalInputSize);
});

//Creating the neural network

const network = tf.sequential();

const firstLayer = tf.layers.dense({
    units: 16, //Completely random number
    inputDim: [3136],
    activation: "sigmoid",
});

network.add(firstLayer);

//ExpressJS 
// var app = express();
// const port = 3000;

// app.get('/', function (req, res) {
//     res.send('root')
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));