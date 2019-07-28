import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const SelectInput = props => {
  return (
    // <Select
    //   defaultValue='purple'
    //   isMulti
    //   name='multi'
    //   options={['purple', 'red', 'orange', 'black']}
    //   className='multi-select'
    //   //   classNamePrefix='select'
    //   isRtl={true}
    // />
    <Select options={options} />
  );
};

export default SelectInput;
