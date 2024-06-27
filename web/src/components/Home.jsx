import { useNavigate } from 'react-router-dom';
import Top from './Top.jsx';
const Home = () => {
  const navigateTo = useNavigate();

  const handleClickReserva = () => {
    navigateTo('/reserva');
  };

  const handleClickProductos= () => {
    navigateTo('/productos');
  };

  return (
    <>
      <Top text={'peluqueria'}/>  
      <div className='button-container'>
        <button className='button' onClick={handleClickReserva}>Reservar hora</button>
        <button className='button' onClick={handleClickProductos}>Productos</button>
      </div>

      <div className='down-bar' />
    </>
  );
};

export default Home;
