import { useEffect, useState } from 'react';
import useTelegram from '../Hooks/useTelegram'

import './App.css';



const App = () => {

  const [name, setName] = useState();
  const {user} = useTelegram();

  useEffect(() => {
    setName(
      JSON.stringify(user)
    )
  }, [])

  return (
    <div className="App">
        {name}
    </div>
  );
}

export default App;
