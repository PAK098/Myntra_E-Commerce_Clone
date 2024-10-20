import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImagesRef = useRef(null);
  const slides = useRef([]);

  // Access the items from the Redux store
  const items = useSelector((store) => store.items);

  // Filter the products that have the category "featured"
  const featuredItems = items.filter((item) =>
    item.category.includes("featured")
  );

  // Move slide function
  const moveSlide = (direction) => {
    let newSlide = currentSlide + direction;

    // Wrap around to the first slide if you reach the end
    if (newSlide >= slides.current.length) {
      newSlide = 0;
    }
    // Wrap around to the last slide if you go back from the first slide
    else if (newSlide < 0) {
      newSlide = slides.current.length - 1;
    }

    setCurrentSlide(newSlide);
  };

  useEffect(() => {
    // Set the slides once the component has mounted
    slides.current = carouselImagesRef.current.querySelectorAll("img");
  }, [featuredItems]); // Recalculate when featuredItems changes

  useEffect(() => {
    // Change the position of the slides when `currentSlide` changes
    if (carouselImagesRef.current) {
      carouselImagesRef.current.style.transform = `translateX(-${
        currentSlide * 574
      }px)`;
    }
  }, [currentSlide]);

  return (
    <div className="carousel">
      <div
        className="carousel-images"
        id="carousel-images"
        ref={carouselImagesRef}
      >
        {featuredItems.length > 0 ? (
          featuredItems.map((item, index) => (
            <img
              key={index}
              src={item.thumbnail} // Assuming the `thumbnail` contains the image URL
              alt={item.title}
              width="574"
              height="346"
            />
          ))
        ) : (
          <p>No featured items available</p>
        )}
      </div>
      <div className="carousel-buttons">
        <button className="prev" onClick={() => moveSlide(-1)}>
          &#10094;
        </button>
        <button className="next" onClick={() => moveSlide(1)}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
