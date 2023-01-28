import React, { useState, useEffect } from "react";
import { validate } from "./validate";
import "./createActivity.css";
import Select from "react-select";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getDBCountries, postCreateActivity } from "../../redux/actions";
import { Button } from "@chakra-ui/react";

function CreateActivity({ countries, getDBCountries, postCreateActivity }) {
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "Verano",
    countries_id: [],
    countries: [],
    countrySelect: [],
    country: "",
    created: "",
  });
  const [errors, setErrors] = useState({});
  const [ini, setIni] = useState(false);
  const [optionsCountries, setOptionsCountries] = useState({ options: [] });

  function handleInputChange(e) {
    e.preventDefault();
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    setInput({ ...input, [e.target.name]: e.target.value });
    setIni(true);
  }
  const optionsReason = [
    {
      value: "verano",
      label: "Verano",
    },
    {
      value: "otoño",
      label: "Otoño",
    },
    {
      value: "invierno",
      label: "Invierno",
    },
    {
      value: "primavera",
      label: "Primavera",
    },
  ];

  useEffect(() => {
    getDBCountries();
    console.log("se cargo countries");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setOptionsCountries({
      ...optionsCountries,
      options: countries.map(
        ({
          id,
          name,
          imageFlag,
          continent,
          capital,
          subregion,
          area,
          population,
        }) => {
          return {
            value: id,
            label: name,
            id,
            name,
            imageFlag,
            continent,
            capital,
            subregion,
            area,
            population,
          };
        }
      ),
    });

    // eslint-disable-next-line
  }, [countries]);
  return (
    <div>
      {<h2 style={{ color: "green" }}>{input.created.data}</h2>}

      <div className="activity-countries">
        <form
          className="create-activity"
          onSubmit={async (e) => {
            e.preventDefault();
            if (ini) {
              if (!Object.keys(errors).length) {
                const response = await postCreateActivity(input);
                console.log(response);
                setInput({ ...input, created: response });
              } else {
                alert(Object.values(errors).join(", "));
              }
            } else {
              setErrors(validate({ ...input }));
              setIni(true);
            }
          }}
        >
          <h1>Create your tourist activity</h1>
          <div className="divTextBox">
            <label id="lblName">Name*</label>
            <input
              className={errors.name && "danger"}
              type="text"
              name="name"
              onChange={handleInputChange}
              value={input.name}
              placeholder="Write name"
            />
            {errors.name && <p className="danger">{errors.name}</p>}
          </div>
          <div className="divTextBox">
            <label>Difficulty • (1-5)</label>
            <input
              className={errors.difficulty && "danger"}
              type="number"
              name="difficulty"
              maxLength={1}
              onChange={handleInputChange}
              value={input.difficulty}
              placeholder="Write difficulty"
            />
            {errors.difficulty && <p className="danger">{errors.difficulty}</p>}
          </div>
          <div className="divTextBox">
            <label>Duration • (1-120 min)</label>
            <input
              className={errors.duration && "danger"}
              type="number"
              name="duration"
              maxLength={2}
              onChange={handleInputChange}
              value={input.duration}
              placeholder="Write duration"
            />
            {errors.duration && <p className="danger">{errors.duration}</p>}
          </div>
          <div className="divTextBox">
            <label>Season</label>
            <Select
              onChange={(e) => setInput({ ...input, season: e.label })}
              options={optionsReason}
              defaultValue={optionsReason[0]}
              className="form-select"
            />
            {errors.season && <p className="danger">{errors.season}</p>}
          </div>
          <Button type="submit">Create</Button>
        </form>
        <form
          className="add-countries"
          onSubmit={(e) => {
            e.preventDefault();
            if (ini) {
              if (
                !input.countries_id.includes(input.country) &&
                input.country.length
              ) {
                const arrcountries_id = [...input.countries_id, input.country];
                const arrcountries = [...input.countries, input.countrySelect];
                setInput({
                  ...input,
                  countries_id: arrcountries_id,
                  countries: arrcountries,
                });
                setErrors(
                  validate({
                    ...input,
                    countries_id: arrcountries_id,
                    countries: arrcountries,
                  })
                );
              }
            } else {
              setErrors(validate({ ...input }));
              setIni(true);
            }
          }}
        >
          <div className="divTextBox">
            <label>Add countries</label>
            <Select
              onChange={(e) => {
                setErrors(
                  validate({ ...input, country: e.value, countrySelect: e })
                );
                setIni(true);
                setInput({ ...input, country: e.value, countrySelect: e });
              }}
              options={optionsCountries.options}
              defaultValue={optionsCountries.options[0]}
              className={
                errors.country ? "form-select-country-danger" : "form-select"
              }
            />
            {errors.country && <p className="danger">Add a country</p>}

            <Button
              bg={"rgba(57, 168, 57)"}
              _hover={{ bg: "rgba(108, 202, 170)" }}
              type="submit"
            >
              Add country
            </Button>
          </div>
          <h2>Countries added</h2>
          <div className="div-grid-countries">
            {input.countries_id.length ? (
              input.countries.map((e, i) => {
                return (
                  <div key={e.id} className="divTextBox">
                    <div className="divFlagClose">
                      <img src={e.imageFlag} alt="" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          input.countries_id.splice(i, 1);
                          input.countries.splice(i, 1);
                          setErrors(validate({ ...input }));
                          setIni(true);
                          setInput({
                            ...input,
                            countries_id: [...input.countries_id],
                            countries: [...input.countries],
                          });
                        }}
                        className="btnoutlineprimary"
                      >
                        X
                      </button>
                    </div>
                    <label>{e.name}</label>
                    <label>{e.continent}</label>
                  </div>
                );
              })
            ) : (
              <div className="divTextBox">
                <label>No countries added yet</label>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export const mapStateToProps = (state) => {
  return {
    countries: state.countries,
  };
};
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getDBCountries, postCreateActivity }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity);
