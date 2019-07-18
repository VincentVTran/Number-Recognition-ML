const tf = require('@tensorflow/tfjs-node');
const fs = require("fs");
var express = require('express')
const imageDriver = require('./processImage');

var network;

function createNeuralNetwork(){
    //Creating the neural network
    network = tf.sequential();

    //____________________________Layers Creation_________________________
    const firstLayer = tf.layers.dense({
        units: 16, //Completely random number
        inputDim: 3136,
        activation: "sigmoid",
        useBias: true,
    });
    /*
    Layer 1 Description: 
        **Weight is given to each connection in a neural network

        -inputDim (Input Dimension) = 3136 input nodes
        -Each input will have a randomized weight for each neuron(unit) 1 input * 16 neurons = 16 total weights for 1 input [] 3136*16 = 50,176 total weights for input and layer 1
        -Sigmoid = Value will range from 0-1
        -Each of the 16 neuron will have an associated bias (Threshold for whether a neuron is activated)
    */

    const secondLayer = tf.layers.dense({
        units: 16, //Completely random number
        activation: "sigmoid",
        useBias: true,
    });
    /*
    Layer 2 Description: 
        - 16 (neuron from previous layer) * 16 (weight assciated with each) = 256 total weights/connections for layer1 and layer2
        -Sigmoid = Value will range from 0-1
        -Each of the 16 neuron will have an associated bias (Threshold for whether a neuron is activated)
    */

    const output = tf.layers.dense({
        units: 10, //Completely random number
        activation: "sigmoid",
        useBias: true,
    });

    network.add(firstLayer);
    network.add(secondLayer);
    network.add(output);

    const learningRate = .5;
    const sgdOpt = tf.train.sgd(learningRate);
    const configOptimizer = {
        optimizer: sgdOpt,
        loss: tf.losses.meanSquaredError, 
    }
    network.compile(configOptimizer);
}

function loadPreviousData(filePath){
    network = tf.loadLayersModel(filePath);
}

const file = './saved-model';
if(fs.existsSync(file)) {
    console.log("Loaded data");
    loadPreviousData('file://./saved-model');
}
else {
    createNeuralNetwork();
}

console.log(network);

// var imagePath = 'C:/Users/jisavt5/Downloads/result.png';
// var originalInputSize = 0;
// imageDriver.processImage(imagePath).then(result => {
//     originalInputSize = result.length
//     console.log(originalInputSize);
// });

//network.save('file://./saved-model');



//ExpressJS 
// var app = express();
// const port = 3000;

// app.get('/', function (req, res) {
//     res.send('root')
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));