var processImage = async function(imageURL) {
    const jimp = require('jimp');
    const imagePath = imageURL; //Image processing
    var dataBitmap = [];
    await jimp.read(imagePath).then(result => {
        result.grayscale;
        result.resize(28,28);
        dataBitmap = result.bitmap.data.toJSON().data; 
        
        //result.write('processedData.jpg'); //Saves image

        // for(let i of dataInput){
        //     if(i !== 255){
        //         console.log(i);
        //     }
        // }
    });
    return dataBitmap;
}

module.exports.processImage = processImage;