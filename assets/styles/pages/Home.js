import react from 'react';

import Header from '../components/Header/Header';
import Banner from '../components/Banner/Banner';

import Posts from '../components/Posts/Posts';
import Footer from '../components/Footer/Footer';

function Home(props){
  return(
    <div>
      < Header/>
      < Banner />
      < Posts />
      < Footer />
    </div>
  );
}

export default Home;