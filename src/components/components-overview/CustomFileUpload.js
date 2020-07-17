import React, { useState } from "react";
import { FormFeedback } from "shards-react";

const CustomFileUpload = ({ type, handleFileChange, handleBlur, invalid }) => {
  const [fileName, setFileName] = useState({
    upload: false,
    fileName: "",
  });

  const setFile = (e) => {
    setFileName({
      ...fileName,
      upload: true,
      fileName: e.target.files[0].name,
    });
  };

  return (
    <div className='custom-file mb-3'>
      <input
        type='file'
        className={`custom-file-input ${invalid ? "is-invalid" : ""}`}
        accept={type === "image" ? "image/*" : "files"}
        onBlur={handleBlur}
        onChange={(e) => {
          setFile(e);
          handleFileChange(e);
        }}
        id='imgSrc'
      />
      <label className='custom-file-label' htmlFor='customFile2'>
        {type === "image" && !fileName.upload
          ? "Upload Image"
          : type === "image" && fileName.upload && fileName.fileName
          ? fileName.fileName
          : "Choose file..."}
      </label>
      {invalid && (
        <FormFeedback className='mb-3'>
          Please upload a featured image
        </FormFeedback>
      )}
    </div>
  );
};

export default CustomFileUpload;
