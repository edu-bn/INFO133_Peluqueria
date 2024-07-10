import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import Top from '../../Top.jsx';
import TablaEmpleados from './TablaEmpleados.jsx';
import NuevoEmpleado from './NuevoEmpleado.jsx';


const AdminEmpleados = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const handleNuevoEmpleado = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

    return (
        <>
            <div className='top-container'>
                <Button colorScheme="teal" size='lg' onClick={handleNuevoEmpleado}>
                    Añadir Nuevo Empleado
                </Button>
                <NuevoEmpleado isOpen={isModalOpen} onClose={handleCloseModal}></NuevoEmpleado>
            </div>
            <Top text={'Gestion de empleados'}/> 
            <div  className='table-container'>
                <TablaEmpleados></TablaEmpleados>
            </div>
        </>
    )
}

export default AdminEmpleados;