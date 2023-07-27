import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.scss";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1>숙소 유형</h1>
        <PropertyList />
        <h1>회원님을 위한 숙소 추천</h1>
        <FeaturedProperties />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
