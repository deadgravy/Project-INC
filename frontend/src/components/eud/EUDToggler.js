const EUDToggler = ({ buttonState, setButtonState }) => {
  function handleClick(e) {
    if (buttonState !== e.target.id) {
      setButtonState(e.target.id);
    }
    console.log(e.target.id);
  }

  return (
    <div className='tri-state-toggle'>
      <button
        className={
          buttonState === 'toggle-button1'
            ? 'tri-state-toggle-button active'
            : 'tri-state-toggle-button'
        }
        id='toggle-button1'
        onClick={handleClick}
      >
        Daily
      </button>

      <button
        className={
          buttonState === 'toggle-button2'
            ? 'tri-state-toggle-button active'
            : 'tri-state-toggle-button'
        }
        id='toggle-button2'
        onClick={handleClick}
      >
        Weekly
      </button>
    </div>
  );
};

export default EUDToggler;
