import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const getImageURL = async (filePath) => {
  const storage = getStorage();
  try {
    const url = await getDownloadURL(ref(storage, filePath));
    return url;
  } catch (error) {
    console.log(error);
  }
};
