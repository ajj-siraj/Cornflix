import React from "react";

const SearchBox = () => {
  return (
    <div className="search-container">
      <input className="search__input" type="text" placeholder="Search" />
      <a className="btn fa fa-search search-button"></a>
    </div>
  );
};

export default SearchBox;