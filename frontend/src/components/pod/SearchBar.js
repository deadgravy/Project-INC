import { useState } from 'react';
import { useRef } from 'react';

const SearchBar = ({ data1 }) => {
  const inputRef = useRef(null);
  var NotFound = true;

  function handleClick() {
    for (let i = 0; i < data1.data.length; i++) {
      if (data1.data[i].name === inputRef.current.value) {
        console.log(data1.data[i].name + ' was found');
        window.location.href = `/productionOverview/${data1.data[i].fr_recipe_id}`;
        NotFound = false;
      }
    }
    if (NotFound) {
      window.location.href = `/productionOverview/404`;
    }
  }
  return (
    <div
      style={{ flexDirection: 'row', display: 'flex' }}
      className='searchComponent'
    >
      <input
        type='search'
        ref={inputRef}
        placeholder='Search'
        id='message'
        name='message'
        style={{ height: 50 }}
      />
      <button
        onClick={handleClick}
        class='bg-blue-600'
        style={{ marginLeft: 10, width: 150, height: 50, color: 'white' }}
        id='submit'
      >
        <em style={{ fontWeight: 'bold' }}>Submit</em>
      </button>
      <div
        className='row'
        style={{ display: NotFound ? 'block' : 'none' }}
      ></div>
    </div>
  );
};

export default SearchBar;
