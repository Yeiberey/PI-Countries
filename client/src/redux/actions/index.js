import axios from 'axios'
export const GETDBCOUNTRIESSEARCH = 'GETDBCOUNTRIESSEARCH';
export const GETDBCOUNTRIES = 'GETDBCOUNTRIES';
export const GETDBCOUNTRYDETAIL = 'GETDBCOUNTRYDETAIL';
export const GETDBCOUNTRIESORDER = 'GETDBCOUNTRIESORDER';
export const GETDBACTIVITIES = 'GETDBACTIVITIES';
export const GETCOUNTRIESFILTER = 'GETCOUNTRIESFILTER';

// Nuestras actions (action creators) devolverán un paquete de actions que nuestro reducer recibirá. 
// ¿Cómo es el paquete de acción? Tengan en cuenta que el creador de la acción no es en absoluto responsable 
// de manejar ninguna de las lógicas actuales de actualización del store central de Redux.
// Eso se lo deja al reducer(s).

export const getDBCountries = () => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/countries`)
      .then(r => {
        return dispatch({
          type: GETDBCOUNTRIES,
          payload: r.data,
        })
      })

      .catch((err) => {
        console.error(err);
      });

  }
};

export const getDBCountriesSearch = (attribute,name) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/countries?${attribute}=${name}`)
      .then(r => {
        return dispatch({
          type: GETDBCOUNTRIESSEARCH,
          payload: r.data,
        })
      })

      .catch(({ response }) => {
        alert(response.data)
      });

  }
};

export const getCountryDetail = (id) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/countries/${id}`)
      .then(r => {
        return dispatch({
          type: GETDBCOUNTRYDETAIL,
          payload: r.data,
        })
      })

      .catch((err) => {
        alert(err);
      });

  }
}
export const getCountriesOrder = (type, attribute) => {
  return {
    type: GETDBCOUNTRIESORDER,
    payload: { type, attribute },
  }
}

export const postCreateActivity = (value) => {
  return async (dispatch) =>{
    return axios.post("http://localhost:3001/activities",value)
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  
}

export const getDBActivities = () => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/activities`)
      .then(r => {
        return dispatch({
          type: GETDBACTIVITIES,
          payload: r.data,
        })
      })

      .catch((err) => {
        console.error(err);
      });

  }
};

export const getCountriesFilter = (countries) => {
  return {
          type: GETCOUNTRIESFILTER,
          payload: countries,
        }
};
