import fs from 'fs'; 

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const gcpApiUrl = 'https://vision.googleapis.com/v1/images:annotate?'
const GCP_API_KEY = process.env.GCP_API_KEY;

async function getGcpOptions(imageUrl : any) {
  try {
    var imageData = b64req(imageUrl);
  } catch(error) {
    console.log("Error in getGcpOptions with imageUrl:", imageUrl);
    console.log(error);
    return;
  }
  return {
    method: 'POST',
    uri: gcpApiUrl + 'key=' + GCP_API_KEY,
    body: {
      "requests":[
        {
          "image":{
            content: imageData
          },
          "features":[
            {
              "type":"WEB_DETECTION",
              "maxResults":1
            }
          ]
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  }
}

// function to encode file data to base64 encoded string
function b64req(file : any) {
  // read binary data
  let image = fs.readFileSync(__dirname + '/../' + file);
  // convert binary data to base64 encoded string
  return Buffer.from(image).toString('base64');
}

export default getGcpOptions; 