import { useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Input } from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'

const Buscador = ({ onFilterChange, onSearchChange }) => {
    const [selectedFilter, setSelectedFilter] = useState('Filtrar por');

    const handleMenuItemClick = (filter) => {
        setSelectedFilter(filter);
        if (onFilterChange) {
            onFilterChange(filter);
        }
    };

    const handleInputChange = (event) => {
        if (onSearchChange) {
            onSearchChange(event.target.value);
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {selectedFilter}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => handleMenuItemClick('ID')}>ID</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('Nombre')}>Nombre</MenuItem>
                </MenuList>
            </Menu>
            <Input placeholder="Buscar" onChange={handleInputChange} ml={2} />
        </div>
    );
};

export default Buscador;
