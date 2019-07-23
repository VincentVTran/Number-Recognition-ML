const jimp = require('jimp');
const fs = require("fs");
var mnist = require('mnist');

//require("../recognitionApp/MNIST_Folder/")
var processImage = async function(imageURL) {
    const imagePath = imageURL; //Image processing
    var dataBitmap = [];
    await jimp.read(imagePath).then(result => {
        result.quality(99);
        result.grayscale(); //Current 255 = white / 0 = black 
        result.invert(); //Now 255 = black /  0 = white 
        result.resize(14,14);
        dataBitmap = result.bitmap.data.toJSON().data; 
        result.write("./processedImage");
        
        //result.write('processedData.jpg'); //Saves image

        // for(let i of dataInput){
        //     if(i !== 255){
        //         console .log(i);
        //     }
        // }
    });
    return dataBitmap;
}

var processMNIST = async function() {
    // 0 = White 255 = Black
    var dataSet = {
        training_set : []
    }

    var set = mnist.set(60000, 200);
    var trainingSet = set.training; //Format = [ {input: [], output[] } ]
    var testSet = set.test;

    for(let i = 0;i<trainingSet.length;i++){
        var bitMap = trainingSet[i].input.map(current => {
            return current*255;
        });
        //console.log(bitMap);
        const label = trainingSet[i].output.indexOf(1).toString(); //Converting the output to string
        const dataFormat = {data:bitMap,expected:label};

        dataSet.training_set.push(dataFormat);
    }
    console.log(dataSet.training_set);
    return dataSet;

}

module.exports.processImage = processImage;
module.exports.processMNIST = processMNIST;