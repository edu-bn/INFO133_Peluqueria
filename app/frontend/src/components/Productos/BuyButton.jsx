import { Button } from "@chakra-ui/react";

const BuyButton = ({onClick}) => {
    const styles = {
        position: 'fixed',
        bottom: '50px',
        right: '30px',
        zIndex: 10,
        size:'lg', 
        color: 'Black',
        backgroundColor: '#ffc4d4'  
      };
  
  return (
    <Button  style={styles} fontSize={40} size={'lg'} onClick={onClick}>
        Comprar
    </Button>
  );
};

export default BuyButton;
