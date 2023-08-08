 import "./Filter.css";

 const Filter = ({ filters, setFilters }) => {
  const favoriteEnum = { favorite: true, "not favorite": false, any: "any" };
  const onChangeHandler = e => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: name === "gender" ? value : favoriteEnum[value] });
  };
  return (
    <div className="pet-filter-container">
      <div className="filter-container">
        <label htmlFor="favorite">Favorite</label>
        <select name="favorite" id="favorite" className="form-select" onChange={onChangeHandler}>
          <option value="any">Any</option>
          <option value="favorite">Favorite</option>
          <option value="not favorite">Not Favorite</option>
        </select>
      </div>
      <div className="filter-container">
        <label htmlFor="gender">Gender</label>
        <select name="gender" id="gender" className="form-select" onChange={onChangeHandler}>
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
 };

 export default Filter;
