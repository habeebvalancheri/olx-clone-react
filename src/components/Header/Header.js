import {useContext} from 'react';

import './Header.css';

// ======== import Assets ========
import OLXLogo from '../../assets/OLXLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { authContext } from '../../contexts/firebaseContext';
import { useNavigate } from 'react-router-dom'; 
import { signOut } from 'firebase/auth'; // Import signOut function
import { auth } from '../../firebase/config'; 

function Header(){

  const navigate = useNavigate();
  const {user} = useContext(authContext)
  
  const handleSellClick = () => {
    if (user) {
      navigate('/create');
    } else {
      navigate('/login');
    }
  };

  return(
    <div className='headerParentDiv'>
      <div className='headerChildDiv'>
        <div className='brandName'>
            < OLXLogo></OLXLogo>
        </div>
        <div className='placeSearch'>
          <Search></Search>
          <input type='text' />
          <Arrow></Arrow>
        </div>
        <div className='productSearch'>
          <div className='input'>
            <input type='text'
            placeholder='Find car, mobile phone and more...'/>
          </div>
          <div className='searchAction'>
            <Search color='ffffff'></Search>
          </div>
        </div>
        <div className='language'>
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className='loginPage'>
          <span onClick={() => {
            if(!user){
              navigate('/login');
            }
          }}> {user? ` Welcome ${user.displayName}`:'Login'} </span>
          <hr/>
        </div>
        {user && (<span onClick={() =>{
          signOut(auth)
          .then(() => {
            navigate('/login');
          })
          .catch((error) => {
            console.error('Error signing out:', error);
          });
      }}> Logout</span> )}
        <div className='sellMenu' onClick={handleSellClick}>
          <SellButton></SellButton>
          <div className='sellMenuContent'>
            <SellButtonPlus></SellButtonPlus>
            <span onClick={() => navigate('/create')}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;