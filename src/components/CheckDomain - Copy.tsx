import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDomainValidation } from '../hooks/validate';
import { useRouter } from 'next/router';
var w3d = require('@web3yak/web3domain');
import {
  Box,
  Badge,
  Spinner,
  Link as ChakraLink,
} from '@chakra-ui/react';

interface Props {
  domain: string;
}

const delay = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function CheckDomain(props: Props) {
  const router = useRouter();
  const { isValidDomain, validateDomain } = useDomainValidation();
  const [domainAddr, setDomainAddr] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function makeRequest(domain: string) {
      setIsLoading(true);

      try {
        const settings = {
          matic_rpc_url: process.env.NEXT_PUBLIC_MATIC,
          eth_rpc_url: process.env.NEXT_PUBLIC_ETH,
          fvm_rpc_url: process.env.NEXT_PUBLIC_FILECOIN,
        };
        const resolve = new w3d.Web3Domain(settings);

        validateDomain(domain);
        await delay(3000);

        if (isValidDomain) {
          resolve
            .getAddress(domain, 'ETH')
            .then((address: string) => {
              setDomainAddr(address);
              setError('');
              setIsLoading(false);
            })
            .catch((err: Error) => {
              if (err.message === 'Too Many Requests') {
                setError('Too Many Requests. Please try again later.');
              } else {
                setError(err.message);
              }
              setDomainAddr('error');
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setError('An error occurred while checking the domain.');
      }
    }

    makeRequest(props.domain);
  }, [props.domain, isValidDomain]);

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
          {domainAddr != null ? (
            <Badge colorScheme='purple'>
              <Link href={`/domain/info/${props.domain}`}>WhoIs</Link>
            </Badge>
          ) : (
            <div>
              {isValidDomain ? (
                <Badge colorScheme='green'>
                  <Link href={`/domain/info/${props.domain}`}>Available ✔</Link>
                </Badge>
              ) : (
                <Badge colorScheme='red'>Invalid</Badge>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
