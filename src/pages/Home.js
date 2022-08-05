//////// THIS IS THE HOME PAGE. WHEN YOU NAVIGATE TO THE URL, THIS IS WHAT YOU SEE. ////////

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import main from '../assets/main.svg';
import { useGlobalContext } from '../context/appContext';
import { Redirect } from 'react-router-dom';
import logo from '../assets/logo.svg';
function Home() {
  const { reader } = useGlobalContext();
//  console.log(`client-side Home.js reader: ` + JSON.stringify(useGlobalContext()))   // SHOWS THE READER STATE. 
  return (                                                                           //// STARTS WITH INITIAL STATE DEFINED IN APP/APPCONTEXT.JS, WITH EVERYTHING FALSE, EMPTY, NULL.
    <>
      {reader && <Redirect to='/dashboard' />}                                       {/*///// BUT IF SOMEONE IS LOGGED IN, REDIRECTS TO DASHBOARD. */}                           
      <Wrapper>
        <nav>
          <img src={logo} alt='acolyte submissions app' />
        </nav>
        <div className='container page'>
          <div className='info'>
            <h1>Submissions app</h1>
            <p>
              This is the home page of the submission app. The content that we might imagine here would include something about the project, maybe other projects 
              that are using this submission system, a logo or two, how-tos and guides, etc. Plus probably something that lets you log in to your specific magazine.
            </p>

            <Link to='/add-reader' className='btn hero-btn'>
              Login
            </Link>
          </div>
          <img src={main} alt='job hunt' className='img main-img' />
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  .container {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: 6rem;
    display: flex;
    align-items: center;
  }
  h1 {
    font-weight: 700;
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .container {
      grid-template-columns: 1fr 1fr;
      column-gap: 6rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Home;
