import '../pod/styles/loading.css';

const loading = (data) => {
  return (
    <main class='loading-container'>
      <p class='spinner-text'>loading...</p>
      <div class='spinner'></div>
    </main>
  );
};

export default loading;
