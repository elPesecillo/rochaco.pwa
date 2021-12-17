import React from "react";
function Carousel({ images, noImagesText }) {
  return (
    <>
      <div className="w-full carousel rounded-box h-96 items-center">
        {images?.length === 0 && (
          <div className="text-gray-400 text-2xl text-center">
            {noImagesText}
          </div>
        )}
        {images?.length > 0 &&
          images.map((i, idx) => (
            <div
              key={idx}
              id={`item${idx}`}
              className="w-full pt-2 carousel-item rounded-lg"
            >
              <img src={i.src} alt={i.alt || `image${idx}`} className="object-contain" />
            </div>
          ))}
      </div>
      {images?.length > 0 && (
        <div className="flex justify-center w-full py-4 space-x-2">
          {images.map((i, idx) => (
            <a href={`#item${idx}`} key={idx} className="btn btn-xs btn-circle">
              {idx + 1}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default Carousel;
