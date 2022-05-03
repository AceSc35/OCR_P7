//Création du hook-contest pour stocker l'userId (decodedId) et permet d'éviter de rappeler au serveur à chaque fois que l'on a besoin

import { createContext } from 'react';

export const UidContext = createContext();
