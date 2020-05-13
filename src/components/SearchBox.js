import React from "react";
import {NavLink} from 'react-router-dom';

const SearchBox = (props) => {
  return (
    <div className="search-container">
      <input className="search__input" type="text" placeholder="Search" value={props.value}/>
      <NavLink to="/search" className="fa fa-search search-button">
        
      </NavLink>
      
    </div>
  );
};

export default SearchBox;