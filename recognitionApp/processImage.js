const jimp = require('jimp');
const fs = require("fs");
var mnist = require('mnist');

//require("../recognitionApp/MNIST_Folder/")
var processImage = async function(imageURL) {
    const imagePath = imageURL; //Image processing
    var dataBitmap = [];
    var image= await jimp.read(imagePath);
    await image.quality(99);
    await image.invert();
    await image.resize(16,16);
    const temp_dataBitmap = await image.bitmap.data.toJSON().data; 
    var counter = 0;
    for(let i = 0;i<temp_dataBitmap.length;i++){
        //dataBitmap.push(temp_dataBitmap[i]);
        counter = i+1;
        if(counter%4 == 0){
            counter = 0;
        }
        else {
            dataBitmap.push(temp_dataBitmap[i]);
        }
    }
    for(let x =0;x<16;x++){
        dataBitmap.push(0);
    }
    await image.write("./processedImage");
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