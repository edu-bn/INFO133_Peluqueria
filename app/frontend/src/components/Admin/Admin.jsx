import Top from "../Top.jsx";
import { useNavigate, useLocation} from "react-router-dom";
import { Alert, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";

const Admin = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const { local } = location.state || {};
    const showAlert = !local;

    const handleReturnHome = () => {
        navigateTo("/");
    }

    const handleClickProductos = () => {
        navigateTo('/admin/productos', { state: {local: local } });
    }

    const handleClickEmpleados = () => {
        navigateTo('/admin/empleados', { state: {local: local } });
    }

    return (
        <>
        <Top text={'Gestion'}/>
        {showAlert ? (
            <Alert status="error" variant="subtle" mt={4}>
            <AlertIcon />
            <AlertTitle>Por favor selecciona un local antes de continuar.</AlertTitle>
            <Button onClick={handleReturnHome} colorScheme="teal" mt={4} size="md">
                Volver a la página principal
            </Button>
            </Alert>
        ) : (<div>
                <h1>Admin</h1>
                <div className='button-container'>
                    <Stack direction='row' spacing={200} align='center' justify='space-between'>
                    <Button colorScheme="teal" onClick={handleClickProductos} size='lg'>
                        Gestionar Productos
                    </Button>
                    <Button colorScheme="teal" onClick={handleClickEmpleados} size='lg'>
                        Gestionar Empleados
                    </Button>
                    </Stack>
                </div>
            </div>)
        }
        </>
    )
}

export default Admin;