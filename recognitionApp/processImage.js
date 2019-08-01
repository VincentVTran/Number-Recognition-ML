const jimp = require('jimp');
const fs = require("fs");

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

module.exports.processImage = processImage;