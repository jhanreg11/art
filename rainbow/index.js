function shiftPixels(imageData, channelIdx, x, y) {
  for (let i = channelIdx; i < imageData.data.length; i += 4) {
    // check if the pixel is red
    if (imageData.data[i] > imageData.data[i + 1] && imageData.data[i] > imageData.data[i + 2]) {
      // calculate the new position of the pixel
      const row = Math.floor(i / (imageData.width * 4));
      const col = (i / 4) % imageData.width;
      const newRow = row + y;
      const newCol = col + x;
      const newIndex = (newRow * imageData.width + newCol) * 4;
      
      // check if the new position is within the image boundaries
      if (newRow >= 0 && newRow < imageData.height && newCol >= 0 && newCol < imageData.width) {
        // shift the pixel by copying the red value to the new position
        imageData.data[newIndex] = imageData.data[i];
      }
    }
  }
  return imageData;
}

function handleShift() {
  // create a canvas element to draw the image onto
  const oldImg = document.getElementById('image')
  const img = document.createElement('img')

  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // get the image data and apply the shiftRedPixels function
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    myData = shiftPixels(imageData, 0, -5, -5);
    myData = shiftPixels(imageData, 2, 5, 5);

    context.clearRect(0, img.width,  img.height);
    context.putImageData(imageData);
    const dataUrl = canvas.toDataURL();

    // replace the image source with the modified data URL
    img.src = dataUrl;
  }

  img.src = oldImg.src;
  oldImg.width = 0;
  oldImg.height = 0;
} 

/**
 * animates a canvas to shift the rgb values at the given speed back/forth and turns the canvas black for the specified number of frames  per second.
 * @param {string} canvasId 
 * @param {[number, number]} rShift how far to shift the r channel in the x/y direction
 * @param {[number, number]} gShift how far to shift the r channel in the x/y direction
 * @param {[number, number]} bShift how far to shift the r channel in the x/y direction
 * @param {number} shiftSpeed how many pixels to move per frame back/forth
 * @param {number} flickersPerSecond how  many frames per second to turn the  canvas black
 * @return {number} animation frame id to cancel animation
 */
const flickerAndRgbShiftCanvas = (canvasId, rShift, gShift, bShift, shiftSpeed, flickersPerSecond) => { 
  
};
