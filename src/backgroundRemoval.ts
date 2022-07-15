import { RemoveBgResult, RemoveBgError, removeBackgroundFromImageUrl } from "remove.bg";
import FormData from "form-data";
import axios from "axios";
import * as fs from 'fs'



export function removeBackground(url: string, outputFile: string, success: Function, error: Function) {
  removeBackgroundFromImageUrl({
    url,
    apiKey: "4gjW8HEFkK9RVVj88r6GJmG9",
    size: "preview",
    type: "person",
    outputFile
  }).then((result: RemoveBgResult) => {
    success(result);
  }).catch((errors: Array<RemoveBgError>) => {
    error(errors);
  });

}

export async function removeBackgroundNeuralNetwork(fileURL: string, success: Function, error: Function) {

  const response = await axios.get(fileURL, { responseType: 'stream' }); 
  const pathFile: string = './out/temp.png'
  const pf = response.data.pipe(fs.createWriteStream(pathFile))
  pf.on('finish', async () => {

    try {
      let stream = fs.readFileSync(pathFile);
      let body = {'file':stream}
      const u2netResponse = await axios.post("http://188.166.6.141:8080/remove", body , {
      });
      let dataString: string = u2netResponse.data;

      success(dataString.replace('data:image/png;base64,', ''))

    } catch (ex) {
      console.log(ex)
      error(ex)
    }
  })
}