import "./home.css";
import { Link } from "react-router-dom";
import { getDBCountries, getDBCountriesName, getCountriesOrder } from "../../redux/actions"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useState, useEffect } from "react";
import CountriesCards from "../CountriesCards/CountriesCards";

export const Home = ({ countries, search, getDBCountriesName, getDBCountries, getCountriesOrder }) => {
  const [name, setName] = useState("")
  const [order, setOrder] = useState({ type: "asc", attribute: "name" })

  useEffect(() => {
    if (!countries.length) {
      if (search) getDBCountriesName(search)
      else getDBCountries()
      console.log("se cargo countries")
    }
    // eslint-disable-next-line
  }, [])

  const handleInputChangeSearch = async (e) => {
    e.preventDefault()
    setName(e.target.value)
    await getDBCountriesName(e.target.value)
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
    getCountriesOrder(type, order.attribute)
  }
  const handleOrderAttribute = (e) => {
    e.preventDefault()
    let attribute = order.attribute === "name" ? "population" : "name"
    setOrder({ ...order, attribute })
    getCountriesOrder(order.type, attribute)

  }
  return (
    <div className="home">
      <Link to='/'>
        <button className="btn-outline-secondary">Volver</button>
      </Link>
      <div className="top-navegation-main">
        <form onSubmit={async (e) => {
          e.preventDefault()
          await getDBCountriesName(name)
        }}>
          <div className="search">
            <h1>Home</h1>
            <input className="inputSearch" placeholder="Search country" type="text" name="search" onChange={handleInputChangeSearch} />
            <button className="btnSuccess" type="submit">search</button>

          </div>
        </form>
        <Link to={'/activities/create'}>
          <button className="button-primary">Create activity</button>
        </Link>
      </div>

      {order.attribute === "population" ? <button className="button-primary" onClick={handleOrderType}>{order.type}</button> : null}
      <button className="button-primary" onClick={handleOrderAttribute}>{order.attribute}</button>


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
    countries: state.countries
  }
}
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getDBCountries, getDBCountriesName, getCountriesOrder }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


