const tf = require('@tensorflow/tfjs-node');
const fs = require("fs");

class neuralNetworkInstance {
    //private Network network;

    constructor(){
        this.InitializingProperModel();
        this.testNum = 4;
    }

    //Checks to see if a new network needs to be created
    async InitializingProperModel(){
        const file = './saved-model';
        if(fs.existsSync(file)) {        
            await this.loadPreviousData('file://./saved-model/model.json');
            // await console.log(network);
            await console.log("Loaded data");
        }
        else {
            await this.createNeuralNetwork();
            await console.log("Created new data");
        }
    }

    //____________Two Different Initializing Methods______________
    //--Method 1, Creating fresh neural network
    createNeuralNetwork(){
        this.network = tf.sequential();
    
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
    
        this.network.add(firstLayer);
        this.network.add(secondLayer);
        this.network.add(output);
    
        const learningRate = .5;
        const sgdOpt = tf.train.sgd(learningRate);
        const configOptimizer = {
            optimizer: sgdOpt,
            loss: tf.losses.meanSquaredError, 
        }
        this.network.compile(configOptimizer);
    }
    
    //--Method 2, Loading old network
    loadPreviousData(filePath){
        this.network = tf.loadLayersModel(filePath);
    }

    async trainData(x,y){
        const response = await this.network.fit(x,y);
        await console.log(response.history.loss[0]);
    }

    saveModel(){
        this.network.save('file://./saved-model');
        console.log("Neural Network saved")
    }
}





module.exports.neuralNetworkInstance = new neuralNetworkInstance(); //Exporting an instance of this neural network