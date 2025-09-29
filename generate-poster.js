const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

// Cambia estos nombres por el video y poster que quieras generar
const inputVideo = path.join(__dirname, 'public/video-proyect/tuvideo.mp4');
const outputImage = path.join(__dirname, 'public/video-proyect/tuvideo-poster.jpg');

ffmpeg(inputVideo)
  .screenshots({
    timestamps: ['2'], // segundo 2
    filename: path.basename(outputImage),
    folder: path.dirname(outputImage),
    size: '540x960' // formato vertical
  })
  .on('end', () => {
    console.log('Poster generado:', outputImage);
  })
  .on('error', (err) => {
    console.error('Error:', err);
  });
