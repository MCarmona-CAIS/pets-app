import axios from "axios";
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";
import "./Pets.css";
import { useEffect, useState } from "react";

const Pets = () => {
  
  const [allCats, setAllCats] = useState([]);
  const [cats, setCats] = useState([]);
  const [filters, setFilters] = useState({ gender: "any", favorite: "any" });
  const setFavorite = ({ id, favorite }) => setAllCats(allCats.map(cat => cat.id === id ? { ...cat, favorite } : cat));

  const fetchCats = async () => {
    const res = await axios("http://localhost:4000/cats");
    setAllCats(res.data);
    setCats(allCats);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    let catsFiltered = [...allCats];
    if(filters.gender !== "any") {
      catsFiltered = catsFiltered.filter(({ gender }) => gender === filters.gender);
    } 
    if (filters.favorite !== "any") {
      catsFiltered = catsFiltered.filter(({ favorite }) => favorite === filters.favorite);
    } 
    setCats(catsFiltered);
  }, [filters, allCats]);

  return (
    <div className="container">
      <div className="app-container">
        <Filter filters={filters} setFilters={setFilters}/>
        <Cards cats={cats} setFavorite={setFavorite}/>
      </div>
    </div>
  );
};

export default Pets;