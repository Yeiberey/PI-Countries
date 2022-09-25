import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions"
import styled from "styled-components"
const Tarjeta = styled.div`
display: flex;
border: 1px solid #ced4da;
border-radius:0.575rem;
padding: 10px;
justify-items: end;
margin: 10px;
min-width: 325px;
background-color: white;
flex-direction: row;
`;
const Content = styled.div`
display: grid;
border: 1px solid #ced4da;
border-radius:0.575rem;
padding: 10px;
justify-items: start;
margin: 10px;
min-width: 325px;
background-color: white;
`;

const Img = styled.img`
display: grid;
border: 1px solid #ced4da;
border-radius:0.575rem;
padding: 10px;
justify-items: start;
margin: 10px;
min-width: 325px;
background-color: white;
width: 100px;
height: 150px;
`;
const Text = styled.h3`
color: gray;
`;

// Importar las actions como Object Modules, sino los test no funcionarán!

// Fijense en los test que SI O SI tiene que ser un functional component, de otra forma NO VAN A PASAR LOS TEST
// Deben usar Hooks para que los test pasen (lease tambien lo de react-redux).
// No realicen un destructuring de ellos, sino que utilicenlos de la siguiente forma 'React.useState' y 'React.useEffect' ,
// Si no lo hacen asi los test no van a correr.
// TIP: Aqui seria un buen momento para utilizar el hook useSelector.

function CountryDetail({ match }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getCountryDetail(match.params.id))
    // eslint-disable-next-line
  }, [])
  const state = useSelector((state) => state.countryDetail)
  return (
    <Tarjeta>
      <Content>

        <h1>{state.name}</h1>
        <Text>id: {state.id}</Text>
        <Text>continent: {state.continent}</Text>
        <Text>capital: {state.capital}</Text>
        <Text>area: {state.area}</Text>
        <Text>population: {state.population}</Text>
        <Text>subregion:{state.subregion}</Text>
      </Content>
      <Img src={state.imageFlag} alt="" />
      <Content>
        <h2>Activities</h2>
        {state.activities? state.activities.length? state.activities.map((activity, i) => <Content key={activity.id}><Text key={activity.id}>{activity.name}</Text></Content>): <Content><Text>Not there are activities</Text></Content> : <Content><Text>Not there are activities</Text></Content>}

      </Content>

    </Tarjeta>)
};

export default CountryDetail;
