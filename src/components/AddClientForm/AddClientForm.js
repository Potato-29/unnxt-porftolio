import React, { useEffect, useState } from "react";
import { firestore, storage } from "../../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../helpers/toastOptions";

const AddClientForm = () => {
  const [clientName, setClientName] = useState("");
  const [clientFiles, setClientFiles] = useState([]);
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [fileInfo, setFileInfo] = useState();
  const clientList = useSelector((state) => state.clientList.value);
  const [assets, setAssets] = useState([
    {
      assetId: 1,
      fileUrl: null,
    },
  ]);

  const resetStates = () => {
    setClientName("");
    setMainImageUrl("");
    setClientFiles([]);
    setAssets([
      {
        assetId: 1,
        fileUrl: null,
      },
    ]);
  };

  const AddAssetInput = (assetObj) => {
    let newAsset = { ...assetObj };
    setAssets([...assets, newAsset]);
  };

  const RemoveAssetInput = (event) => {
    let itemToRemove = parseInt(event.id);
    const newArray = [
      ...assets.slice(0, itemToRemove),
      ...assets.slice(itemToRemove + 1),
    ];

    setAssets(newArray);
  };

  const setFile = (event) => {
    let file = event.files[0];
    let fileName = event.files[0].name;
    let filePath = `assets/${clientName}/${fileName}`;
    let fileUrl = process.env.REACT_APP_STORAGE_BASE_URL;
    fileUrl = fileUrl?.replace("[fileName]", encodeURIComponent(filePath));

    let newFile = {
      file: file,
      fileName: fileName,
      filePath: filePath,
      fileUrl: fileUrl,
      fileOrderId: event.id,
    };

    setClientFiles([...clientFiles, newFile]);
  };

  const uploadFile = async (fileObj) => {
    let file = fileObj.file;
    let fileName = fileObj.fileName;
    let filePath = fileObj.filePath;
    let fileUrl = process.env.REACT_APP_STORAGE_BASE_URL;

    const storageRef = ref(storage, filePath);

    let imageUrl = await uploadBytes(storageRef, file).then((snapshot) => {
      //add a toastify here
      fileUrl = fileUrl?.replace("[fileName]", encodeURIComponent(filePath));
      return fileUrl;
    });

    return imageUrl;
  };

  const AddClient = async () => {
    let finalArray = [];

    if (clientName !== "" && mainImageUrl !== "") {
      clientFiles.map((file) => {
        uploadFile(file);
        finalArray.push({
          fileUrl: file.fileUrl,
          fileOrderId: parseInt(file.fileOrderId) + 1,
        });
      });

      await addDoc(collection(firestore, "sidebar-menus", `1`, "clientList"), {
        clientName: clientName,
        clientId: clientList.length + 1,
        clientPic: mainImageUrl,
      })
        .then((result) => {
          updateClientData(result, finalArray);
        })
        .catch((error) => {
          toast.error("Error occurred!", toastOptions);
          resetStates();
        });
    } else {
      resetStates();
      toast.error("Please fill all the fields", toastOptions);
    }
  };

  const updateClientData = async (result, finalArray) => {
    await updateDoc(result, {
      clientData: finalArray,
    })
      .then((updateResult) => {
        toast.success("Client added", toastOptions);
        resetStates();
        window.location.reload();
      })
      .catch((updateErr) => {
        toast.error("Error occurred!", toastOptions);
        resetStates();
      });
  };

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <ToastContainer />
      <div className="w-full px-2">
        <input
          type="text"
          className="w-1/3 rounded-md border border-gray-500 bg-transparent my-1 px-2 py-1 outline-none transition-all
          duration-200 focus:border-gray-700 focus:scale-105"
          placeholder="Client Name *"
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="mx-1 py-1">
          Carousel Image <span className="text-red-500">*</span>
        </label>
        <input
          disabled={clientName !== "" ? false : true}
          onChange={async (e) => {
            setFile(e.target);
            let url = await uploadFile({
              file: e.target.files[0],
              fileName: e.target.files[0].name,
              filePath: `${clientName.toLowerCase()}`,
            });
            setMainImageUrl(url);
          }}
          type="file"
          className="border border-gray-500 w-1/3 rounded-md px-2 mx-1 py-1"
          placeholder="Header Image"
        />
      </div>
      <div className="flex flex-col w-1/3 mt-2">
        <label className="mx-1 py-1">Client Assets</label>
        {assets.map((item, index) => (
          <div className="w-full flex flex-col" key={`asset-input-${index}`}>
            <div className="">
              <input
                type="file"
                id={index}
                onChange={(e) => setFile(e.target)}
                className="border border-gray-500 rounded-md px-2 mx-1 my-2 py-1"
                placeholder="Header Image"
              />
              <button
                id={index}
                onClick={(e) => RemoveAssetInput(e.target)}
                className="transition-all duration-200 border rounded-md border-red-500 my-1 py-1 px-3 hover:bg-red-200"
              >
                Remove
              </button>
            </div>
            {index === assets.length - 1 && (
              <button
                className="transition-all duration-200 border rounded-full border-gray-500 my-2 py-1 px-3 hover:bg-slate-200"
                onClick={() =>
                  AddAssetInput({
                    assetId: index === 0 ? 2 : index + 2,
                  })
                }
              >
                Add Asset
              </button>
            )}
          </div>
        ))}

        <div className="w-full">
          <button
            disabled={clientName !== "" && mainImageUrl !== "" ? false : true}
            onClick={() => AddClient()}
            className="w-full transition-all duration-200 border rounded-full border-green-500
            my-2 py-1 px-3 bg-green-200 disabled:bg-gray-200 disabled:border-gray-500"
          >
            {clientName !== "" && mainImageUrl !== ""
              ? "Add Client"
              : "Fill necessary details!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClientForm;
