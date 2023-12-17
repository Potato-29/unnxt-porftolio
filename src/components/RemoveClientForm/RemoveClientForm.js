import React from "react";
import { useSelector } from "react-redux";

const RemoveClientForm = () => {
  const clientList = useSelector((state) => state.clientList.value);
  return (
    <div className="w-full h-full flex flex-col justify-center">
      {clientList.map((client, index) => (
        <div key={`client-${index}`}>{client.clientName}</div>
      ))}
    </div>
  );
};

export default RemoveClientForm;
