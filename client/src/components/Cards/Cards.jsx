import Card from "../Card/Card";
import "./Cards.css";

const Cards = ({ cats, setFavorite }) => {
  return (
    <div className="pet-cards-container">
      {cats.map(cat => <Card key={cat.id} setFavorite={setFavorite} {...cat}/>)}
    </div>
  );
};

export default Cards;