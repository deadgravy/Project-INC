import { useState } from 'react';

const Toggler = () => {
  const [buttonState, setButtonState] = useState('toggle-button1');

  function handleClick(e) {
    if (buttonState !== e.target.id) {
      setButtonState(e.target.id)
    }
    console.log(e.target.id)
  }

  return (
    <div className='tri-state-toggle'>
      <button className={buttonState === 'toggle-button1' ? 'tri-state-toggle-button active' : 'tri-state-toggle-button'} id='toggle-button1' onClick={handleClick}>
        Daily
      </button>

      <button className={buttonState === 'toggle-button2' ? 'tri-state-toggle-button active' : 'tri-state-toggle-button'} id='toggle-button2' onClick={handleClick}>
        Weekly
      </button>

      <button className={buttonState === 'toggle-button3' ? 'tri-state-toggle-button active' : 'tri-state-toggle-button'} id='toggle-button3' onClick={handleClick}>
        Monthly
      </button>
    </div>
  );
};

export default Toggler;
