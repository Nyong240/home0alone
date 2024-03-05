
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SocketContext, socket, flask_adress } from './context/socket'
import './App.css';

function App() {
  return (
    <SocketContext.Provider value={{socket,flask_adress}}>
      <div className='centered'>
        <Main/>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
