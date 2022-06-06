import { createContext, useContext, useState } from 'react';
import { ITeam, IMarket, IState, IBetType } from './types';

import MarketData from '@public/data/markets.json';
import TeamData from '@public/data/teams.json';

export const AppContext = createContext<IState | null>(null);

const AppProvider = ({ children }) => {
  const [markets, setMarkets] = useState<IMarket[] | null>(MarketData);
  const [teams, setTeams] = useState<ITeam[] | null>(TeamData);
  const [bets, setBets] = useState<IBetType | null>(null);

  return (
    <AppContext.Provider
      value={{ markets, setMarkets, teams, setTeams, bets, setBets }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
export default AppProvider;
