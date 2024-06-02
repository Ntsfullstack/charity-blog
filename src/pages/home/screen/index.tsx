import Card from "../../../components/card/Card";
import Catalog from "../../../components/catalog/catalog";
import HomeLayout from "../../../layout/HomeLayout";
import './style.scss'; // Import the SCSS file

const Homepage = () => {
  return (
    <HomeLayout>
      <div className="homepage container">
        <div className="search-box">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">Search</button>
        </div>
        <h1 className="welcome-message">Welcome to the Homepage</h1>
        <p className="quote">
          "Engaging in charity work is not just about sharing material goods; it's about spreading love and hope. Every step taken to reach those in need and every gift given carries with it joy and warmth. By helping others, we not only improve their lives but also enrich our own souls. Let's come together to sow the seeds of compassion, making the world a better place day by day."
        </p>
        <div className="catalog-and-card">
          <div className="Catalog">
            <Catalog/>
          </div>
          <div className="ListCard">
            <Card />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Homepage;
