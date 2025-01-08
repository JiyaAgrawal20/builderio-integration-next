"use client";
import React, { useState } from "react";

interface Hotspot {
  id: number;
  x: number;
  y: number;
  label: string;
  fileName: string | null;
}

const Page = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [currentHotspot, setCurrentHotspot] = useState<Hotspot | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [showFileInput, setShowFileInput] = useState(false);
  const [isFileSaved, setIsFileSaved] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleNext = () => {
    if (inputValue.trim()) setShowFileInput(true);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSaveFile = () => {
    if (selectedFile) {
      setIsFileSaved(true);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!isFileSaved) return;

    const imgRect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - imgRect.left) / imgRect.width) * 100;
    const y = ((event.clientY - imgRect.top) / imgRect.height) * 100;

    if (x < 0 || x > 100 || y < 0 || y > 100) return;

    const newHotspot: Hotspot = {
      id: Date.now(),
      x,
      y,
      label: "",
      fileName: inputValue || null,
    };
    setCurrentHotspot(newHotspot);
  };

  const handleSaveHotspot = () => {
    if (currentHotspot && currentHotspot.label.trim()) {
      setHotspots((prev) => [...prev, currentHotspot]);
      setCurrentHotspot(null);
    }
  };

  const handleDeleteHotspot = (id: number) => {
    setHotspots((prev) => prev.filter((hotspot) => hotspot.id !== id));
  };

  const handleSaveAll = () => {
    console.log("Hotspots Data:", hotspots);
  };

  return (
    <div className="p-4">
      <input
        className="py-2 px-2 mb-3 border border-black rounded-md w-80 cursor-pointer"
        value={inputValue}
        onChange={handleInput}
        placeholder="Name"
      />
      <button
        onClick={handleNext}
        disabled={!inputValue.trim()}
        className={`py-2 px-4 ml-2 rounded ${
          inputValue.trim() ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
      >
        Next
      </button>

      {showFileInput && (
        <div>
          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="mt-4 mb-4 block w-full p-2 border rounded"
          />
          <button
            onClick={handleSaveFile}
            disabled={!selectedFile}
            className={`py-2 px-4 rounded ${
              selectedFile ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Upload image
          </button>
        </div>
      )}

      {isFileSaved && previewUrl && (
        <div className="relative mx-auto max-w-3xl border rounded mt-4">
          <img
            src={previewUrl}
            alt="Preview"
            onClick={handleImageClick}
            className="w-full h-auto rounded"
          />
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              style={{
                position: "absolute",
                top: `${hotspot.y}%`,
                left: `${hotspot.x}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="w-4 h-4 bg-red-500 rounded-full cursor-pointer"
              onClick={() => setCurrentHotspot(hotspot)}
            ></div>
          ))}

          {currentHotspot && (
            <div
              style={{
                position: "absolute",
                top: `${currentHotspot.y}%`,
                left: `${currentHotspot.x}%`,
                transform: "translate(-00%, -100%)",
              }}
              className="bg-white p-2 rounded shadow-lg border w-40"
            >
              <input
                type="text"
                placeholder="Enter a label"
                className="border w-full p-1 rounded mb-2"
                value={currentHotspot.label}
                onChange={(e) =>
                  setCurrentHotspot((prev) =>
                    prev ? { ...prev, label: e.target.value } : null
                  )
                }
              />
              <button
                onClick={handleSaveHotspot}
                disabled={!currentHotspot.label.trim()}
                className={`py-1 px-2 rounded w-full ${
                  currentHotspot.label.trim()
                    ? "bg-green-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                Save
              </button>
            </div>
          )}
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
                <th className="border p-2">File</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotspots.map((hotspot) => (
                <tr key={hotspot.id}>
                  <td className="border p-2">{hotspot.label || "N/A"}</td>
                  <td className="border p-2">{hotspot.x.toFixed(2)}</td>
                  <td className="border p-2">{hotspot.y.toFixed(2)}</td>
                  <td className="border p-2">{hotspot.fileName || "N/A"}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDeleteHotspot(hotspot.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
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

export default Page;
