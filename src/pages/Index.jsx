import React, { useState } from "react";
import { Box, Button, Heading, Text, Image, Input, Textarea, Select, Checkbox, Radio, Stack, Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon, FaPlus, FaTrash } from "react-icons/fa";

const COMPONENTS = {
  Heading,
  Text,
  Image,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Button,
};

const ComponentBlock = ({ component: Component, onAdd }) => {
  return (
    <Box borderWidth={1} borderRadius="lg" p={4} mb={4} cursor="move">
      <Component>{Component === Image ? <Image src="https://images.unsplash.com/photo-1655148999626-56ce0c641069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwbGFjZWhvbGRlciUyMGltYWdlfGVufDB8fHx8MTcxMDY0Mjc5NHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Placeholder" /> : `${Component.displayName}`}</Component>
      <Button leftIcon={<FaPlus />} size="xs" onClick={() => onAdd(Component)} mt={2}>
        Add to page
      </Button>
    </Box>
  );
};

const PageBuilder = () => {
  const [components, setComponents] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const addComponent = (component) => {
    setComponents([...components, component]);
  };

  const removeComponent = (index) => {
    const updatedComponents = components.filter((_, i) => i !== index);
    setComponents(updatedComponents);
  };

  return (
    <Flex>
      <Box width="300px" bg="gray.100" p={4} mr={8}>
        <Heading size="md" mb={4}>
          Components
        </Heading>
        {Object.entries(COMPONENTS).map(([name, component]) => (
          <ComponentBlock key={name} component={component} onAdd={addComponent} />
        ))}
      </Box>
      <Box flex={1}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg">Page Builder</Heading>
          <IconButton icon={colorMode === "light" ? <FaMoon /> : <FaSun />} onClick={toggleColorMode} aria-label="Toggle color mode" />
        </Flex>
        <Box borderWidth={1} borderRadius="lg" p={4} minHeight="400px" bg={colorMode === "light" ? "white" : "gray.700"}>
          {components.map((Component, index) => (
            <Box key={index} mb={4} position="relative">
              <Component>{Component === Image ? <Image src="https://images.unsplash.com/photo-1600716051809-e997e11a5d52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzYW1wbGUlMjBpbWFnZXxlbnwwfHx8fDE3MTA2NDI3OTR8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Sample" /> : `${Component.displayName} ${index + 1}`}</Component>
              <IconButton icon={<FaTrash />} size="xs" position="absolute" top={2} right={2} onClick={() => removeComponent(index)} aria-label="Remove component" />
            </Box>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default PageBuilder;
