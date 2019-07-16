var processImage = async function(imageURL) {
    const jimp = require('jimp');
    const imagePath = imageURL; //Image processing
    var dataInput = [];
    jimp.read(imagePath).then(result => {
        result.grayscale;
        result.quality(30);
        result.resize(100,100);
        dataInput = result.bitmap.data.toJSON().data;
        for(let i of dataInput){
            if(i !== 255){
                console.log(i);
            }
        }
    });
    return dataInput
}

module.exports.processImage = processImage;