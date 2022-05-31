import DefaultLayout from '@containers/DefaultLayout';
import {
  SecHomeWrapper,
  SecBetPlayground,
  SecBetResult,
  SecBetPlaygroundTop,
  DivBetOptionsCard,
  BtnBetSelect,
  DivBetResultCard,
  DivBetResultCardCenter,
  DivBetResultCardLeft,
  DivBetResultCardRight,
  DivBetResultTop,
  DivBetResultBottomBox,
  DivBetResultBottom,
  BtnBetResultSubmit,
  DivFilterBox,
  SelectFilterBox,
} from './home.styles';
import { useApp } from '@store/AppContext';
import { IMarket, BetOptionsType } from '@store/types';
import { useState, useEffect } from 'react';

function Home() {
  const [selectedMarket, setSelectedMarket] = useState<IMarket | null>(null);
  const [amount, setAmount] = useState(100);
  const { teams, markets, setBets, bets } = useApp();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setSelectedMarket(markets?.[0] || null);
    }
    return () => {
      isMounted = false;
    };
  }, [markets]);

  const handleMarketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMarket(
      markets.find((m) => m.id === parseInt(e.target.value)) || null
    );
  };

  const onBetSelected = (option: BetOptionsType, teamId: number) => {
    const myTeam = teams.find((t) => t.id === teamId);

    // check if bet exists and modify option
    if (
      bets?.find((b) => b.team.id === myTeam?.id) &&
      bets?.find((b) => b.market.id === selectedMarket.id)
    ) {
      setBets(() =>
        bets.map((b) => {
          if (b.team.id === myTeam.id && b.market.id === selectedMarket.id) {
            return {
              ...b,
              result: option,
            };
          }
          return b;
        })
      );

      return;
    }

    setBets([
      ...bets,
      {
        market: selectedMarket,
        team: myTeam,
        result: option,
      },
    ]);
  };

  const removeBet = (
    marketId: number,
    teamId: number,
    result: BetOptionsType
  ) => {
    setBets(
      bets.filter(
        (b) =>
          !(
            b.market.id === marketId &&
            b.team.id === teamId &&
            b.result === result
          )
      )
    );
  };

  const totalOdds = bets?.reduce((acc, curr) => {
    acc += curr.result === 'win' ? curr?.team?.win : 0;
    return acc;
  }, 0);

  return (
    <DefaultLayout title="Home">
      <SecHomeWrapper>
        <SecBetPlayground>
          <DivFilterBox>
            <span>Markets:</span>
            <SelectFilterBox
              defaultValue={selectedMarket?.id}
              onChange={handleMarketChange}
            >
              {markets.map((market) => (
                <option value={market.id} key={market.id}>
                  {market.name}
                </option>
              ))}
            </SelectFilterBox>
          </DivFilterBox>
          <SecBetPlaygroundTop>
            <section className="top-left">
              <h6>Teams</h6>
            </section>
            <section className="top-right">
              <h6>
                {selectedMarket?.id === 2
                  ? 'Yes'
                  : selectedMarket?.id === 3
                  ? '1X'
                  : '1'}
              </h6>
              {selectedMarket?.id !== 2 && (
                <h6>{selectedMarket?.id === 3 ? '12' : 'X'}</h6>
              )}
              <h6>
                {selectedMarket?.id === 2
                  ? 'No'
                  : selectedMarket?.id === 3
                  ? 'X2'
                  : '2'}
              </h6>
            </section>
          </SecBetPlaygroundTop>
          {teams.map((team) => (
            <DivBetOptionsCard key={team.id}>
              <div className="left">
                <h5>{team.home}</h5>
                <h5>{team.away}</h5>
              </div>
              <div className="right">
                <BtnBetSelect
                  onClick={() => onBetSelected('win', team.id)}
                  isActive={
                    !!bets.find(
                      (b) =>
                        b.team.id === team.id &&
                        b.market.id === selectedMarket.id &&
                        b.result === 'win'
                    )
                  }
                >
                  {team.win}
                </BtnBetSelect>
                {selectedMarket?.id !== 2 && (
                  <BtnBetSelect
                    onClick={() => onBetSelected('draw', team.id)}
                    isActive={
                      !!bets.find(
                        (b) =>
                          b.team.id === team.id &&
                          b.market.id === selectedMarket.id &&
                          b.result === 'draw'
                      )
                    }
                  >
                    {team.draw}
                  </BtnBetSelect>
                )}
                <BtnBetSelect
                  onClick={() => onBetSelected('lose', team.id)}
                  isActive={
                    !!bets.find(
                      (b) =>
                        b.team.id === team.id &&
                        b.market.id === selectedMarket.id &&
                        b.result === 'lose'
                    )
                  }
                >
                  {team.lose}
                </BtnBetSelect>
              </div>
            </DivBetOptionsCard>
          ))}
        </SecBetPlayground>
        <SecBetResult>
          <DivBetResultTop>
            {bets?.map((bet, index) => (
              <DivBetResultCard key={index}>
                <DivBetResultCardLeft>
                  <button
                    type="button"
                    onClick={() =>
                      removeBet(bet.market.id, bet.team.id, bet.result)
                    }
                  >
                    &times;
                  </button>
                </DivBetResultCardLeft>
                <DivBetResultCardCenter>
                  <a href="#">
                    {bet?.team?.home} Vs. {bet?.team?.away}
                  </a>
                  <div className="odds">
                    <h6>{bet?.market?.name}</h6>
                    <span />
                    <h6>
                      {bet?.result === 'win'
                        ? bet?.team?.home
                        : bet?.result === 'draw'
                        ? 'Draw'
                        : bet?.team?.away}
                    </h6>
                  </div>
                </DivBetResultCardCenter>
                <DivBetResultCardRight>
                  <h6>
                    {bet?.result === 'win'
                      ? bet?.team?.win
                      : bet?.result === 'draw'
                      ? bet?.team?.draw
                      : bet?.team?.lose}
                  </h6>
                </DivBetResultCardRight>
              </DivBetResultCard>
            ))}
          </DivBetResultTop>
          <DivBetResultBottom>
            <DivBetResultBottomBox>
              <h5>Total Odds</h5>
              <h5>{totalOdds}</h5>
            </DivBetResultBottomBox>
            <DivBetResultBottomBox>
              <h5>Final Payout</h5>
              <h5>KES{(totalOdds * amount).toFixed(2)}</h5>
            </DivBetResultBottomBox>
            <DivBetResultBottomBox hasBg>
              <h4>Amount (KES)</h4>
              <div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
              </div>
            </DivBetResultBottomBox>
            <DivBetResultBottomBox>
              <div>
                <BtnBetResultSubmit type="button">Share</BtnBetResultSubmit>
              </div>
              <div style={{ flex: 1 }}>
                <BtnBetResultSubmit isYellow>
                  Place Bet for KES {(amount * totalOdds).toFixed(2)}
                </BtnBetResultSubmit>
              </div>
            </DivBetResultBottomBox>
          </DivBetResultBottom>
        </SecBetResult>
      </SecHomeWrapper>
    </DefaultLayout>
  );
}

export default Home;
