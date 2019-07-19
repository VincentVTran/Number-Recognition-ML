const tf = require('@tensorflow/tfjs-node');
const fs = require("fs");

var network;
//_____________Initializing Model___________________

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



async function InitializingProperModel(){
    const file = './saved-model';
    if(fs.existsSync(file)) {        
        await loadPreviousData('file://./saved-model/model.json');
        // await console.log(network);
        await console.log("Loaded data");
    }
    else {
        await createNeuralNetwork();
    }
    return network;
}



//network.save('file://./saved-model');

module.exports.InitializingProperModel = InitializingProperModel;