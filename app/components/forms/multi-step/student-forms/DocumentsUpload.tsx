'use-client';
import { useState } from 'react';
import { useFormData } from '@/context/FormContext';
import { useForm } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { departments } from '@/app/dashboard/students/create/page';
import Dropzone from 'react-dropzone';
import styles from '@/styles/styles.module.scss';

export default function DocumentsUpload({ formStep, nextFormStep }) {
  const { setFormValues } = useFormData();
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

  const onSubmit = (values) => {
    setFormValues(values);
    // Add logic to handle the selectedFiles (e.g., upload to server)
    nextFormStep();
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

        <div className="flex justify-end">
          <button
            type="submit"
            className="right-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}
