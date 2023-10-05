import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDomainValidation } from '../hooks/validate';
import { useRouter } from "next/router";
var w3d = require("@web3yak/web3domain");
import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  Badge,
  Heading,
  Stack,
  Spinner,
  useColorModeValue,
  SimpleGrid,
  useToast
} from "@chakra-ui/react";


interface Props {
  domain: string
}

const delay = (ms: number | undefined) => new Promise(
  resolve => setTimeout(resolve, ms)
);

export function CheckDomain(props: Props) {
  const toast = useToast();
  const { isValidDomain, validateDomain } = useDomainValidation();
  const [domainAddr, setDomainAddr] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEnv, setEnv] = useState(true);
  const [error, setError] = useState('');
  const url = "https://w3d.name/api/v1/index.php?domain=" + props.domain;
  //console.log(url);
  function showAlert(err:any) {
    toast({
      title: "Notice",
      description: err,
      status: "warning",
      duration: 4000,
      isClosable: false,
    });
  }

  useEffect(() => {
    setIsLoading(true); // Set isLoading to true whenever the effect runs
    
    const settings = {
      matic_rpc_url: process.env.NEXT_PUBLIC_MATIC ,
      eth_rpc_url: process.env.NEXT_PUBLIC_ETH ,
      fvm_rpc_url: process.env.NEXT_PUBLIC_FILECOIN
    };
    try{
    const resolve = new w3d.Web3Domain(settings);
    makeRequest(resolve);
    }
    catch (error) {
      console.error(error);
      console.log("*******************************");
      showAlert("Server Configuration error. Check environment variable and configuration files.");
    }
 
    async function makeRequest(resolve: any) {
      //console.log('before');

      validateDomain(props.domain);
      await delay(3000);

      if (isValidDomain) {
      resolve.getAddress(props.domain, "ETH")
        .then((address: React.SetStateAction<string>) => {
          setDomainAddr(address);
          setError(''); // Clear any previous errors if successful
          setIsLoading(false); // Request completed
         // console.log(address);
        })
        .catch((err: Error) => {
          if (err.message === "Too Many Requests") {
            setError("Too Many Requests. Please try again later.");
          } else {
            setError(err.message);
          }
          setDomainAddr('error'); // Clear the address if there's an error
        }).finally(() => {
          setIsLoading(false);
        });
      }
      else
      {
       // console.log("invalid domain");
        setIsLoading(false);
      }

      //setDomainAddr('iii');
      //console.log('after');
    }

  
 

  }, [props.domain, isValidDomain]); // The empty dependency array ensures this effect runs only once on mount

  return (
    <>

      {isLoading ? (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='md'
        />
      ) : (

        <div>
          {domainAddr != null ?

            <div>
              <Badge colorScheme='purple'><Link href={`/domain/info/${props.domain}`}>WhoIs</Link></Badge>
            </div>

            : 
            
            <div>
              {isValidDomain ? (
            <Badge colorScheme='green'><Link href={`/domain/info/${props.domain}`}>Available ✔</Link></Badge>
            ) : (
              <Badge colorScheme='red'>Invalid</Badge>
            )}
          </div>
            
            
            } </div>

      )

      }


    </>
  );
}
