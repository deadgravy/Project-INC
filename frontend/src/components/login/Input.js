const Input = (props) => {
  const { type, placeholder, icon } = props;
  return (
    <div className='input-control'>
      <input
        type={type}
        className='input-contains-icon'
        placeholder={placeholder}
      />
      <span className='icon'>
        <i className={icon}></i>
      </span>
    </div>
  );
};

export default Input;
