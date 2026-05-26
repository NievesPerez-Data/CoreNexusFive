---
title: "Fase 1: Creación de Buckets S3"
description: "Configuración del almacenamiento crudo y limpio para nuestro pipeline de datos en AWS."
pubDate: 2026-05-26
heroImage: "/blog-placeholder-1.jpg"
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght=700&display=swap" rel="stylesheet">

<section class="flex grow py-10 flex-col pb-40 justify-center items-center px-4">
  
  <h1 class="text-5xl md:text-7xl font-fugaz font-bold pt-20 pb-16 text-center max-w-4xl w-full uppercase">
    Configuración de S3
  </h1>

  <div class="w-full flex flex-col items-center space-y-16">
    
    <div class="text-block-container block-clean-relative">
      <h2 class="text-xl md:text-2xl font-fugaz font-bold mb-4 uppercase">
        1. Creación de los Buckets
      </h2>
      <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
        El almacenamiento es el primer paso. AWS S3 es el "corazón" donde residen los datos de todo nuestro proyecto. 
      </p>
      <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        Ve al servicio <strong>S3 > Create bucket</strong>. Asigna un nombre global único (ej: <code>proyecto-datos-crudo-tu-nombre</code>) en la región <code>us-east-1</code>. Deja el resto por defecto y haz clic en crear. Repite el proceso para el bucket de datos limpios.
      </p>

      <div class="side-note">
        <svg class="marker-arrow" viewBox="0 0 120 80">
          <path d="M-20,40 Q30,35 110,40" stroke="black" stroke-width="12" fill="none" stroke-linecap="round"/>
          <path d="M85,20 L112,41 L85,60" stroke="black" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="handwritten-text">Usa nombres únicos globales</span>
      </div>
    </div>

    <div class="w-full max-w-4xl space-y-6">
      <div class="text-block-container mx-auto">
        <h2 class="text-xl md:text-2xl font-fugaz font-bold mb-2 uppercase">
          Arquitectura en el viaje del Dato
        </h2>
        <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          En un pipeline profesional nunca trabajamos sobre el archivo original de Kaggle. Necesitamos separar las etapas: el <strong>Bucket Crudo</strong> recibe el CSV sucio y el <strong>Bucket Limpio</strong> recibe el output procesado por AWS Glue.
        </p>
      </div>
      
      <div class="video-wrapper-large">
        <iframe 
          src="https://www.dailymotion.com/embed/video/xa8agkq?autoplay=0&mute=1" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen 
          class="embedded-video"
        ></iframe>
      </div>
    </div>

    <div class="text-block-container block-clean-relative">
      <div class="block-card featured-card">
        <h2 class="text-lg md:text-xl font-fugaz font-bold mb-4 uppercase">
          Políticas de Seguridad Aplicadas
        </h2>
        <p class="text-base leading-relaxed text-gray-800 mb-4">
          <strong>¿Control de versiones?</strong> Lo dejamos desactivado (Disable) para evitar copias redundantes cada vez que ejecutemos nuestros scripts de Glue y ahorrar créditos del laboratorio.
        </p>
        <p class="text-base leading-relaxed text-gray-800">
          <strong>¿Acceso Público?</strong> Activamos el bloqueo total (Block all public access). Los servicios internos de AWS se comunicarán de forma segura utilizando el <code>LabRole</code> sin exponer datos a internet.
        </p>

        <div class="side-note">
          <svg class="marker-arrow" viewBox="0 0 120 80">
            <path d="M-20,40 Q30,35 110,40" stroke="black" stroke-width="12" fill="none" stroke-linecap="round"/>
            <path d="M85,20 L112,41 L85,60" stroke="black" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="handwritten-text">¡Mantén el acceso público bloqueado!</span>
        </div>
      </div>
    </div>

  </div>
</section>

<style>
  body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }

  .text-block-container {
    max-width: 450px;
    width: 100%;
    position: relative;
    box-sizing: border-box;
  }

  .block-clean-relative {
    position: relative;
  }

  .block-card {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 35px 35px;
    position: relative; 
    background-color: #ffffff;
  }

  .featured-card {
    border: 2px solid #000000 !important; 
    box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.08); 
    animation: gentle-pulse 4s infinite ease-in-out;
  }

  .video-wrapper-large {
    position: relative;
    padding-bottom: 56.25%; /* Proporción 16:9 */
    height: 0;
    overflow: hidden;
    border: 2px solid #000000;
    box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.08); 
    background-color: #000000;
    width: 100%;
  }

  .embedded-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  .side-note {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -240px; 
    width: 210px; 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    pointer-events: none;
  }

  .marker-arrow {
    width: 70px; 
    margin-left: -20px;
    overflow: visible;
  }

  .handwritten-text {
    font-family: 'Caveat', cursive;
    font-size: 34px; 
    font-weight: 700;
    color: #000000;
    line-height: 0.85;
    padding-left: 10px;
    transform: rotate(-1deg);
    display: block;
  }

  @media (max-width: 950px) {
    .side-note { 
      position: relative; 
      right: 0; 
      top: 0; 
      width: 100%; 
      margin-top: 20px;
      transform: none; 
      align-items: center;
    }
    .marker-arrow { 
      margin-left: 0; 
      transform: rotate(90deg); 
      width: 35px; 
    }
    .handwritten-text {
      text-align: center;
      padding-left: 0;
    }
  }

  @keyframes gentle-pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.012); 
      box-shadow: 14px 14px 0px rgba(0, 0, 0, 0.12); 
    }
  }
</style>
