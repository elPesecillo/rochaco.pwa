import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer.js";
import Image from "next/image";
import { Images } from "../constants";

export default function Leave() {
  return (
    <>
      <Navbar transparent onMenuClick={null} showMenus={false} />
      <main>
        <div className="container pt-16 pb-32 text-justify px-12">
          <h1 className="font-semibold text-3xl w-full my-12 text-center">
            Instrucciones para eliminar tus datos de usuario de la applicación
          </h1>
          <p className="text-xl w-full my-5 text-gray-600">
            1.- Inicia sesion en la app.
          </p>
          <div className="text-center">
            <Image
              src={Images.Leave01.default.src}
              width={300}
              height={600}
              className="rounded-lg"
            />
          </div>
          <p className="text-xl w-full my-5 text-gray-600">
            2.- Abre el menu principal y presiona el menu "Configuraciones".
          </p>
          <div className="text-center">
            <Image
              src={Images.Leave02.default.src}
              width={300}
              height={600}
              className="rounded-lg"
            />
          </div>
          <p className="text-xl w-full my-5 text-gray-600">
            3.- Presiona el menu "Eliminar Cuenta".
          </p>
          <div className="text-center">
            <Image
              src={Images.Leave03.default.src}
              width={300}
              height={600}
              className="rounded-lg"
            />
          </div>
          <p className="text-xl w-full my-5 text-gray-600">
            4.- Presiona el boton "Eliminar".
          </p>
          <div className="text-center">
            <Image
              src={Images.Leave04.default.src}
              width={300}
              height={600}
              className="rounded-lg"
            />
          </div>
          <p className="text-xl w-full my-5 text-gray-600">
            5.- Con estos pasos todos tus datos de usuario se eliminaran de la
            aplicación.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
