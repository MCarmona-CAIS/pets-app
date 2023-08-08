import heartFilled from "../../svgs/heartFilled.svg";
import heartOutlined from "../../svgs/heartOutlined.svg";
import "./Card.css";

const Card = ({ id, name, phone, email, image, favorite, setFavorite }) => {
  const toggleFavorite = () => setFavorite({ id, favorite: !favorite});
  
  return (
    <article className="card">
      <div className="card-header">
        <img src={image.url} alt={image.alt} className="card-img" />
        <button className="heart" onClick={toggleFavorite}>
          {
            favorite ? <img src={heartFilled} alt="filled heart" /> : <img src={heartOutlined} alt="outlined heart" />
          }
        </button>
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  );
};

export default Card;