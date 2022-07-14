import { RemoveBgResult, RemoveBgError, removeBackgroundFromImageUrl } from "remove.bg";


export function removeBackground(url: string, outputFile: string, success:Function, error:Function) {
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