var buffer = require('buffer/') //https://www.npmjs.com/package/buffer
const IPFS = require('ipfs-mini');
export const ipfsHost = '159.65.232.230'
export const ipfs = new IPFS({ host: ipfsHost, port: 5001, protocol: 'http' });
function base64ArrayBuffer(arrayBuffer) {
  let base64 = '';
  const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  const bytes = new Uint8Array(arrayBuffer);
  const byteLength = bytes.byteLength;
  const byteRemainder = byteLength % 3;
  const mainLength = byteLength - byteRemainder;

  let a;
  let b;
  let c;
  let d;
  let chunk;

  // Main loop deals with bytes in chunks of 3
  for (let i = 0; i < mainLength; i += 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
    d = chunk & 63; // 63       = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder === 1) {
    chunk = bytes[mainLength];

    a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4; // 3   = 2^2 - 1

    base64 += `${encodings[a]}${encodings[b]}==`;
  } else if (byteRemainder === 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

    a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2; // 15    = 2^4 - 1

    base64 += `${encodings[a]}${encodings[b]}${encodings[c]}=`;
  }
  return base64;
}

export function upload(photo) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        console.log("ipfs")
        console.log(photo)
        reader.readAsArrayBuffer(photo); // Read Provided File
        reader.onloadend = function() {
            const fileType = photo.type;
            const prefix = `data:${fileType};base64,`;
            const buf = buffer.Buffer(reader.result);
            const base64buf = prefix + base64ArrayBuffer(buf);
            ipfs.add(base64buf, (err, result) => { // Upload buffer to IPFS
                if (err) {
                    console.error(err);
                    return result
                }
                resolve(result);
            });
        }
    });
}


export function loadimg(url) {
    return new Promise(function (resolve, reject) {
    const req = new XMLHttpRequest();
    req.responseType = "text/html";
    req.open('GET', url, true); // true = async mode
    req.send();
    req.onload = function() {
        resolve(req.response);
        }
    });
}


//
// window.upload2 = function() {
//     var buf2
//   const reader = new FileReader();
//   reader.onloadend = function() {
//     //const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
//     const buf = buffer.Buffer(reader.result) // Convert data into buffer
//     ipfs2.files.add(buf2, (err, result) => { // Upload buffer to IPFS
//       if(err) {
//         console.error(err)
//         return
//       }
//       let url = `https://ipfs.io/ipfs/${result[0].hash}`
//       console.log(`Url --> ${url}`)
//       document.getElementById("url").innerHTML= url
//       document.getElementById("url").href= url
//       document.getElementById("output").src = url
//     })
//   }
//   const photo = document.getElementById("photo");
//   reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
// }
