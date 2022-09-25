import { GETDBCOUNTRIESNAME, GETDBCOUNTRIES, GETDBCOUNTRYDETAIL, GETDBCOUNTRIESORDER } from '../actions';

const initialState = {
  countryDetail: {},
  countries: []
}

const rootReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case GETDBCOUNTRYDETAIL:
      return {
        ...state, countryDetail: payload,
      }
    case GETDBCOUNTRIES:
      return {
        ...state, countries: payload,
      }
    case GETDBCOUNTRIESNAME:
      return {
        ...state, countries: payload,
      }
    case GETDBCOUNTRIESORDER:
      var array;
      if (payload.attribute === "name") {
        array = [...state.countries].sort((x, y)=>{
          if (x.name < y.name) {return -1;}
          if (x.name > y.name) {return 1;}
          return 0;
      })
      } else {
        if (payload.type === "asc") {
          array = [...state.countries].sort((a, b) => a[payload.attribute] - b[payload.attribute])
        } else {
          array = [...state.countries].sort((a, b) => b[payload.attribute] - a[payload.attribute])
        }

      }
      return {
        ...state, countries: array,
      }
    default:
      return state;
  }
};
export default rootReducer;