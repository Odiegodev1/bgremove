import React, { useState } from 'react';
import { FaArrowCircleDown, FaDownload } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaUpload } from "react-icons/fa6";
import Navbar from './Navbar';
import axios from 'axios';
import Remove from '../assets/Remove.png';
import Imger from '../assets/Img.png';
import Profile from '../assets/profile1.png';
import Profile1 from '../assets/profile.png';
import Imge from '../assets/Img2.png';
import { ClipLoader } from 'react-spinners';

function Hero() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  
  const [clipValue, setClipValue] = useState(67);

  const handleSliderChange = (event) => {
    setClipValue(event.target.value);
  };// Estado para a cor do fundo

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setLoading(true);

      const formData = new FormData();
      formData.append('image_file', file);

      try {
        const response = await axios.post(
          'https://api.remove.bg/v1.0/removebg',
          formData,
          {
            headers: {
              'X-Api-Key': 'b8Z7CJLNEnDAEQHMtD8v1eCH', // Substitua pela sua chave de API
            },
            responseType: 'blob',
          }
        );
        const resultUrl = URL.createObjectURL(response.data);
        setProcessedImage(resultUrl);
        // Chama a função de download automático
        setTimeout(() => {
          downloadImage(resultUrl);
        }, 2000); // Aguarda 2 segundos para garantir que a imagem tenha sido carregada
      } catch (error) {
        console.error('Erro ao remover o fundo:', error);
        alert('Ocorreu um erro ao processar a imagem.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Função para alterar a cor de fundo
 

  // Função para realizar o download automático
  const downloadImage = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'imagem-processada.png';
    link.click();
  };

  // Função para adicionar um fundo colorido à imagem processada
  

  return (
    <section className="px-4 py-8 lg:px-[230px] lg:py-[20px]">
  <Navbar />
  <div className="flex flex-col lg:flex-row items-center justify-between mb-20">
    <div className="w-full lg:w-[50%] mb-10 lg:mb-0">
      <h1 className="text-4xl lg:text-6xl font-bold text-zinc-600 mb-5 lg:mb-10">
        Remova o{' '}
        <span className="bg-gradient-to-r from-gray-500 via-gray-400 to-gray-600 bg-clip-text text-transparent">
          fundo
        </span>{' '}
        das imagens gratuitamente.
      </h1>
      <p className="text-lg lg:text-2xl text-zinc-600 font-normal mb-4">
        Lorem Ipsum é simplesmente um texto modelo da indústria tipográfica e de impressão. Lorem Ipsum tem sido o texto modelo padrão da indústria desde sempre.
      </p>

      <div className="mb-4 flex flex-col items-center">
        <label
          htmlFor="image-input"
          className="hover:bg-zinc-500 duration-1000 hover:text-lg cursor-pointer bg-gradient-to-r from-gray-500 via-gray-400 to-gray-600 w-full flex items-center justify-center text-white text-3xl font-bold p-2 rounded-2xl"
        >
          Upload de Arquivo
        </label>
        <input
          type="file"
          id="image-input"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center my-4">
          <ClipLoader color="#4A90E2" size={50} />
          <p className="ml-4 text-lg text-blue-500">Processando imagem...</p>
        </div>
      )}
    </div>
    <div className="w-full lg:w-[50%]">
      <img src={Remove} alt="Imagem de exemplo" />
    </div>
  </div>

  <main className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-between items-center mt-20 mb-40">
    {selectedImage && !loading && (
      <div className="mb-4">
        <p className="text-lg text-gray-600">Imagem Original:</p>
        <img
          src={selectedImage}
          alt="Imagem Original"
          className="w-full max-w-md rounded-md border border-gray-300"
        />
      </div>
    )}
    {processedImage && !loading && (
      <div>
        <p className="text-lg text-gray-600">Imagem Processada:</p>
        <img
          src={processedImage}
          alt="Imagem sem fundo"
          className="w-full max-w-md rounded-md border border-gray-300"
        />
      </div>
    )}
  </main>

  <main className="flex flex-col items-center justify-center mb-40">
    <h1 className="text-4xl lg:text-6xl font-bold text-zinc-600 mb-10">Etapas para remover imagem de fundo em segundos</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
      {/* Card de Carregar Imagem */}
      <div className="p-5 rounded-2xl bg-zinc-800 shadow-xl shadow-slate-800 hover:scale-110 duration-1000">
        <FaUpload className="text-5xl text-white mb-2" />
        <h1 className="text-2xl font-bold text-white mb-2">Carregar imagem</h1>
        <p className="text-zinc-300 font-normal">
          Este é um texto de demonstração, substituirei mais tarde. Este é um demo..
        </p>
      </div>

      {/* Card de Remover Fundo */}
      <div className="p-5 rounded-2xl bg-zinc-800 shadow-xl shadow-slate-800 hover:scale-110 duration-1000">
        <IoIosRemoveCircle className="text-5xl text-white mb-2" />
        <h1 className="text-2xl font-bold text-white mb-2">Remover fundo</h1>
        <p className="text-zinc-300 font-normal">
          Este é um texto de demonstração, substituirei mais tarde. Este é um demo..
        </p>
      </div>

      {/* Card de Baixar Imagem */}
      <div className="p-5 rounded-2xl bg-zinc-800 shadow-xl shadow-slate-800 hover:scale-110 duration-1000">
        <FaDownload className="text-5xl text-white mb-2" />
        <h1 className="text-2xl font-bold text-white mb-2">Baixar imagem</h1>
        <p className="text-zinc-300 font-normal">
          Este é um texto de demonstração, substituirei mais tarde. Este é um demo..
        </p>
      </div>
    </div>
  </main>

  <main className="mt-20">
    <div className="flex items-center justify-center flex-col mb-20">
      <h1 className="w-[90%] lg:w-[50%] text-center text-4xl lg:text-6xl font-bold text-zinc-600 mb-40">
        Remova o fundo com alta qualidade e precisão
      </h1>
      <div className="relative w-full max-w-3xl overflow-hidden m-auto rounded-xl">
        <img
          src={Imger}
          alt="Imagem com fundo"
          className="w-full h-full"
          style={{ clipPath: `inset(0px ${100 - clipValue}% 0px 0px)` }}
        />
        <img
          className="absolute top-0 left-0 w-full h-full"
          src={Imge}
          alt="Imagem processada"
          style={{ clipPath: `inset(0px 0px 0px ${clipValue}%)` }}
        />
        <input
          className="bg-slate-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10"
          type="range"
          min="0"
          max="100"
          value={clipValue}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  </main>

  <main className="flex flex-col items-center justify-center mb-40">
    <h1 className="text-4xl lg:text-6xl font-bold text-zinc-600 mb-10">Depoimento de Clientes</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 mt-20">
      {/* Card de Carregar Imagem */}
      <div className="p-5 rounded-2xl bg-zinc-800 shadow-xl shadow-slate-800 hover:scale-110 duration-1000">
        
        <h1 className="text-4xl font-bold text-white mb-2">"</h1>
        <p className="text-zinc-300 text-xl font-normal">
        Uso o bg.removal há quase dois anos, principalmente para o Instagram, e ele tem sido incrivelmente fácil de usar, facilitando muito meu trabalho.
        </p>
        <div className='flex items-center mt-5'>
          <img src={Profile} alt="" className='w-20 h-20 rounded-full' />
          <div className='ml-5'>
            <h1 className='text-2xl font-bold text-white'>Gustavo mioto</h1>
            <p className='text-zinc-500 font-normal'>Estudante</p>
          </div>
        </div>
      </div>

      {/* Card de Remover Fundo */}
      <div className="p-5 rounded-2xl bg-zinc-800 shadow-xl shadow-slate-800 hover:scale-110 duration-1000">
        
        <h1 className="text-4xl font-bold text-white mb-2">"</h1>
        <p className="text-zinc-300 text-xl font-normal">
        Uso o bg.removal há quase dois anos, principalmente para o Instagram, e ele tem sido incrivelmente fácil de usar, facilitando muito meu trabalho.
        </p>
        <div className='flex items-center mt-5'>
          <img src={Profile} alt="" className='w-20 h-20 rounded-full' />
          <div className='ml-5'>
            <h1 className='text-2xl font-bold text-white'>Gustavo mioto</h1>
            <p className='text-zinc-500 font-normal'>Estudante</p>
          </div>
        </div>
      </div>

      
     
    </div>
  </main>

  

  <footer className="bg-zinc-800 text-white py-8 mt-20">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
        <div className="text-3xl font-bold">
          <span className="text-gradient">Bg Removal</span>
        </div>
        <div className="flex space-x-8 mt-4 lg:mt-0">
          <a href="#home" className="hover:text-blue-400">Home</a>
          <a href="#about" className="hover:text-blue-400">Sobre</a>
          <a href="#contact" className="hover:text-blue-400">Contato</a>
        </div>
      </div>
    </div>
  </footer>
</section>

  );
}

export default Hero;
