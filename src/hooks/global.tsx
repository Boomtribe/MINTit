import { useToast , UseToastOptions } from "@chakra-ui/react";

function useGlobal() {
  const toast = useToast();

  function showToast(title: string, description: string, status: UseToastOptions["status"]) {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 4000,
      isClosable: false,
    });
  }

  function replaceNullWithEmptyString(obj: any) {
    for (const key in obj) {
      if (obj[key] === null) {
        obj[key] = "";
      } else if (typeof obj[key] === "object") {
        replaceNullWithEmptyString(obj[key]);
      }
    }
  }

  return { showToast, replaceNullWithEmptyString };
}

export default useGlobal;
