import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const AddBeatPage = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [price, setPrice] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setError("Audio file size should not exceed 10MB.");
      setAudioFile(null);
    } else {
      setAudioFile(file);
      setError(""); // Clear any previous error
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      // Optional: 5MB for image
      setError("Image file size should not exceed 5MB.");
      setImageFile(null);
    } else {
      setImageFile(file);
      setError(""); // Clear any previous error
    }
  };

  const handleAddBeat = async (e) => {
    e.preventDefault();

    if (!audioFile || !imageFile) {
      setError("Both audio and image files are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("genre", genre);
      formData.append("artist", artist);
      formData.append("price", price);
      formData.append("audioFile", audioFile);
      formData.append("image", imageFile);

      const { data } = await axios.post(
        "https://niva-beats-backend.vercel.app/api/beats/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(data.message);
      resetForm();
      setError("");
    } catch (err) {
      console.error("Upload error:", err.message);
      setError(
        err.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const resetForm = () => {
    setTitle("");
    setGenre("");
    setArtist("");
    setPrice("");
    setAudioFile(null);
    setImageFile(null);
    setMessage(""); // Clear success message
    document.querySelector("#audio-input").value = "";
    document.querySelector("#image-input").value = "";
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Add Beat</h2>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form className="bg-gray-800 p-6 rounded-lg" onSubmit={handleAddBeat}>
          <div className="mb-4">
            <label>Title</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label>Genre</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 rounded"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label>Artist</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 rounded"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label>Price</label>
            <input
              type="number"
              className="w-full p-2 bg-gray-700 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label>Audio File</label>
            <input
              type="file"
              id="audio-input"
              className="w-full p-2 bg-gray-700 rounded"
              onChange={handleAudioChange}
              accept=".mp3,.wav"
              required
            />
          </div>
          <div className="mb-4">
            <label>Image File</label>
            <input
              type="file"
              id="image-input"
              className="w-full p-2 bg-gray-700 rounded"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>
          <button className="bg-green-600 w-full py-2 rounded">Add Beat</button>
        </form>
      </div>
    </div>
  );
};

export default AddBeatPage;
