import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { bindActionCreators } from "redux";
import "./countryCard.css";

const CountryCard = ({ index ,id, name, imageFlag, continent, capital, subregion, population, area, activities }) => {

  return (
    <div className="country_card">
      <button>x</button>
      {index}
      <Link to={`/countries/${id}`} onClick={e=>{}}>
        <h3 className="title">{name}</h3>
      </Link>
      <div className="info">

        <img src={imageFlag} alt={name} />
        <p className="text">Continent {continent}</p>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispacth) => {
  return bindActionCreators(actions, dispacth)

}

export default connect(null, mapDispatchToProps)(CountryCard);