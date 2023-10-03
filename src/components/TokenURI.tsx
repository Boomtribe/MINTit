import React, { useEffect, useState } from 'react';
import useDomainInfo from '../hooks/domainInfo'; // Adjust the path to the actual location
import { FaStop } from "react-icons/fa";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import abiFile from '../abiFile.json';
import { ethers } from 'ethers';
import { Button, useToast } from "@chakra-ui/react";
import { checkContract } from '../hooks/useNetworkValidation';

function TokenURI({ domainName, TokenURI }: { domainName: string; TokenURI: string }) {
  const { domainId, ownerAddress, oldUri } = useDomainInfo(domainName);
  const contractAddress = checkContract();
var CONTRACT_ADDRESS = ''; // No contract found
    if (contractAddress) {
      CONTRACT_ADDRESS = contractAddress;
      //console.log(CONTRACT_ADDRESS);
    } 
//console.log(TokenURI);
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: abiFile.abi,
    functionName: 'setTokenURI',
    args: [domainId, TokenURI],
    overrides: {
      value: ethers.utils.parseEther("0.01")
    }
  })
  const { data, error, isError, write } = useContractWrite(config)
  // console.log(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
  const toast = useToast();

  const randomNumber = Math.random();
  const url = "https://w3d.name/api/v1/index.php?domain=" + domainName + "&" + randomNumber+"&update=yes";
 
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {


    const updateApi = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log("API updated");
        // console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    
    if (isSuccess) {
      updateApi();
      setShowSuccessAlert(true);
    }
    if (isPrepareError || isError) {
      setShowErrorAlert(true);
      const errorMessage = (prepareError || error)?.message || 'An error occurred';
      setErrorMessage(errorMessage);
    }
  }, [isSuccess, isPrepareError, isError, prepareError, error]);

   useEffect(() => {
    
  function showAlert(title: string, err: string) {

    toast({
      title: title,
      description: err,
      status: 'warning',
      duration: 4000,
      isClosable: false,
    })
  }
    if (showSuccessAlert) {
      showAlert("Success", "Successfully synchronized with blockchain");
      setShowSuccessAlert(false); // Reset the state
    }
    if (showErrorAlert) {
      showAlert("Error", errorMessage);
      setShowErrorAlert(false); // Reset the state
    }
  }, [showSuccessAlert, showErrorAlert, errorMessage]);

  return (
    <div>
      {/* {domainId !== null ? (
          <p>Domain ID: {domainId.toNumber()} - {oldUri}</p>
        ) : (
          <p>Loading Domain ID...</p>
        )}
  
        {ownerAddress !== null ? (
          <p>Owner Address: {ownerAddress}</p>
        ) : (
          <p>Loading Owner Address...</p>
        )}

         {TokenURI !== null ? (
          <p>Token URI: {TokenURI}</p>
        ) : (
          <p>Loading URI...</p>
        )}
  
        {prepareDataError && (
          <p>Error fetching Domain ID: {prepareDataError.message}</p>
        )}
  
        {prepareDataErrorOwner && (
          <p>Error fetching Owner Address: {prepareDataErrorOwner.message}</p>
        )} */}

      {write && (
        <Button
        size="sm" 
          rightIcon={<FaStop />}
          colorScheme="yellow"
          mt={4}
          disabled={!write || isLoading}
          onClick={() => write && write()} // Ensure write function is available before calling
        >
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      )}
    </div>
  );
}

export default TokenURI;
