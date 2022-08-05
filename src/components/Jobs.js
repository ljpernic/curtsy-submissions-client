//////// RETURNS JOBS FOR LOGGED-IN READER ////////

import { useGlobalContext } from '../context/appContext';                     // Makes useGlobalContext function from appContext available.
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';                             // Makes react icons available.
import moment from 'moment';
import JobColumns from './JobColumns';

const Jobs = () => {
  const { jobs, isLoading, deleteJob } = useGlobalContext();                  // Sets the jobs, isLoading, and deleteJob constants based on useGlobalContext.

  if (isLoading) {                                                            // If the state is isLoading, returns a loading notice.
    return <div className='loading'></div>;
  }

  if (jobs.length < 1) {                                                      // If no jobs are found (less than 1), returns a "no jobs" notice.
    return (
      <EmptyContainer>
        <h5>
          Currently, you have no <span>JOBS </span>
          to display
        </h5>
      </EmptyContainer>
    );
  }

  return (                                                                    // Otherwise, it returns all of the jobs found. 
    <>
      <JobColumns />                                                          {/* Using the JobColumns component to display them. */}
      <Container>
        {jobs.map((item) => {                                                 // And a map of all of the jobs, with each corresponding to an "item" array
          const { _id: id, company, position, status, createdAt } = item;     //// that contains id, company, position etc.
          let date = moment(createdAt);                                       // Sets the date variable to equal the createdAt value
          date = date.format('MMMM Do, YYYY');                                //// and then formats it.
          return (
            <article key={id} className='job'>                                {/* Then it returns all of those values, styling it with className 'job'. */}
              <span className='icon'>{company.charAt(0)}</span>               {/* This doesn't seem to get displayed. */}
              <span className='position'>{position.toLowerCase()}</span>      {/* Sets the position content to be title case */}
              <span className='company'>{company}</span>
              <span className='date'>{date}</span>
              <StatusContainer className='status' status={status}>            {/* Sets the colored box (styled with className='status') based on the status value. */}
                {status}                                                      {/* The actual text of the status is dynamically inserted here. */}
              </StatusContainer>
              <div className='action-div'>                                    {/* Sets the box where the edit and delete buttons are. */}                        
                <Link                                                         // The actual button that links to the `/edit/{$id}` functionality.
                  to={`/edit/${id}`} 
                  className='edit-btn' 
                  type='button'
                >  
                  <FaEdit />                                                  {/* The edit button image imported above is made a link here. */}
                </Link>
                <button                                                       // The delete button.
                  className=' delete-btn'
                  type='button'
                  onClick={() => deleteJob(id)}
                >
                  <FaTrash />                                                 {/* The trash button image imported above is made a link here. */}
                </button>
              </div>
            </article>
          );
        })}
      </Container>
    </>
  );
};

                                                                              // Styles the various containers.
const EmptyContainer = styled.section`
  text-align: center;
  h5 {
    text-transform: none;
  }
  span {
    color: var(--primary-500);
  }
`;
const Container = styled.section`
  .job {
    background: var(--white);
    border-radius: var(--borderRadius);
    margin-bottom: 2rem;
    display: grid;
    padding: 2rem 0;
    justify-content: center;
    text-align: center;
  }
  .icon {
    background: var(--primary-500);
    display: block;
    border-radius: var(--borderRadius);
    color: var(--white);
    font-size: 2rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  span {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
  .position {
    font-weight: 600;
  }
  .date {
    color: var(--grey-500);
  }
  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    margin: 0.75rem auto;
    width: 100px;
  }
  .edit-btn {
    color: var(--green-dark);
    border-color: transparent;
    background: transparent !important;
    outline: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    display: inline-block;
    appearance: none;
  }
  .delete-btn {
    color: var(--red-dark);
    border-color: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    background: transparent;
  }
  .edit-btn,
  .delete-btn {
    font-size: 1rem;
    line-height: 1.15;
    margin-bottom: -3px;
  }

  .action-div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr;
    .icon {
      display: none;
    }
    background: var(--white);
    border-bottom-left-radius: var(--borderRadius);
    border-bottom-right-radius: var(--borderRadius);

    .job {
      border-radius: 0;
      justify-content: left;
      text-align: left;
      border-bottom: 1px solid var(--grey-200);
      grid-template-columns: 1fr 1fr 150px 100px 100px;
      align-items: center;
      padding: 1rem 1.5rem;
      column-gap: 1rem;
      margin-bottom: 0;
    }
    .job:last-child {
      border-bottom: none;
    }
    span {
      font-size: var(--small-text);
    }
    .company,
    .position {
      font-weight: 400;
      text-transform: capitalize;
    }
    .date {
      font-weight: 400;
      color: var(--grey-500);
    }

    .status {
      font-size: var(--smallText);
    }

    .action-div {
      margin-left: 1rem;
      justify-content: left;
    }
  }
`;
                                                                                // Sets the status box colors.
const setStatusColor = (status) => {
  if (status === 'interview') return '#0f5132';
  if (status === 'declined') return '#842029';
  return '#927238';
};
const setStatusBackground = (status) => {
  if (status === 'interview') return '#d1e7dd';
  if (status === 'declined') return '#f8d7da';
  return '#f7f3d7';
};

const StatusContainer = styled.span`
  border-radius: var(--borderRadius);
  text-transform: capitalize;
  letter-spacing: var(--letterSpacing);
  text-align: center;
  color: ${(props) => setStatusColor(props.status)};
  background: ${(props) => setStatusBackground(props.status)};
`;
export default Jobs;
