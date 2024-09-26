import logo from './logo.svg';
import './App.css';
import { TotalMinting } from './components/Totals';
import { TopHolders } from './components/TopHolders';
import { MintingActivity } from './components/MintingActivity';

function App() {
  return (
    <div className="App">
      <TotalMinting />
      <MintingActivity />
      <TopHolders />
    </div>
  );
}

export default App;
