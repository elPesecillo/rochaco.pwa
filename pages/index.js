import React, { useRef } from "react";

import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer.js";
import Image from "next/image";
import { Images } from "../constants";
import {
  FaFingerprint,
  FaQrcode,
  FaMoneyBillWave,
  FaUsersCog,
  FaDownload,
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import { getMobileOperatingSystem } from "../utils/commons";

export default function Landing() {
  const characteristicsRef = useRef(null);
  const downloadsRef = useRef(null);
  const contactRef = useRef(null);

  const handleRedirectToStore = () => {
    const os = getMobileOperatingSystem();
    console.log(os);
    if (os === "ios") {
      window;
      window.open(
        "https://apps.apple.com/us/app/neighbyapp/id1558283976",
        "_blank"
      );
    } else {
      window.open(
        "https://play.google.com/store/apps/details?id=com.elpes.NeighbyApp",
        "_blank"
      );
    }
  };

  const handleMenuClick = (item, e) => {
    e.preventDefault();
    switch (item) {
      case "caracteristicas":
        characteristicsRef.current.scrollIntoView({
          behavior: "smooth",
        });
        break;
      case "descargas":
        downloadsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "contactanos":
        contactRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "login":
        window.location.href = "/auth/Login";
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Navbar transparent onMenuClick={handleMenuClick} />
      <main>
        <div
          className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            minHeight: "75vh",
          }}
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(${Images.BgPattern?.default?.src})`,
              backgroundRepeat: "repeat",
              backgroundSize: "50px 100px",
            }}
            // style={{
            //   backgroundImage:
            //     "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            // }}
            // style={{
            //   backgroundImage: `url(${Images.Brochure?.default?.src})`,
            // }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-primary"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Neighby se encarga de tu seguridad y la de los que más
                    quieres.
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    Neighby es tu plataforma digital con la que podrás
                    administrar la seguridad de tu desarrollo habitacional desde
                    tu dispositivo móvil.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-gray-300 -mt-24" ref={characteristicsRef}>
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <FaQrcode size={30} />
                    </div>
                    <h6 className="text-xl font-semibold">
                      Control de accesos
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Simplifica y automatiza el control de accesos a tu
                      fraccionamiento fácilmente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                      <FaFingerprint size={30} />
                    </div>
                    <h6 className="text-xl font-semibold">
                      Registro de Visitas
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Los vecinos podrán registrar sus visitas o servicios de
                      manera sencilla y recibir notificaciones pertinentes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                      <FaMoneyBillWave size={30} />
                    </div>
                    <h6 className="text-xl font-semibold">
                      Administra el Fraccionamiento
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Administra los pagos de mantenimiento en un solo lugar.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto text-center">
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                  <FaUsersCog size={40} />
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Funciones principales del sistema
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                  · Controla las entradas y salidas de tu fraccionamiento.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  · Autoriza la entrada de tus visitas desde tu dispositivo
                  móvil.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  · Controla las actividades de tus guardias de seguridad.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  · Administra la entrada de los servicios de transporte y
                  repartirdores.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  · Control de tus proveedores o trabajadores cuando necesites
                  servicios en casa.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  · Acceso propio al fraccionamiento con códigos de seguridad
                  rotativos.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  · Administra los pagos de mantenimiento del fraccionamiento.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  · Automatiza las barreras vehiculares.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  · Encuestas privadas.
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-primary">
                  <Image
                    alt="neighby login"
                    src={Images.LoginApple?.default?.src}
                    width={300}
                    height={650}
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block"
                      style={{
                        height: "95px",
                        top: "-94px",
                      }}
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-primary fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">Neighby</h4>
                    <p className="text-md font-light mt-2 text-white">
                      Es el ambiente digital que te permite administrar la
                      seguridad de tu fraccionamiento desde tu dispositivo
                      móvil.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20" ref={downloadsRef}>
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4 bg-primary rounded-lg">
                <img
                  alt="neighby login"
                  src={Images.LoginApple?.default?.src}
                  className="max-w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <div className="md:pr-12 text-center">
                  <div className="text-primary p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blue-100">
                    <FaDownload size={40} />
                  </div>
                  <h3 className="text-3xl font-semibold">Descargas</h3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    ¡Descarga la app es muy fácil!
                  </p>
                  <div
                    className="my-3 cursor-pointer"
                    onClick={handleRedirectToStore}
                  >
                    <img
                      alt="app_store"
                      src={Images.AppStores.default.src}
                      className="rounded-lg shadow-sm hover:shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="pt-20 pb-48 bg-gray-700"
          // style={{
          //   backgroundImage: `url(${Images.Brochure?.default?.src})`,
          //   backgroundSize: "cover"
          // }}
          ref={contactRef}
        >
          <div className="container mx-auto px-4 filter blur-none">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl text-white font-semibold">
                  Contactanos
                </h2>
                <p className="text-lg leading-relaxed m-4 text-gray-200">
                  ¿Te interesa conocer más?
                </p>
                <p className="text-md leading-relaxed m-4 text-gray-300">
                  Contactanos por medio de nuestras redes sociales
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              <a
                href="https://wa.me/5218116120630"
                target="_blank"
                className="relative flex flex-col min-w-0 break-words bg-white lg:w-3/12 m-8 shadow-lg rounded-lg cursor-pointer text-center"
              >
                <div className="px-4 py-5 flex-auto hover:shadow-inner">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-green-400">
                    <FaWhatsapp size={66} />
                  </div>
                  <h6 className="text-xl font-semibold text-gray-500">
                    Whatsapp
                  </h6>
                </div>
              </a>
              <a
                href="https://www.facebook.com/TheNeighbyApp"
                target="_blank"
                className="relative flex flex-col min-w-0 break-words bg-white lg:w-3/12 m-8 shadow-lg rounded-lg cursor-pointer text-center"
              >
                <div className="px-4 py-5 flex-auto hover:shadow-inner">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-blue-600">
                    <FaFacebookF size={65} />
                  </div>
                  <h6 className="text-xl font-semibold text-gray-500">
                    Facebook
                  </h6>
                </div>
              </a>
              <a
                href="https://twitter.com/NeighbyA"
                target="_blank"
                className="relative flex flex-col min-w-0 break-words bg-white lg:w-3/12 m-8 shadow-lg rounded-lg cursor-pointer text-center"
              >
                <div className="px-4 py-5 flex-auto hover:shadow-inner">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-blue-400">
                    <FaTwitter size={70} />
                  </div>
                  <h6 className="text-xl font-semibold text-gray-500">
                    Twitter
                  </h6>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}