import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
}   from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose}) => {
const [indicador, setIndicador] = useState(dataEdit.indicador || "");
const [formula, setFormula] = useState(dataEdit.formula || "");
const [resultado, setResultado] = useState(dataEdit.resultado || "");
const [meta, setMeta] = useState(dataEdit.meta || "");
const [responsavel, setResponsavel] = useState(dataEdit.responsavel || "");

const handleSave = () => {
     if (!indicador || !formula || !resultado || !meta || !responsavel) return;

     if (indicadorAlreadyExists()) {
        return alert("O Indicador já foi cadastrado!");
     }

     if (Object.keys(dataEdit).length) {
        data[dataEdit.index] = { indicador, formula, resultado, meta, responsavel };
     }

     const newDataArray = !Object.keys(dataEdit).length
     ? [...(data ? data : []), { indicador, formula, resultado, meta, responsavel }]
     : [...(data ? data : [])];

     localStorage.setItem("cad_indicador", JSON.stringify(newDataArray));
    
     setData(newDataArray);

    onClose();
    };    


const indicadorAlreadyExists = () => {
    if (dataEdit.indicador !== indicador && data?.length) {
        return data.find((item) => item.indicador === indicador);
    }

    return false;
}

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Novo Indicador</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl display="flex" flexDir="column" gap={4}>
                        <Box>
                            <FormLabel>Indicador</FormLabel>
                            <Input
                            type="text"
                            value={indicador}
                            onChange={(e) => setIndicador(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Fórmula</FormLabel>
                            <Input
                            type="text"
                            value={formula}
                            onChange={(e) => setFormula(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Resultado</FormLabel>
                            <Input
                            type="text"
                            value={resultado}
                            onChange={(e) => setResultado(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Meta</FormLabel>
                            <Input
                            type="text"
                            value={meta}
                            onChange={(e) => setMeta(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Responsável</FormLabel>
                            <Input
                            type="text"
                            value={responsavel}
                            onChange={(e) => setResponsavel(e.target.value)}
                            />
                        </Box>
                    </FormControl>
                </ModalBody>

                <ModalFooter justifyContent="start">
                    <Button colorScheme="green" mr={3} onClick={handleSave}>
                        SALVAR
                    </Button>
                    <Button colorScheme="red" onClick={onClose}>
                        CANCELAR
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
};

export default ModalComp;