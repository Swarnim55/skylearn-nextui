'use-client';
import { useFormData } from '@/context/FormContext';
import styles from '@/styles/styles.module.scss';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';

function fileToByteArray(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(new Uint8Array(reader.result));
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function DocumentsUpload({
  formStep,
  prevFormStep,
  nextFormStep,
}) {
  const { setFormValues, submitForm } = useFormData();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedMFiles, setSelectedMFiles] = useState([]);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: 'all' });

  const onDrop = (acceptedFiles) => {
    setSelectedFiles(acceptedFiles);
  };

  const onCancel = () => {
    setSelectedFiles([]);
  };

  const onDropMultiple = (acceptedFiles) => {
    setSelectedMFiles([...selectedMFiles, ...acceptedFiles]);
  };

  const onCancelMultiple = (index) => {
    const updatedFiles = [...selectedMFiles];
    updatedFiles.splice(index, 1);
    setSelectedMFiles(updatedFiles);
  };

  const onSubmit = async (values) => {
    const profileImageBase64 = await fileToBase64(selectedFiles[0]);
    const documentsBase64 = await Promise.all(selectedMFiles.map(fileToBase64));

    const submitVals = {
      profileImage: profileImageBase64,
      documents: documentsBase64,
    };

    setFormValues(formStep, submitVals);
    // Add logic to handle the selectedFiles (e.g., upload to server)
    submitForm();
  };

  return (
    <div className={formStep === 1 ? styles.showForm : styles.hideForm}>
      <h3 className="mb-4 text-2xl font-semibold font-medium leading-none text-gray-900 dark:text-white">
        Upload Your Documents
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div className={styles.formRow}>
            <label
              htmlFor="studentPhoto"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Upload Student Photo
            </label>
            <Dropzone onDrop={onDrop} accept="image/*">
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  {selectedFiles.length > 0 ? (
                    <img
                      src={URL.createObjectURL(selectedFiles[0])}
                      alt="Preview"
                      className="preview-image"
                      width={'100px'}
                      height={'100px'}
                    />
                  ) : (
                    <p
                      style={{
                        height: '5rem',
                        width: '20rem',
                        border: '2px dashed black',
                        backgroundColor: 'lightgray',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      Upload Image by clicking here or dropping file...
                    </p>
                  )}
                  {selectedFiles.length > 0 && (
                    <button
                      type="button"
                      onClick={onCancel}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <div className={styles.formRow}>
            {/* Multiple Pictures Dropzone */}
            <label
              htmlFor="multiplePhotos"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Upload Multiple Photos
            </label>
            <Dropzone onDrop={onDropMultiple} accept="image/*">
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} id="multiplePhotos" />
                  {selectedMFiles.map((file, index) => (
                    <div key={index} className="multiple-preview">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="preview-image"
                        width={'100px'}
                        height={'100px'}
                      />
                      <button
                        type="button"
                        onClick={() => onCancelMultiple(index)}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                  {selectedMFiles.length === 0 && (
                    <p
                      style={{
                        height: '5rem',
                        width: '20rem',
                        border: '2px dashed black',
                        backgroundColor: 'lightgray',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      Upload Images by clicking here or dropping files...
                    </p>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        </div>

        <div className="flex justify-between ">
          <button
            type="button"
            className="right-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => prevFormStep()}
          >
            Prev Step: Admission Details
          </button>
          <button
            type="submit"
            className="right-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            // onClick={() => nextFormStep()}
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}
