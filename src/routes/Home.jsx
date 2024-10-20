import HomeItem from "../components/HomeItem";
import { useSelector } from "react-redux";
import Carousel from "../components/carousel";
import Banner from "../components/Banner";

const Home = () => {
  const items = useSelector((store) => store.items);
  const backgroundImage = "https://i.postimg.cc/WbzZcxCL/Screenshot-49.png";
  const backgroundImage2 = "https://i.postimg.cc/c120cKhv/Screenshot-50.png";

  // const bannerTag = "Featured Items :";
  return (
    <main className="home">
      <Banner backgroundImage={backgroundImage} />
      <div className="topBanner">
        <Carousel />
        <img
          src="./images/sideBanner.jpeg"
          className="sideBanner"
          alt="Image"
        ></img>
      </div>
      <Banner backgroundImage={backgroundImage2} />
      <div className="items-container">
        {items.map((item) => (
          <HomeItem key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
};

export default Home;
