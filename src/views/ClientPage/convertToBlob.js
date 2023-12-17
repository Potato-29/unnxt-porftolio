export const convertFileToBlob = (file) => {
  const reader = new FileReader();

  reader.onload = function () {
    // The result is a data URL representing the file content
    const dataUrl = reader.result;

    // Convert the data URL to a Blob
    const byteCharacters = atob(dataUrl.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: file.type });

    // Do something with the Blob, for example, display it in the console
    console.log(blob);
  };
};
