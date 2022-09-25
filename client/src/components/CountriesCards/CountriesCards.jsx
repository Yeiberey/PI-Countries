import CountryCard from "../CountryCard/CountryCard.jsx";

import "./countriesCards.css"


export default function CountriesCards({ countries }) {
  return (
    <div className="countriesCards" >
    {countries.map((e,i) => {
      return (
        <CountryCard
        index={i+1}
          id={e.id}
          name={e.name}
          imageFlag={e.imageFlag}
          continent={e.continent}
          capital={e.capital}
          subregion={e.subregion}
          area={e.area}
          population={e.population}
          key={e.id}
        />
      )
    })}
    </div>
  )
}