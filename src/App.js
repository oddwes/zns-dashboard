import logo from './logo.svg';
import './App.css';
import { TotalMinting } from './components/TotalMinting';
import { TopHolders } from './components/TopHolders';

function App() {
  return (
    <div className="App">
      <TotalMinting />
      <TopHolders />
    </div>
  );
}

export default App;
