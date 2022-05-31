export type BetOptionsType = 'win' | 'lose' | 'draw';
export interface IMarket {
  id: number;
  name: string;
}

export interface ITeam {
  id: number;
  home: string;
  away: string;
  win: number;
  draw: number;
  lose: number;
}

export interface IBet {
  team: ITeam;
  market: IMarket;
  result: BetOptionsType;
}

export interface IState {
  markets: IMarket[];
  setMarkets: React.Dispatch<React.SetStateAction<IMarket[]>>;
  teams: ITeam[];
  setTeams: React.Dispatch<React.SetStateAction<ITeam[]>>;
  bets: IBet[];
  setBets: React.Dispatch<React.SetStateAction<IBet[]>>;
}
