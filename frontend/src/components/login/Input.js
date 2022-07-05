const Input = (props) => {
  const { type, placeholder, icon, value } = props;
  return (
    <div className='input-control w-100p'>
      <input
        type={type}
        className='input-contains-icon'
        placeholder={placeholder}
        required
      />
      <span className='icon'>
        <i className={icon}></i>
      </span>
    </div>
  );
};

export default Input;
