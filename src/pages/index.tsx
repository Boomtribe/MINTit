import type { NextPage } from "next";
import React from "react";
import {DOMAIN_TITLE} from "../configuration/Config";
import Search from "../components/domain/Search";
import PrivateNotice from "../components/message/PrivateNotice";

// Import debounce from lodash
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";


const Home: NextPage = () => {
  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="md"
      color={useColorModeValue("gray.700", "whiteAlpha.900")}
      shadow="base"
    >
      <Box
        textAlign="center"
        alignContent={"center"}
        borderRadius="lg"
        p={{ base: 5, lg: 16 }}
        bgSize={"lg"}
        maxH={"80vh"}
      >
        <Container maxW={"5xl"} alignItems={"center"} justifyContent={"center"}>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 16 }}
          >
            <PrivateNotice/>
            <div>
              <Heading as="h2" fontSize="2xl" my={1}>
              {DOMAIN_TITLE}
              </Heading>
            
                <Search />
             
            </div>
          </Stack>
        </Container>
      </Box>
    </Flex>
  );
};

export default Home;
