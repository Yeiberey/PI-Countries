import "./home.css";
import { json, Link } from "react-router-dom";
import {
  getDBCountries,
  getDBCountriesSearch,
  getCountriesOrder,
  getDBActivities,
  getCountriesFilter,
} from "../../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useState, useEffect } from "react";
import CountriesCards from "../CountriesCards/CountriesCards";
// import Select from "react-select";
import useQuery from "../query";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";
export const Home = ({
  countries,
  activities,
  getDBCountriesSearch,
  getDBCountries,
  getCountriesOrder,
  getDBActivities,
  getCountriesFilter,
}) => {
  let search = useQuery().get("search");
  const [name, setName] = useState("");
  const [order, setOrder] = useState({
    type: "asc",
    attribute: { value: "order", label: "Order" },
  });
  const [filter, setFilter] = useState({
    objContinent: {
      value: "select continent",
      label: "Select continent",
    },
    objActivity: {
      value: "select activity",
      label: "Select activity",
    },
    type: {
      value: "filter",
      label: "Filter",
    },
  });

  useEffect(() => {
    ejet();
    async function ejet() {
      if (!countries.length) {
        if (search) getDBCountriesSearch("name", search);
        else await getDBCountries();
        console.log("se cargo countries");
      }
    }
  }, []);

  useEffect(() => {
    if (filter.type.value === "activity" && !activities.length) {
      // if (search) getDBCountriesSearch(search)
      // else
      getDBActivities();
      console.log("se cargo activities", filter.type.value);
    }
    // eslint-disable-next-line
  }, [filter.type]);

  const handleInputChangeSearch = async (e) => {
    e.preventDefault();
    setName(e.target.value);
    // await getDBCountriesSearch("name", e.target.value);
  };
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [buttonsNumbers, setButtonsNumbers] = useState([]);

  useEffect(() => {
    setCurrentPage(0);
    setItems(
      countries.length > 9 ? [...countries].splice(0, 9) : [...countries]
    );
    let arr = [];
    for (
      let i = 0;
      i <= (countries.length > 9 ? (countries.length - 9) / 10 + 1 : 0);
      i++
    ) {
      arr.push(
        <Button onClick={handlerButtonNumbers} key={i}>
          {i}
        </Button>
      );
    }
    setButtonsNumbers(arr);
    console.log("renderizado");
    // eslint-disable-next-line
  }, [countries]);
  //console.log([...new Set(countries.map(e=>e.continent))].map(e => ({ value: e.toLowerCase(),label: e})))

  const handlerButtonNumbers = (e) => {
    e.preventDefault();
    changePage(Math.round(e.target.innerText));
  };

  const handleClickPrev = (e) => {
    e.preventDefault();
    if (currentPage) {
      const prevPage = currentPage - 1;
      changePage(prevPage);
    }
  };

  const handleClickNext = (e) => {
    e.preventDefault();
    const nextPage = currentPage + 1;
    changePage(nextPage);
  };
  const changePage = (pageNumber) => {
    const totalItems = countries.length;
    const firstIndex = pageNumber ? pageNumber * 10 - 1 : 0;
    if (firstIndex >= totalItems) {
      console.log("final");
    } else if (totalItems - firstIndex < 10) {
      setCurrentPage(pageNumber);
      setItems([...countries].splice(firstIndex, totalItems - firstIndex));
    } else {
      setCurrentPage(pageNumber);
      setItems([...countries].splice(firstIndex, pageNumber ? 10 : 9));
    }
  };

  const handleOrderType = (e) => {
    e.preventDefault();
    let type = order.type === "asc" ? "desc" : "asc";
    setOrder({ ...order, type });
    getCountriesOrder(type, order.attribute.value);
  };

  const optionsContinents = [
    {
      label: "North America",
      value: "north america",
    },
    {
      label: "Oceania",
      value: "oceania",
    },
    {
      label: "Europe",
      value: "europe",
    },
    {
      label: "South America",
      value: "south america",
    },
    {
      label: "Africa",
      value: "africa",
    },
    {
      label: "Asia",
      value: "asia",
    },
    {
      label: "Antarctica",
      value: "antarctica",
    },
  ];
  return (
    <Flex flexDirection={"column"} h={"full"}>
      <Link to="/">
        <button
          style={{
            backgroundColor: "#ffadad",
            borderColor: "#ed0505",
            color: "black",
          }}
          className="button-primary"
        >
          Volver
        </button>
      </Link>
      <div className="top-navegation-main">
        <form
          style={{ display: "flex" }}
          onSubmit={async (e) => {
            e.preventDefault();
            await getDBCountriesSearch("name", name);
          }}
        >
          <h1>Home</h1>
          <div className="divNavegation">
            <input
              placeholder="Search country"
              type="text"
              name="search"
              onChange={handleInputChangeSearch}
            />
            <Button type="submit">search</Button>
          </div>
          <Flex flex={"row"}>
            <Select
              onChange={(e) => {
                getCountriesOrder(order.type, e.target.value);

                setOrder({ ...order, attribute: { value: e.target.value } });
              }}
              placeholder={"Select order"}
            >
              <option value="name">Name</option>
              <option value="population">Population</option>
            </Select>
            {order.attribute.value === "population" ? (
              <Button ml={2} mr={2} onClick={handleOrderType}>
                {order.type.toUpperCase()}
              </Button>
            ) : null}
          </Flex>
          <Flex>
            <Select
              onChange={(e) => {
                setFilter({
                  ...filter,
                  type: JSON.parse(e.target.value),
                });
              }}
              placeholder={"Select continent"}
            >
              <option value='{ "value": "continent", "label": "Continent" }'>
                Continent
              </option>
              <option value={'{ "value": "activity", "label": "Activity" }'}>
                Activity
              </option>
            </Select>
            {/* {console.log(activities)} */}
            {filter.type.value === "activity" ? (
              <Select
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    objActivity: JSON.parse(e.target.value),
                  });
                  getCountriesFilter(JSON.parse(e.target.value).countries);
                }}
                placeholder={"Select activity"}
              >
                {activities.map((activity, i) => {
                  return (
                    <option
                      key={i}
                      value={`{"value":"${activity.value}","label":"${
                        activity.label
                      }","countries":${JSON.stringify(activity.countries)}}`}
                    >
                      {activity.label}
                    </option>
                  );
                })}
              </Select>
            ) : filter.type.value === "continent" ? (
              <Select
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    objContinent: JSON.parse(e.target.value),
                  });
                  getDBCountriesSearch(
                    "continent",
                    JSON.parse(e.target.value).label
                  );
                }}
                placeholder={"Select continent"}
              >
                {optionsContinents.map((item, i) => {
                  return (
                    <option
                      key={i}
                      value={`{"value":"${item.value}","label":"${item.label}"}`}
                    >
                      {item.label}
                    </option>
                  );
                })}
              </Select>
            ) : null}
          </Flex>
        </form>

        <Link to={"/activities/create"}>
          <button className="button-primary">Create activity</button>
        </Link>
      </div>
      <div className="paginated">
        <h1>Pagina {currentPage}</h1>
        <div className="paginatedButtons">
          <Button onClick={handleClickPrev}>Prev</Button>
          {buttonsNumbers}
          <Button onClick={handleClickNext}>Next</Button>
        </div>
      </div>
      {items.length ? <CountriesCards countries={items} /> : null}
    </Flex>
  );
};

export const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    activities: state.activities,
  };
};
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getDBCountries,
      getDBCountriesSearch,
      getCountriesOrder,
      getDBActivities,
      getCountriesFilter,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
