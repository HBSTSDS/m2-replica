import fs from 'fs';
import pngToIco from 'png-to-ico';

console.log("Converting image.png to favicon.ico...");
pngToIco('public/image.png')
  .then(buf => {
    fs.writeFileSync('public/favicon.ico', buf);
    console.log('Favicon generated correctly as binary.');
  })
  .catch(err => {
    console.error(err);
  });
