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
            inputDim: 784, //1024
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
            activation: "softmax", //Standardizes output e^index/e^total
            useBias: true,
        });
    
        this.network.add(firstLayer);
        this.network.add(secondLayer);
        this.network.add(output);
    
        const learningRate = .4;
        const sgdOpt = tf.train.sgd(learningRate);
        const configOptimizer = {
            optimizer: sgdOpt,
            loss: 'categoricalCrossentropy', 
            //loss: 'categoricalCrossentropy', //Categorical Cross Entropy = Finds the difference between two probability distribution rather than just subtracting (Mean Square Error)
            //'categoricalCrossentropy'
        }
        this.network.compile(configOptimizer);
    }
    
    //--Method 2, Loading old network
    async loadPreviousData(filePath){
        this.network = await tf.loadLayersModel(filePath);
        const learningRate = .4;
        const sgdOpt = tf.train.sgd(learningRate);
        const configOptimizer = {
            optimizer: sgdOpt,
            //loss: tf.losses.softmaxCrossEntropy, 
            loss: 'categoricalCrossentropy', //Categorical Cross Entropy = Finds the difference between two probability distribution rather than just subtracting (Mean Square Error)
            //'categoricalCrossentropy'
        }
        this.network.compile(configOptimizer);
    }

    //Prepares data for fitting
    async prepareInput(training_set){ // training_set format [ {data: [], expected: ""} ]
        //Converting data into 2D array; Each inner array is one test case
        const whole_data = training_set;
        var x_set = [];
        var y_set = [];
        var y_list = ["0","1","2","3","4","5","6","7","8","9"];
        for(let i = 0;i<whole_data.length;i++){ //Goes through  the entire data set and stores each index into seperate test case
            var manipulatedX = whole_data[i].data.map(value => {
                if(value === 1){
                    return 0;
                }
                else {
                    return value/255; //Scaling the x value
                }
            });
            //Makes sure there are non integer values in array
            // manipulatedX.map(value => {
            //     if(value !== 1){
            //         console.log(value);
            //     }
            // });
            x_set.push(manipulatedX); //Transferring data into a 2-dimensional array 

            //Defines the output in a more formal way
            y_set.push(y_list.indexOf(whole_data[i].expected));
        }
        //Converts into tensor
        this.TensorX = tf.tensor2d(x_set);
        this.TensorY = tf.oneHot(y_set,10); //Standardizes the output data by creating a new array of 0s and 1s {Ex: [index of 3 = 3rd position of 10 items] 3 = [0,0,0,1,0,0,0,0,0,0,0]
        this.TensorX.print();
        this.TensorY.print();
        console.log(this.TensorX.shape); // [(Number of test cases),(Number of items within test case)]
        console.log(this.TensorY.shape);
    }

    async prepareInputPrediction(x_value){ // training_set format [ {data: [], expected: ""} ]
        //Converting data into 2D array; Each inner array is one test case
        const whole_data = training_set;
        var x_set = [];
        for(let i = 0;i<whole_data.length;i++){ //Goes through  the entire data set and stores each index into seperate test case
            var manipulatedX = whole_data[i].data.map(value => {
                if(value === 1){
                    return 0;
                }
                else {
                    return value/255; //Scaling the x value
                }
            });
            //Makes sure there are non integer values in array
            // manipulatedX.map(value => {
            //     if(value !== 1){
            //         console.log(value);
            //     }
            // });
            x_set.push(manipulatedX); //Transferring data into a 2-dimensional array 

            //Defines the output in a more formal way
            y_set.push(y_list.indexOf(whole_data[i].expected));
        }
        //Converts into tensor
        this.TensorX = tf.tensor2d(x_set);
        this.TensorY = tf.oneHot(y_set,10); //Standardizes the output data by creating a new array of 0s and 1s {Ex: [index of 3 = 3rd position of 10 items] 3 = [0,0,0,1,0,0,0,0,0,0,0]
        this.TensorX.print();
        this.TensorY.print();
        console.log(this.TensorX.shape); // [(Number of test cases),(Number of items within test case)]
        console.log(this.TensorY.shape);
    }

    async predictData(x,y){
        const data = [{data: x, expected: y}] //Formatting to fit processing step
        this.prepareInput(data)
        //await this.network.fit(this.TensorX,this.TensorY);
        const response = await this.network.predict(this.TensorX);
        console.log("Result Predicted: ");
        const index = response.argMax(1).dataSync()[0];
        console.log(index);
        return index;
    }

    async trainUsingSet(training_set){
        await this.prepareInput(training_set);
        const config = {
            epochs: 1000,
            validationSplit: .3, //30% of data will be used to calculate loss
            shuffle: true,
        }
        const result = await this.network.fit(this.TensorX,this.TensorY,config);
        await console.log(result);
    }
    saveModel(){
        this.network.save('file://./saved-model');
        console.log("Neural Network saved")
    }
}





module.exports.neuralNetworkInstance = new neuralNetworkInstance(); //Exporting an instance of this neural network