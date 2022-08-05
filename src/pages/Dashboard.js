import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/appContext';
import FormRow from '../components/FormRow';
import Navbar from '../components/Navbar';
import Jobs from '../components/Jobs';

function Dashboard() {
  const [values, setValues] = useState({ company: '', position: '' });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { isLoading, showAlert, fetchJobs, createJob } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { company, position } = values;
    if (company && position) {
      createJob(values);
      setValues({ company: '', position: '' });
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <>
      <Navbar />                                                                {/* Inserts the navbar on the top of the dashboard*/}                                  

      <Wrapper className='page'>                                                {/* Wraps the form fields so that they're styled with 'page' */}
        {showAlert && (
          <div className='alert alert-danger'>
            Something went wrong. Please try again. 
          </div>
        )}
        <form className='job-form' onSubmit={handleSubmit}>
          {/* position */}
          <FormRow                                                              // First field on form on dashboard after you're logged in.
            type='name'                                                         // Assigns type of data being entered?
            name='position'                                                     // Provides label for form field. Also assigns value for key value pairs?
            value={values.position}                                             // Sets whatever is put in, paired with 'position', into an array called 'values'?
            handleChange={handleChange}
            horizontal
            placeholder='Position'                                              // Placeholder word in that first field.
          />
          {/* company */}
          <FormRow
            type='name'
            name='company'
            value={values.company}
            handleChange={handleChange}
            horizontal
            placeholder='Company'
          />
          <button type='submit' className='btn' disabled={isLoading}>
            {isLoading ? 'Adding New Job...' : 'Add Job'}                     {/* Sets the text for the big button (and the loading text). */}
          </button>
        </form>

        <Jobs />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  padding: 3rem 0;

  .job-form {
    background: var(--white);
    display: grid;
    row-gap: 1rem;
    column-gap: 0.5rem;
    align-items: center;
    margin-bottom: 3rem;
    border-radius: var(--borderRadius);
    padding: 1.5rem;
    .form-input {
      padding: 0.75rem;
    }

    .form-input:focus {
      outline: 1px solid var(--primary-500);
    }
    .form-row {
      margin-bottom: 0;
    }
    .btn {
      padding: 0.75rem;
    }
    @media (min-width: 776px) {
      grid-template-columns: 1fr 1fr auto;
      .btn {
        height: 100%;
        padding: 0 2rem;
      }
      column-gap: 2rem;
    }
  }
  .alert {
    max-width: var(--max-width);
    margin-bottom: 1rem;
  }
`;

export default Dashboard;
