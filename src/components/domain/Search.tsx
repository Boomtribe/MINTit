import React, { useEffect, useState } from 'react';
import { Input, Box, TableContainer, Table, Tbody, Tr, Td, Divider } from '@chakra-ui/react';
import { CheckDomain } from '../CheckDomain';
import { DOMAIN_TLD, DOMAIN_PLACEHOLDER } from '../../configuration/Config'
import { useDomainValidation } from '../../hooks/validate';
import useGlobal from '../../hooks/global';
const Search = () => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [showBox, setShowBox] = useState(false); // Added state to control visibility of Box
  const { isValidDomain, validateDomain } = useDomainValidation();
  const { showToast } = useGlobal();

  const handleInputFocus = () => {
    setShowBox(false); // Hide Box when input field is clicked
  };


  const process_domain = (param: string) =>
  {
    let processedParam = param.toLowerCase();

    if (!processedParam.endsWith(DOMAIN_TLD)) {
      processedParam = param +'.'+ DOMAIN_TLD;
    }
    return processedParam;
  }

  
  const fetchData = (param: string) => {

    //console.log(param + " ...... " + value);

    // Convert param to lowercase
   // let newParam = process_domain(param);

  //console.log("New parameter: "+newParam);

    setValue(param);

     // Check if the last character typed is a dash (-)
     const lastChar = param[param.length - 1];
     if (lastChar === '-'|| lastChar === '.') {
       // Don't trigger validation and setShowBox
       return;
     }


    validateDomain(param);

   // console.log(param + " **** " + value);

    if (isValidDomain) {
     // console.log("*");
      setValue2(process_domain(param));
      setValue3(process_domain('my' + param));
      setShowBox(true); // Show Box when value is updated after 5 seconds of inactivity

    }
    else {
    //  console.log("invalid domain");

      setShowBox(false);
    }
  };

  useEffect(() => {
    if (!isValidDomain && value !== '') {
      showToast("Notice", "Invalid Domain: " + value, "warning");
      setShowBox(false);
    }
  }, [isValidDomain, value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>

                <Input
                  value={value}
                  onChange={(ev) => fetchData(ev.target.value)}
                  placeholder={DOMAIN_PLACEHOLDER}
                  onFocus={handleInputFocus} // Handle onFocus event to hide Box
                  size='lg'
                />

                {showBox && value != '' && (

                  <Box position='relative' padding='2'>

                    <TableContainer>
                      <Table size='lg'>

                        <Tbody>
                          <Tr>
                            <Td>{value2}</Td>
                            <Td>-</Td>
                            <Td><CheckDomain domain={value2} /></Td>
                          </Tr>
                          <Tr>
                            <Td>{value3}</Td>
                            <Td>-</Td>
                            <Td><CheckDomain domain={value3} /></Td>
                          </Tr>

                        </Tbody>

                      </Table>
                    </TableContainer>

                    <Divider />

                  </Box>
                )}
              </>
  );
};

export default Search;
