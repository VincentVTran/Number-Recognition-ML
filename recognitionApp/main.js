var express = require('express')
var neuralNetwork = require('./neuralNetwork');
var fs = require('fs');
var imageDriver = require('./processImage');

//ExpressJS Controller
var app = express();
const port = 3000;

const networkModel = neuralNetwork.neuralNetworkInstance;
//var imagePath = process.env.USERPROFILE + "/Downloads/result.png"; //Window Compatible
var imagePath = process.env['HOME'] + "/Downloads/result.png"; //Mac OS

var training_file = {
    training_set : []
};

fs.readFile('./recognitionApp/trainingData.json','utf8', (err, data) => {
    if (err){
        console.log(err);
    } else {
        training_file = JSON.parse(data);
        console.log(training_file);
    }
});

app.post('/predict', async function(req, res) {
    const bitMap = await imageDriver.processImage(imagePath); //Current Bitmap
    const correctValue = req.body; //Expected Value 

    const prepData = {bitMap,correctValue}
    training_file.training_set.push(prepData);
    console.log(training_file.training_set);
    await fs.writeFile('./recognitionApp/trainingData.json',JSON.stringify(training_file), 'utf8', (err, data) => {console.log("Worked")});
    res.send();
});

app.get('/save', function (req, res) {
    networkModel.saveModel();
});

app.get('/testInput', function (req, res) {
    imageDriver.processImage(imagePath).then(result => {
        console.log(result);
        res.send("BitMap Size: " + result.length + "\n" + "--Check Console for BitMap--");
    });
});

app.get('/testNeuralNetwork', async function (req, res) {
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
