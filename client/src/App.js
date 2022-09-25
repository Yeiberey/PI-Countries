import React from "react";
import { Route } from 'react-router-dom';
import Inicio from "./components/Inicio/Inicio.jsx"
import Home from "./components/Home/Home.jsx"
import CountryDetail from "./components/CountryDetail/CountryDetail.jsx"
import CreateActivity from "./components/CreateActivity/CreateActivity.jsx"
import './App.css';

function App() {

  return (
    <div className="App">
      <Route exact path="/">
        <Inicio />
      </Route>

      <Route exact path='/activities/create' render={()=><CreateActivity/>}>

      </Route>

      <Route
        exact path='/countries/:id'
        render={({ match }) => {
          return <CountryDetail
            match={match}
          />
        }}
      />
      <Route
        exact path='/home'
        render={({location}) => {
          return <Home search={location.search.replace('?search=','')}/>
        }}
      />


    </div>
  );
}
export default App;

//<Route path="/" render={()=><Nav />} />
//        <Route
  //        exact path="/movie/:id"
    // //      render={({match, location, history}) => {
    //         return <MovieDetail
    //         match={match}
    //         location={location}
    //         history={history}
    //         />
    //       }}
    //     />
    //     <Route exact path="/movies/create">
    //       <CreateMovie />
    //     </Route>