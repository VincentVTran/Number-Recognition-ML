var express = require('express'); //Creates rest API
var bodyParser = require('body-parser');
var cors = require('cors');

var fs = require('fs'); //Manages file
var rimraf = require('rimraf');

var neuralNetwork = require('./neuralNetwork'); //Used for neural network
var imageDriver = require('./processImage');

//ExpressJS Controller
var app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3000;

var networkModel = neuralNetwork.neuralNetworkInstance;

var imagePath = process.env['HOME'] + "/Downloads/result.png"; //Image path
//var imagePath = process.env.USERPROFILE + "/Downloads/result.png"; //Window Compatible

//Training File global storage
var training_file = {
    training_set : []
};

//Stores data currently on canvas
var currentData = {
    data: [],
    expected: ""
}

//Loading dataset
fs.readFile('./recognitionApp/trainingData.json','utf8', (err, data) => {
    if (err){
        console.log(err);
    } else {
        training_file = JSON.parse(data);
        console.log(training_file);
        console.log("Amount of data inside of file: "+training_file.training_set.length);
    }
});

app.get('/pre-train',async function(req, res) {
    networkModel.trainUsingSet(training_file.training_set);
    res.send("Using current data to train set");
});

app.get('/predict', async function(req, res) {
    await sleep(500);
    const bitMap = await imageDriver.processImage(imagePath); //Current Bitmap
    currentData.data = bitMap;//Adding into a global variable

    fs.unlink(imagePath,(success)=> console.log("Deleted files"));  //Deleting unused image in download directory

    const result = await networkModel.predictData(bitMap);
    console.log("Result Data: " + result);
    res.send(result.toString());
});

app.post('/correct', async function(req, res) {
    const correctValue = req.body.expectedValue.toString(); //Expected Value
    currentData.expected = correctValue; //Adding into a global variable

    //console.log("Correct Value #: " + correctValue);

    training_file.training_set.push(currentData); //Adding onto trainingData JSON
    console.log(currentData);

    //Overwritting the olderfile with new set
    fs.writeFile('./recognitionApp/trainingData.json',JSON.stringify(training_file), 'utf8', (err, data) => {console.log("Worked")}); //Adds data to the JSON file
    fs.unlink(imagePath,(success)=> console.log("Deleted files"));  //Deleting unused image in download directory

    res.send("Completed prediction");
});

app.get('/save', function (req, res) {
    networkModel.saveModel();
});

app.get('/restart', async function (req, res) {
    const savedModelPath = "./saved-model";
    if(fs.existsSync(savedModelPath)){
        await rimraf(savedModelPath,(error)=> console.log("Deleted saved model"));
        network = await neuralNetwork.neuralNetworkInstance;
    }
});

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

//_________________________________Mappings for Verifying_____________________________________________________
app.get('/inputInformation', function (req, res) {
    imageDriver.processImage(imagePath).then(result => {
        //console.log(result);
        for(let i = 0;i<result.length;i++){
            console.log(result[i]);
        }
        // res.send("BitMap Size: " + result.length + "\n" + "--Check Console for BitMap--");
    });
});

app.get('/verifyNeuralNetwork', async function (req, res) {
    //console.log(networkModel);
    visibleData = await networkModel;
    await console.log(visibleData);
    await res.send(JSON.stringify(visibleData));
});

//Test to test of the same instance of the object is still being used
app.get('/testManipulationOfInstance', function (req, res) {
    //console.log(networkModel);
    console.log();
    console.log("Previous Global Variable Value: "+networkModel.testNum);
    networkModel.testNum = Math.random();
    console.log("New Global Variable Value: "+networkModel.testNum);
    res.send('Testing manipulation of class variable in console');
});

app.listen(port, () => console.log(`Neural Network listening on port ${port}!`));


// function imageToBitMap() {
//     var imagePath = process.env.USERPROFILE + "/Downloads/result.png";
//     var originalInputSize = 0;
//     imageDriver.processImage(imagePath).then(result => {
//         originalInputSize = result.length
//         console.log(originalInputSize);
//     });
// }
