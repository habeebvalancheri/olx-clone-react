import react from 'react';

import './Header.css';

// ======== import Assets ========
import OLXLogo from '../../assets/OLXLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

function Header(){
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
          <span> Login </span>
          <hr/>
        </div>
        <div className='sellMenu'>
          <SellButton></SellButton>
          <div className='sellMenuContent'>
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;