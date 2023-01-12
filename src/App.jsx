import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  Thead,
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  const { isOpen, onOpen, onClose} = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_indicador")
    ? JSON.parse(localStorage.getItem("cad_indicador"))
    : [];

    setData(db_costumer);
  }, [setData]);

  const handleRemove = (indicador) => {
    const newArray = data.filter((item) => item.indicador !== indicador);

    setData(newArray);

    localStorage.setItem("cad_indicador", JSON.stringify(newArray));

  };


  return (
    <Flex
    h="100vh"
    align="center"
    justify="center"
    fonySize="20px"
    fontFamily="poppins"
    >
      <Box maxW={2000} w="100%" h="100vh" py={10} px={1}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO INDICADOR
        </Button>

        <Box overflawY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Indicador
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Fórmula
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Resultado
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Meta
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Responsável
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ indicador, formula, resultado, meta, responsavel }, index) => (
                <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100 "}}>
                  <Td maxW={isMobile ? 5 : 100}>{indicador}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{formula}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{resultado}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{meta}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{responsavel}</Td>
                  <Td p={0}>
                    <EditIcon
                    fontSize={20}
                    onClick={() => [
                      setDataEdit({ indicador, formula, resultado, meta, responsavel, index}),
                      onOpen(),
                    ]}
                    />
                    </Td>
                    <Td p={0}>
                    <DeleteIcon
                    fontSize={20}
                    onClick={() => handleRemove(indicador)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        setData={setData}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;