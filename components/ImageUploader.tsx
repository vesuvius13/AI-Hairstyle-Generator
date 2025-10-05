
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  image: File | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, image }) => {
  const [isDragging, setIsDragging] = useState(false);
  const previewUrl = image ? URL.createObjectURL(image) : null;

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  };

  const onDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [onImageUpload]);

  return (
    <div className="w-full">
      <label
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        htmlFor="image-upload"
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
        ${isDragging ? 'border-purple-500 bg-purple-100/50' : 'border-gray-300 bg-gray-50/50 hover:bg-gray-100/50'}`}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="object-contain h-full w-full rounded-lg" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <UploadIcon />
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
          </div>
        )}
        <input id="image-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleFileChange(e.target.files)} />
      </label>
    </div>
  );
};
