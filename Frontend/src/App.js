import logo from './logo.svg';
import './App.css';
//import './index.css'
import { TodoLists } from './Components';
import { Counter } from './components-counter/Counter';
import { CutomHookUser } from './Components/CustomHooks/CutomHookUser';
import { ModeProvider } from './Components/MyContext';
function App() {
  return (

    <div className="App">
      <div >
     
      <TodoLists></TodoLists>
      
      {/* <Counter></Counter> */}
      {/* <CutomHookUser></CutomHookUser> */}
      </div>
    
    </div>
  );
}

export default App;
