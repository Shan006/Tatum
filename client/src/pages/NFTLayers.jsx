import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable';

const NFTLayers = () => {
  const [background, setBackground] = useState('');
  const [body, setBody] = useState('');
  const [cap, setCap] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const combinedRef = useRef(null);
  const [capPosition, setCapPosition] = useState({ x: 0, y: 0 });
  const [bodyPosition, setBodyPosition] = useState({ x: 0, y: 0 });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [layerNames, setLayerNames] = useState(["background","body","cap"]);
  const [newLayerName, setNewLayerName] = useState('');

  const handleBackgroundChange = (e) => {
    setBackground(e.target.value);
  };

  const handleBodyChange = async (e) => {
    setBody(e.target.value);
  };

  const handleCapChange = (e) => {
    setCap(e.target.value);
  };

  const handleCapDrag = (e, data) => {
    setCapPosition({ x: data.x, y: data.y });
  };

  const handleBodyDrag = (e, data) => {
    setBodyPosition({ x: data.x, y: data.y });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (category && file) {
      const imageURL = URL.createObjectURL(file);

      setUploadedImages([
        ...uploadedImages,
        {
          category,
          imageURL, 
        },
      ]);

      alert("Image Uploaded Successfully")
    }
  };

  const handleExport = () => {
    if (combinedRef.current) {
      html2canvas(combinedRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'NFT.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  const handleNewLayer = () => {
    if (newLayerName.trim() !== '') {
      setLayerNames([...layerNames, newLayerName]);
      setNewLayerName('');
    }
  };

  const handleNewLayerChange = (e) => {
    setNewLayerName(e.target.value);
  };

  return (
    <div className="p-4 relative">
      <div className="mb-4">
        <label className="block mb-1">New Layer:</label>
        <input
          type="text"
          value={newLayerName}
          onChange={handleNewLayerChange}
          className="border rounded-md px-2 py-1"
          placeholder="Enter layer name"
        />
        <button onClick={handleNewLayer} className="border-2 border-black p-2 rounded-md ml-2">
          Add Layer
        </button>
      </div>
      <h1 className="text-3xl font-semibold mb-4">Layered NFT Creator</h1>
      <div className="mb-4">
        <label className="block mb-1">Select Category:</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border rounded-md px-2 py-1"
        >
          <option value="">Select</option>
          {
            layerNames.map((layerLabel)=>{
              return(
                <>
                <option value={layerLabel}>{layerLabel}</option>
                </>
              )
            })
          }
        </select>
      </div>

      <div className="mb-4">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} className='border-2 border-black p-2 rounded-md'>Upload Image</button>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Select Background:</label>
        <select
          value={background}
          onChange={handleBackgroundChange}
          className="border rounded-md px-2 py-1"
        >
          <option value="">Select</option>
          {uploadedImages
          .filter((image) => image.category === 'background')
          .map((image) => (
            <option key={image.imageURL} value={image.imageURL}>
              {image.category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Select Body:</label>
        <select
          value={body}
          onChange={handleBodyChange}
          className="border rounded-md px-2 py-1"
        >
          <option value="">Select</option>
          {uploadedImages
          .filter((image) => image.category === 'body')
          .map((image) => (
            <option key={image.imageURL} value={image.imageURL}>
              {image.category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Select Cap:</label>
        <select
          value={cap}
          onChange={handleCapChange}
          className="border rounded-md px-2 py-1"
        >
          <option value="">Select</option>
          {uploadedImages
          .filter((image) => image.category === 'cap')
          .map((image) =>
          console.log(image)
          (
            <option key={image.imageURL} value={image.imageURL}>
              {image.category}
            </option>
          ))}
        </select>
      </div>

      <div className="artwork-container relative">
        <p className="text-xl font-semibold mb-2">Preview:</p>
        <div className="layers-container h-64 w-64 relative bg-gray-100 p-4 rounded-lg" ref={combinedRef}>
          {background && (
            <img
              src={`${background}`}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          )}
          {body && (
            <Draggable
              position={bodyPosition}
              onStop={(e, data) => handleBodyDrag(e, data)}
            >
              <img
                src={`${body}`}
                alt="Body"
                className="absolute transform -translate-x-1/2 -translate-y-1/2 object-cover"
                style={{ width: '70%', height: '70%' }}
              />
            </Draggable>
          )}
          {cap && (
            <Draggable
              position={capPosition}
              onStop={(e, data) => handleCapDrag(e, data)}
            >
            <img
              src={`${cap}`}
              alt="Cap"
              className="absolute transform -translate-x-1/2 object-cover"
              style={{ width: '40%', height: '20%' }}
            />
            </Draggable>
          )}
        </div>
      </div>
      <button className="mt-4 px-4 py-2 border-2 border-black text-black rounded" onClick={handleExport}>
        Export NFT
      </button>
    </div>
  );
};

export default NFTLayers;
