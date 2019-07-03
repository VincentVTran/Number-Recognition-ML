// const tf = require('@tensorflow/tfjs');

// const network = tf.sequential();
// tf.layers.dense({inputDim: 4,});
const jimp = require('jimp');
console.log("Worked");
const imagePath = 'C:/Users/jisavt5/Downloads/result.png';

jimp.read(imagePath).then(result => {
    result.grayscale;
    result.bitmap.toJSON();
    result.bitmap.data.toJSON().data.indexOf(2)
    for(let i = 0;i<result.bitmap.data.toJSON().data.length;i++){
        if(result.bitmap.data[i] !== 255){
            console.log(i);
        }
    }
});

