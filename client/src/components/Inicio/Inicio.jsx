import { Button, Flex } from "@chakra-ui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import bgImg from "../../countries.jpg";

export class Inicio extends Component {
  componentDidMount() {
    //this.props.getAllMovies()
  }
  render() {
    return (
      <Flex
        w={"full"}
        h={"full"}
        alignItems={"center"}
        justifyContent={"center"}
        bgImage={bgImg}
      >
        <Link to="/home">
          <Button
            color="white"
            bg={"rgba(1, 148, 244)"}
            _hover={{ bg: "rgba(0, 98, 162)" }}
          >
            Iniciar
          </Button>
        </Link>
      </Flex>
    );
  }
}
export default Inicio;
