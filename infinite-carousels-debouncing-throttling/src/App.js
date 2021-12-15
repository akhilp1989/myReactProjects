//import logo from './logo.svg';
import './App.css';
import Carousels from './Components/Carousels';
import Debouncer from './Components/Debouncer';

function App() {
  let showCarousels = false;
  return (
    <div className="App">
      <h1>Car's</h1>
     {showCarousels ? <Carousels /> : <Debouncer />} 
    </div>
  );
}

export default App;
