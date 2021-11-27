import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer.js";

export default function Privacy() {
  return (
    <>
      <Navbar transparent onMenuClick={null} showMenus={false} />
      <main>
        <div className="container pt-16 pb-32 text-justify px-12">
          <h1 className="font-semibold text-3xl w-full my-8 text-center">
            Políticas y Aviso de privacidad
          </h1>
          <p className="text-xl w-full my-5 text-gray-600">
            1.- La información personal que proporciona será utilizada para
            enviarle publicidad, ofrecerle promociones e información de los
            productos y servicios que brinda Neighby.
          </p>
          <p className="text-xl w-full my-5 text-gray-600">
            2.- Datos personales. Los datos personales que se solicitan es su
            nombre y correo electrónico, mismos que serán brindados por usted
            personalmente o cuando visite los sitios de internet de Neighby y
            autorice proporcionarlos.
          </p>
          <p className="text-xl w-full my-5 text-gray-600">
            3.-Limitación al uso o divulgación de información personal. Usted
            podrá limitar en cualquier momento la información que proporciona
            mediante una solicitud que deberá ser presentada al correo
            electrónico soporte@simxsa.com.
          </p>
          <p className="text-xl w-full my-5 text-gray-600">
            4.- Control y seguridad de información personal. Mediante este aviso
            de privacidad se hace el compromiso de tomar las medidas necesarias
            para que la información proporcionada sea almacenada en forma segura
            en la base de datos.
          </p>
          <p className="text-xl w-full my-5 text-gray-600">
            5.- Del ejercicio de los derechos de acceso, rectificación,
            cancelación y oposición. Usted podrá ejercer los derechos de acceso,
            rectificación, cancelación u oposición respecto a la información que
            proporcione mediante una solicitud enviada al correo electrónico
            soporte@simxsa.com haciendo su petición con el siguiente contenido:
            I. El nombre del titular y domicilio u otro medio para comunicarle
            la respuesta a su solicitud; II. Los documentos que acrediten la
            identidad o, en su caso, la representación legal del titular; III.
            La descripción clara y precisa de los datos personales respecto de
            los que se busca ejercer alguno de los derechos antes mencionados, y
            IV. Cualquier otro elemento o documento que facilite la localización
            de los datos personales. Para mayor información sobre los
            procedimientos, requisitos y plazos para el ejercicio de los
            derechos en mención contacte al Departamento de Protección de Datos
            personales de Neighby al correo electrónico soporte@simxsa.com.
          </p>
          <p className="text-xl w-full my-5 text-gray-600">
            6.- Cambios al presente aviso de privacidad. En el supuesto de que
            el presente aviso sea actualizado, las modificaciones serán
            comunicadas a través de la página web Neighby en la sección de
            Políticas y Aviso de Privacidad, motivo por el cual le sugerimos
            visitar el sitio web periódicamente para estar enterado de las
            actualizaciones.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
