//////// THIS IS THE LOGIN PAGE. WHEN YOU CLICK "LOG IN" ON HOME.JS, IT BRINGS YOU HERE. ////////

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/appContext';
import { Redirect } from 'react-router-dom';
import FormRow from '../components/FormRow';
import logo from '../assets/logo.svg';

function AddReader() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    changeLink: ['/add-reader', '/dashboard-full'],
    isMember: false,
  });

  const { reader, addReader, login, isLoading, showAlert } = useGlobalContext();
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, changeLink, isMember } = values;
    setValues({ ...values, changeLink: ['/dashboard-full', '/add-reader'] });
    if (isMember) {
      login({ email, password });
    } else {
      addReader({ name, email, password, changeLink });
    }
  };
  const readerArray = []

//   const ChangeLink = () => {
//   if (readerArray[1] === 'chiefEditor'){
//     <Redirect to={changeLink[0]} />
//     console.log(changeLink[0])
//     changeLink.pop()
//     changeLink.push('/dashboard-full')
//     console.log(changeLink[0])
//   } else if (readerArray[1] === 'middleEditor' || 'subEditor') {
//     <Redirect to='/dashboard' />     
//   } else {
//     <Redirect to='/' />
//   }
// };

  return (
    <>
      {Array.isArray(reader) ? readerArray.push(reader[0], reader[1]) : void(0)}
      {reader && <Redirect to={values.changeLink[0]} />}
      <Wrapper className='page full-page'>
        <div className='container'>
          {showAlert && (
            <div className='alert alert-danger'>
              Whoopsie, there was an error. Please try again.
            </div>
          )}
          <form className='form' onSubmit={onSubmit}>
            <img src={logo} alt='Acolyte Submission System' className='logo' />
            <h4>{values.isMember ? 'Login' : 'Add Reader'}</h4>
            {/* name field */}
            {!values.isMember && (
              <FormRow
                type='name'
                name='name'
                value={values.name}
                handleChange={handleChange}
              />
            )}

            {/* single form row */}
            <FormRow
              type='email'
              name='email'
              value={values.email}
              handleChange={handleChange}
            />
            {/* end of single form row */}
            {/* single form row */}
            <FormRow
              type='password'
              name='password'
              value={values.password}
              handleChange={handleChange}
            />
            {/* end of single form row */}
            <button
              type='submit'
              className='btn btn-block'
              disabled={isLoading}
            >
              {isLoading ? 'Fetching Reader...' : 'Submit'}
            </button>
            <p>
              {values.isMember ? 'Not a member yet?' : 'Already a member?'}

              <button
                type='button'
                onClick={toggleMember}
                className='member-btn'
              >
                {values.isMember ? 'Add Reader' : 'Login'}
              </button>
            </p>
          </form>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400;
    border-top: 5px solid var(--primary-500);
  }

  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
  }
`;

export default AddReader;
