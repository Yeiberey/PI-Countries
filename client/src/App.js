import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Inicio from "./components/Inicio/Inicio.jsx";
import Home from "./components/Home/Home.jsx";
import CountryDetail from "./components/CountryDetail/CountryDetail.jsx";
import CreateActivity from "./components/CreateActivity/CreateActivity.jsx";
import { useEffect, useRef, useState } from "react";

function App() {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  }, [ref.current?.clientHeight]);
  return (
    <Flex textAlign="center" flex={1} flexDirection={"column"} h={"100%"}>
      <Flex flexDirection="column">
        {console.log(ref)}
        {<Box bg={"black"} h={height + "px"}></Box>}
        <Flex
          ref={ref}
          // justifyContent={"space-between"}
          // alignItems={"center"}
          position={"fixed"}
          zIndex={100}
          bg={"rgba(51, 102, 255)"}
          w={"full"}
          // h={"50px"}
          // p={"10px"}
          // wordBreak={"break-word"}
        >
          <Text color={"white"} fontSize={"12px"}>
            ⚠ Este proyecto se creo entre el 13 y 30 sep/2022 por Yeyber Reyes,
            en Henry para el Proyecto Individual,{" "}
            {
              <a href="https://portafolio-yeiber.vercel.app" target={"_blank"}>
                <Button fontSize={"12px"} fontWeight color="white">
                  click aquí
                </Button>
              </a>
            }{" "}
            para mas información.
          </Text>
        </Flex>
      </Flex>
      <Routes>
        <Route exact path={"/activities/create"} element={<CreateActivity />} />
        <Route exact path={"/countries/:id"} element={<CountryDetail />} />
        <Route exact path={"/products/:id"} element={<Inicio />} />
        <Route exact path={"/home"} element={<Home />} />
        <Route exact path={"/"} element={<Inicio />} />
        {/* <Route path={"*"} element={<Inicio />} /> */}
      </Routes>
    </Flex>
  );
}

export default App;
