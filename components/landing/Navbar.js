import React from "react";
import { Images } from "../../constants";
import { FaBars } from "react-icons/fa";
import PropTypes from "prop-types";

function Navbar({ transparent, onMenuClick, showMenus = true }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <nav
      className={
        (transparent
          ? "top-0 absolute sticky z-50 w-full bg-primary"
          : "relative shadow-lg bg-white shadow-lg") +
        " flex flex-wrap items-center justify-between px-2"
      }
    >
      <div className="container px-2 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className={
              (transparent ? "text-white" : "text-gray-800") +
              " text-sm font-bold leading-relaxed inline-block mr-4 whitespace-nowrap uppercase"
            }
            href="/auth/Login"
          >
            <div style={{ width: "100px", height: "50px", display: "block" }}>
              <img
                src={Images.LogoWhite.default.src}
                alt="logo"
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              />
            </div>
          </a>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <FaBars className="text-white" />
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="example-navbar-warning"
        >
          {showMenus && (
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className={
                    (transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  onClick={(e) => onMenuClick("caracteristicas", e)}
                >
                  <i
                    className={
                      (transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-gray-500") +
                      " far fa-file-alt text-lg leading-lg mr-2"
                    }
                  />
                  Caracteristicas
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className={
                    (transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  onClick={(e) => onMenuClick("descargas", e)}
                >
                  <i
                    className={
                      (transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-gray-500") +
                      " far fa-file-alt text-lg leading-lg mr-2"
                    }
                  />
                  Descargas
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className={
                    (transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  onClick={(e) => onMenuClick("contactanos", e)}
                >
                  <i
                    className={
                      (transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-gray-500") +
                      " far fa-file-alt text-lg leading-lg mr-2"
                    }
                  />
                  Contactanos
                </a>
              </li>
            </ul>
          )}
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex items-center">
              <button
                className={
                  (transparent
                    ? "bg-white text-gray-800 active:bg-gray-100"
                    : "bg-pink-500 text-white active:bg-pink-600") +
                  " text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                }
                type="button"
                style={{ transition: "all .15s ease" }}
                onClick={(e) =>
                  showMenus
                    ? onMenuClick("login", e)
                    : (window.location.href = "/auth/Login")
                }
              >
                <i className="fas fa-arrow-alt-circle-down"></i> Inicia sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  transparent: PropTypes.bool,
  onMenuClick: PropTypes.func,
  showMenus: PropTypes.bool,
};

export default Navbar;
