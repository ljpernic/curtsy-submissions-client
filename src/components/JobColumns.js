//////// SETS WRAPPER FOR ALL JOBS FOR LOGGED-IN READER ////////

import React from 'react';
import styled from 'styled-components';

const JobColumns = () => {
  return (
    <Wrapper>
      <span>Name</span>                                     {/* The actual words at the top of each column.  */}
      <span>Title</span>
      <span>Word Count</span>
      <span>status</span>
      <span className='action'>action</span>
    </Wrapper>
  );
};

                                                                // Styles the wrapper itself. Why isn't this in a css file?
const Wrapper = styled.section`
  display: none;
  @media (min-width: 992px) {
    display: block;
    background: var(--grey-200);
    color: var(--grey-500);
    border-top-left-radius: var(--borderRadius);
    border-top-right-radius: var(--borderRadius);
    display: grid;
    grid-template-columns: 1fr 1fr 150px 100px 100px;
    align-items: center;
    padding: 1rem 1.5rem;
    column-gap: 1rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    font-size: var(--small-text);
    font-weight: 600;
    .action {
      margin-left: 1rem;
    }
  }
`;

export default JobColumns;
