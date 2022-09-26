import "./home.css";
import { Link } from "react-router-dom";
import { getDBCountries, getDBCountriesSearch, getCountriesOrder, getDBActivities, getCountriesFilter } from "../../redux/actions"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useState, useEffect } from "react";
import CountriesCards from "../CountriesCards/CountriesCards";
import Select from 'react-select'

export const Home = ({ countries, search, activities, getDBCountriesSearch, getDBCountries, getCountriesOrder, getDBActivities, getCountriesFilter }) => {
  const [name, setName] = useState("")
  const [order, setOrder] = useState({ type: "asc", attribute: { value: "order", label: "Order" } })
  const [filter, setFilter] = useState({
    objContinent: {
      value: "select continent",
      label: "Select continent"
    },
    objActivity: {
      value: "select activity",
      label: "Select activity"
    },
    type: {
      value: "filter",
      label: "Filter"
    }
  })

  useEffect(() => {
    if (!countries.length) {
      if (search) getDBCountriesSearch("name", search)
      else getDBCountries()
      console.log("se cargo countries")
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (filter.type.value === "activity" && !activities.length) {
      // if (search) getDBCountriesSearch(search)
      // else 
      getDBActivities()
      console.log("se cargo activities")
    }
    // eslint-disable-next-line
  }, [filter.type])

  const handleInputChangeSearch = async (e) => {
    e.preventDefault()
    setName(e.target.value)
    await getDBCountriesSearch("name", e.target.value)
  }
  const [items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [buttonsNumbers, setButtonsNumbers] = useState([])


  useEffect(() => {
    setCurrentPage(0)
    setItems(countries.length > 9 ? [...countries].splice(0, 9) : [...countries])
    let arr = []
    for (let i = 0; i <= (countries.length > 9 ? (countries.length - 9) / 10 + 1 : 0); i++) {
      arr.push(<button value={i} onClick={handlerButtonNumbers} className="button-primary" key={i}>{i}</button>)
    }
    setButtonsNumbers(arr)
    console.log("renderizado")
    // eslint-disable-next-line
  }, [countries])
  //console.log([...new Set(countries.map(e=>e.continent))].map(e => ({ value: e.toLowerCase(),label: e})))

  const handlerButtonNumbers = (e) => {
    e.preventDefault()
    changePage(Math.round(e.target.value))
  }

  const handleClickPrev = (e) => {
    e.preventDefault()
    if (currentPage) {
      const prevPage = currentPage - 1
      changePage(prevPage)
    }
  }

  const handleClickNext = (e) => {
    e.preventDefault()
    const nextPage = currentPage + 1
    changePage(nextPage)
  }
  const changePage = (pageNumber) => {
    const totalItems = countries.length
    const firstIndex = pageNumber ? (pageNumber * 10) - 1 : 0
    if (firstIndex >= totalItems) {
      console.log('final')
    } else if (totalItems - firstIndex < 10) {
      setCurrentPage(pageNumber)
      setItems([...countries].splice(firstIndex, totalItems - firstIndex))
    }
    else {
      setCurrentPage(pageNumber)
      setItems([...countries].splice(firstIndex, pageNumber ? 10 : 9))
    }
  }

  const handleOrderType = (e) => {
    e.preventDefault()
    let type = order.type === "asc" ? "desc" : "asc"
    setOrder({ ...order, type })
    getCountriesOrder(type, order.attribute.value)
  }

  const optionsContinents = [
    {
      label: "North America",
      value: "north america"
    },
    {
      label: "Oceania",
      value: "oceania"
    },
    {
      label: "Europe",
      value: "europe"
    },
    {
      label: "South America",
      value: "south america"
    }, {
      label: "Africa",
      value: "africa"
    }, {
      label: "Asia",
      value: "asia"
    }, {
      label: "Antarctica",
      value: "antarctica"
    }
  ]
  return (
    <div className="home">
      <Link to='/'>
        <button style={{ backgroundColor: "#ffadad", borderColor: "#ed0505", color: "black" }} className="button-primary">
          Volver
        </button>
      </Link>
      <div className="top-navegation-main">
        <form style={{ display: "flex" }} onSubmit={async (e) => {
          e.preventDefault()
          await getDBCountriesSearch("name", name)
        }}>
          <h1>Home</h1>
          <div className="divNavegation">
            <input placeholder="Search country" type="text" name="search" onChange={handleInputChangeSearch} />
            <button className="button-primary" type="submit">search</button>
          </div>
          <div className="divNavegation" >
            <Select className="selectFilters" onChange={(e) => {
              getCountriesOrder(order.type, e.value)

              setOrder({ ...order, attribute: e })
            }

            } defaultValue={order.attribute} options={[{ value: "name", label: "Name" }, { value: "population", label: "Population" }]} />
            {order.attribute.value === "population" ? <button className="button-primary" onClick={handleOrderType}>{order.type.toUpperCase()}</button> : null}
          </div>
          <div className="divNavegation" >
            <Select className="selectFilters" onChange={(e) => {
              setFilter({ ...filter, type: e })
            }

            } defaultValue={filter.type} options={[{ value: "continent", label: "Continent" }, { value: "activity", label: "Activity" }]} />
            {filter.type.value === "activity" ?
              <Select className="selectFilters" onChange={e => {
                setFilter({ ...filter, objActivity: e })
                getCountriesFilter(e.countries)
              }} options={activities} defaultValue={filter.objActivity}
              />
              :
              filter.type.value === "continent" ?
                <Select className="selectFilters" onChange={e => {
                  setFilter({ ...filter, objContinent: e })
                  getDBCountriesSearch("continent", e.label)
                }} options={optionsContinents} defaultValue={filter.objContinent}
                />
                : null}
          </div>
        </form>

        <Link to={'/activities/create'}>
          <button className="button-primary">Create activity</button>
        </Link>
      </div>
      <div className="paginated">
        <h1>Pagina {currentPage}</h1>
        <div className="paginatedButtons">
          <button className="button-primary" id="prevWrapper" onClick={handleClickPrev}>Prev</button>
          {buttonsNumbers}
          <button className="button-primary" id="nextWrapper" onClick={handleClickNext}>Next</button>
        </div>

      </div>
      {items.length ? <CountriesCards
        countries={items}
      /> : null}
    </div>
  )
}

export const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    activities: state.activities
  }
}
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getDBCountries, getDBCountriesSearch, getCountriesOrder, getDBActivities, getCountriesFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


