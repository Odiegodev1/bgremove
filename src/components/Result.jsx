import React, { useState } from "react";

export default function App() {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveBackground = async () => {
    if (!image) return alert("Por favor, envie uma imagem.");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image_file", document.getElementById("image-input").files[0]);
      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": "b8Z7CJLNEnDAEQHMtD8v1eCH",
        },
        body: formData,
      });
      const blob = await response.blob();
      setProcessedImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Erro ao processar a imagem:", error);
      alert("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Remover Background</h1>
      <input
        type="file"
        id="image-input"
        accept="image/*"
        className="mb-4"
        onChange={handleImageUpload}
      />
      {image && <img src={image} alt="Preview" className="w-64 h-64 object-cover mb-4" />}
      <button
        onClick={handleRemoveBackground}
        disabled={loading}
        className={`px-4 py-2 text-white font-bold rounded ${
          loading ? "bg-gray-400" : "bg-blue-500"
        }`}
      >
        {loading ? "Processando..." : "Remover Fundo"}
      </button>
      {processedImage && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Resultado:</h2>
          <img src={processedImage} alt="Processed" className="w-64 h-64 object-cover" />
          <a
            href={processedImage}
            download="imagem_sem_fundo.png"
            className="block mt-2 text-blue-500 underline"
          >
            Baixar Imagem
          </a>
        </div>
      )}
    </div>
  );
}
