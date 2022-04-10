import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

import { Board } from './components/Board';
import { SocektProvider } from './provider/socketProvider';
import './styles/index.css';

const socket = io("http://localhost:3000")

function App() {

  return (
    <SocektProvider value={{ socket: socket }}>
      <div className='app'>
        <Board />
      </div>
    </SocektProvider>
  );
}

export default App;
