import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const AddButton = ({ onClick }) => {
  return (
    <ButtonGroup size='sm' isAttached variant='outline'>
      <Button onClick={onClick}>Añadir</Button>
      <Button leftIcon={<AddIcon />} onClick={onClick} variant="outline">
      </Button>
    </ButtonGroup>
  );
};

export default AddButton;
