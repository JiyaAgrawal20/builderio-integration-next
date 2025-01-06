'use client';

import React, { useState } from 'react';

interface Hotspot {
  id: number;
  x: number;
  y: number;
  label: string;
}

const AdminHotspotPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [currentHotspot, setCurrentHotspot] = useState<Hotspot | null>(null);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const imgRect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - imgRect.left) / imgRect.width) * 100;
    const y = ((event.clientY - imgRect.top) / imgRect.height) * 100;

    const existingHotspot = hotspots.find((h) => h.x === x && h.y === y);
    if (existingHotspot) {
      setCurrentHotspot(existingHotspot);
    } else {
      const newHotspot: Hotspot = {
        id: Date.now(),
        x,
        y,
        label: '',
      };
      setHotspots((prev) => [...prev, newHotspot]);
      setCurrentHotspot(newHotspot);
    }
  };

  const handleSaveHotspot = (label: string) => {
    setHotspots((prev) =>
      prev.map((h) =>
        h.id === currentHotspot?.id ? { ...h, label } : h
      )
    );
    setCurrentHotspot(null);
  };

  const handleSaveAll = () => {
    console.log('Hotspots Data:', hotspots);
  };

  return (
    <div className="p-4">
      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="mb-4 block w-full p-2 border rounded"
      />

      <button
        disabled={!previewUrl}
        className={`py-2 px-4 mb-4 bg-blue-500 text-white rounded ${!previewUrl && 'opacity-50 cursor-not-allowed'}`}
      >
        Next
      </button>

      {previewUrl && (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            onClick={handleImageClick}
            className="w-full max-w-3xl mx-auto border rounded"
          />
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              style={{
                position: 'absolute',
                top: `${hotspot.y}%`,
                left: `${hotspot.x}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="w-4 h-4 bg-black rounded-full cursor-pointer"
              onClick={() => setCurrentHotspot(hotspot)}
            ></div>
          ))}
        </div>
      )}

      {currentHotspot && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Hotspot Details</h2>
            <input
              type="text"
              placeholder="Enter a label"
              className="border w-full p-2 rounded mb-4"
              defaultValue={currentHotspot.label}
              required
              onChange={(e) =>
                setCurrentHotspot((prev) =>
                  prev ? { ...prev, label: e.target.value } : null
                )
              }
            />
            <button
              onClick={() => handleSaveHotspot(currentHotspot.label)}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setCurrentHotspot(null)}
              className="bg-red-500 text-white py-2 px-4 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {hotspots.length > 0 && (
        <div className="mt-4">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Label</th>
                <th className="border p-2">X (%)</th>
                <th className="border p-2">Y (%)</th>
              </tr>
            </thead>
            <tbody>
              {hotspots.map((hotspot) => (
                <tr key={hotspot.id}>
                  <td className="border p-2">{hotspot.label || 'N/A'}</td>
                  <td className="border p-2">{hotspot.x.toFixed(2)}</td>
                  <td className="border p-2">{hotspot.y.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSaveAll}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save All
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminHotspotPage;
