import { useState } from 'react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

const AddButton = ({onClick}) => {
  const [value, setValue] = useState(0);

  const handleChangeAddButton = (valueAsString, valueAsNumber) => {
    setValue(valueAsNumber);
    onClick(valueAsNumber)
  };

  return ( 
    <div>
      <NumberInput
        min={0}
        size='md'
        maxW={20}
        value={value}
        onChange={handleChangeAddButton}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </div>
  );
};

export default AddButton;
