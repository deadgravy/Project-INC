import '../pod/styles/loading.css';

const loading = (data) => {
  return (
    <main className='loading-container'>
      <p className='spinner-text'>loading...</p>
      <div className='spinner'></div>
    </main>
  );
};

export default loading;
