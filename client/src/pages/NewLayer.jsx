import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
// import Draggable from 'react-draggable';
import { Rnd } from 'react-rnd'; // Import Rnd from react-rnd

const NewLayer = () => {
  const [layerNames, setLayerNames] = useState(["background", "body", "cap"]);
  const [newLayerName, setNewLayerName] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentActive, setCurrentActive] = useState([]);
  const combinedRef = useRef(null);
  const initialPositions = layerNames.reduce((positions, layer) => {
    positions[layer] = { x: 0, y: 0 , width:200 , height:200 };
    return positions;
  }, {});

  const [layerPositions, setLayerPositions] = useState(initialPositions);

  const handleLayerStop = (layerName, newPosition) => {
    setLayerPositions((prevPositions) => ({
      ...prevPositions,
      [layerName]: newPosition,
    }));
  
    setCurrentActive((prevActive) => {
      return prevActive.map((active) => {
        if (active.category === layerName) {
          return {
            ...active,
            position: newPosition, // Update position in the currentActive state
          };
        }
        return active;
      });
    });
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
      setFile('');
      setCategory('');
    } else {
      alert("Please Select Both Category and File")
    }
  };

  const handleChange = (e) => {
    setCurrentActive([
      ...currentActive,
      {
        category: e.target.name,
        image: e.target.value
      }
    ]);
  }

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

  return (
    <div className="p-4 relative">
      {/* To add New Layer */}
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
      {/* To Select Category for File Upload */}
      <div className="mb-4">
        <label className="block mb-1">Select Category:</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border rounded-md px-2 py-1"
        >
          <option value="">Select</option>
          {
            layerNames.map((layerLabel) => {
              return (
                <option key={layerLabel} value={layerLabel}>{layerLabel}</option>
              )
            })
          }
        </select>
      </div>
      {/* To Upload file */}
      <div className="mb-4">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} className='border-2 border-black p-2 rounded-md'>Upload Image</button>
      </div>
      {/* To Populate all Select Boxes of Existing Layers */}
      {
        layerNames.map((layer) => {
          return (
            <div key={layer} className="mb-4">
              <label className="block mb-1">Select {layer}:</label>
              <select
                name={layer}
                onChange={handleChange}
                className="border rounded-md px-2 py-1"
              >
                <option value="">Select</option>
                {uploadedImages
                  .filter((image) => image.category === layer)
                  .map((image, index) => (
                    <option key={image.imageURL} value={image.imageURL}>
                      {image.category + " "}{index + 1}
                    </option>
                  ))}
              </select>
            </div>
          )
        })
      }

      {/* Preview To Display all Layers Integrated */}
      <div className="artwork-container relative">
        <p className="text-xl font-semibold mb-2">Preview:</p>
        <div className="layers-container h-64 w-64 relative bg-gray-100 p-4 rounded-lg" ref={combinedRef}>
          {
            layerNames.map((layer) => {
              const activeLayers = currentActive.filter((active) => active.category === layer);
              const lastActiveLayer = activeLayers[activeLayers.length - 1];

              return (
                <React.Fragment key={layer}>
                  {lastActiveLayer && (
                    <Rnd
                    size={{ width: layerPositions[layer].width, height: layerPositions[layer].height }}
                    position={{ x: layerPositions[layer].x, y: layerPositions[layer].y }}
                    onDragStop={(e, d) => handleLayerStop(layer, { x: d.x, y: d.y, width: layerPositions[layer].width, height: layerPositions[layer].height })}
                    onResizeStop={(e, direction, ref, delta, position) =>
                      handleLayerStop(layer, { x: position.x, y: position.y, width: ref.offsetWidth, height: ref.offsetHeight })
                    }
                    style={{
                      resize: 'both',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={`${lastActiveLayer.image}`}
                      alt={layer}
                      className={`absolute transform ${lastActiveLayer.category === 'background' ? 'w-96 h-96' : 'w-40 h-40'} object-cover`}
                    />
                  </Rnd>
                  )}
                </React.Fragment>
              );
            })
          }
        </div>
      </div>
      {/* To Export all Integrated Layers as one NFT */}
      <button className="mt-4 px-4 py-2 border-2 border-black text-black rounded" onClick={handleExport}>
        Export NFT
      </button>
    </div>
  );
};

export default NewLayer;
