import { useEffect, useState } from 'react';
import {useTelegram} from '../Hooks/useTelegram'

import './App.css';



const App = () => {

  const [name, setName] = useState();
  const {tg, user} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [])

  useEffect(() => {
    setName(
      JSON.stringify(user)
    )
  }, [user])

  return (
    <div className="App">
        {name}
    </div>
  );
}

export default App;
