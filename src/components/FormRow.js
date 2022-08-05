//////// SETS STRUCTURE OF JOB FORM ROW AFTER LOGIN ////////

import React from 'react';

const FormRow = ({
  type,                                                       // Sets key pair values?
  name,
  value,
  handleChange,
  horizontal,
  placeholder,
}) => {
  return (
    <div className='form-row'>
      {!horizontal && (
        <label htmlFor={name} className='form-label'>         {/* Makes sure the label is keyed to the name value. */}
          {name}                                              {/* Displays that name value dynamically. */}
        </label>
      )}
      <input
        type={type}                                           // Keys input value to dynalically generated value
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormRow;
