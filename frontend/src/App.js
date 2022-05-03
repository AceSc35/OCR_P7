import React, { useEffect, useState } from 'react';

import axios from 'axios';

//Components
import Routes from './components/Routes';
import { getStorage } from './components/Utils/getStorage';
import { UidContext } from './components/Utils/AppContext';

//Redux

import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch(); //dispatch = déclancher une action

  useEffect(() => {
    //Permet d'accepter une fonction qui contient du code impératif(cad des séquences d'instructions exécutées pour modif l'état du programme), pouvant produire des effets.
    //Ils nous permettent d'effectuer une action à un moment donné du cycle de vie de nos composants.
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
        headers: getStorage(),
      })
        .then((res) => {
          setUid(res.data.user.id);
        })
        .catch((err) => {
          console.log('No Token');
        });
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid]); //Chaque fois que uid évolue, on relance le useEffect

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
