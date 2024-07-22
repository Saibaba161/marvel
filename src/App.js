import CharacterData from "./pages/characters";
//import logo from './assets/logo.webp'
import logo2 from './assets/logo2.jpg'

function App() {
  return (
    <div className="App">
      <header className="header">
        <img 
          src={logo2}
          alt="Marvel Logo"
          style={{width: '200px', height: '100px'}}
        />
        <h1>Marvel App</h1>
      </header>
      <CharacterData />
    </div>
  );
}

export default App;
