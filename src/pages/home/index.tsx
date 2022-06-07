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
import { useState, useEffect, useMemo, useCallback } from 'react';

function Home() {
  const [selectedMarket, setSelectedMarket] = useState<IMarket | null>(null);
  const [amount, setAmount] = useState(100);

  const { teams, markets, setBets, bets } = useApp();

  const marketSet = useMemo(() => {
    return markets.reduce((acc, curr) => {
      acc = { ...acc, [curr.id]: curr };

      return acc;
    }, {});
  }, [markets]);

  const teamSet = useMemo(() => {
    return teams.reduce((acc, curr) => {
      acc = { ...acc, [curr.id]: curr };

      return acc;
    }, {});
  }, [teams]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setSelectedMarket(markets?.[0] || null);
    }
    return () => {
      isMounted = false;
    };
  }, [markets]);

  const handleMarketChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedMarket(marketSet?.[parseInt(e.target.value)] || null);
    },
    [selectedMarket]
  );

  const onBetSelected = useCallback(
    (option: BetOptionsType, teamId: number) => {
      const selectedKey = `${teamId},${selectedMarket?.id}`;

      if (bets?.[selectedKey]) {
        setBets((prevBets) => ({
          ...prevBets,
          [selectedKey]: { ...bets?.[selectedKey], result: option },
        }));
        return;
      }

      setBets((prevBets) => ({
        ...prevBets,
        [selectedKey]: {
          // [teamid,marketid]
          market: selectedMarket,
          team: teamSet?.[teamId],
          result: option,
        },
      }));
    },
    [setBets, selectedMarket]
  );

  const removeBet = useCallback(
    (marketId: number, teamId: number) => {
      const selectedKey = `${teamId},${marketId}`;

      let filteredBet = { ...bets };
      delete filteredBet?.[selectedKey];

      setBets(filteredBet);
    },
    [bets]
  );

  const totalOdds = Object.keys(bets || {}).reduce((acc, curr) => {
    const b = bets?.[curr];
    acc *= b?.result === 'win' ? b?.team?.win : 1;

    return acc;
  }, 1);

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
                    bets?.[`${team?.id},${selectedMarket?.id}`]?.result ===
                    'win'
                  }
                >
                  {team.win}
                </BtnBetSelect>
                {selectedMarket?.id !== 2 && (
                  <BtnBetSelect
                    onClick={() => onBetSelected('draw', team.id)}
                    isActive={
                      bets?.[`${team?.id},${selectedMarket?.id}`]?.result ===
                      'draw'
                    }
                  >
                    {team.draw}
                  </BtnBetSelect>
                )}
                <BtnBetSelect
                  onClick={() => onBetSelected('lose', team.id)}
                  isActive={
                    bets?.[`${team?.id},${selectedMarket?.id}`]?.result ===
                    'lose'
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
            {Object.keys(bets || {})?.map((bet, index) => (
              <DivBetResultCard key={index}>
                <DivBetResultCardLeft>
                  <button
                    type="button"
                    onClick={() =>
                      removeBet(bets?.[bet]?.market?.id, bets?.[bet]?.team.id)
                    }
                  >
                    &times;
                  </button>
                </DivBetResultCardLeft>
                <DivBetResultCardCenter>
                  <a href="#">
                    {bets?.[bet]?.team?.home} Vs. {bets?.[bet]?.team?.away}
                  </a>
                  <div className="odds">
                    <h6>{bets?.[bet]?.market?.name}</h6>
                    <span />
                    <h6>
                      {bets?.[bet]?.market?.id === 2
                        ? bets?.[bet]?.result === 'win'
                          ? 'Yes'
                          : 'No'
                        : bets?.[bet]?.result === 'win'
                        ? bets?.[bet]?.team?.home
                        : bets?.[bet]?.result === 'draw'
                        ? 'Draw'
                        : bets?.[bet]?.team?.away}
                    </h6>
                  </div>
                </DivBetResultCardCenter>
                <DivBetResultCardRight>
                  <h6>
                    {bets?.[bet]?.result === 'win'
                      ? bets?.[bet]?.team?.win
                      : bets?.[bet]?.result === 'draw'
                      ? bets?.[bet]?.team?.draw
                      : bets?.[bet]?.team?.lose}
                  </h6>
                </DivBetResultCardRight>
              </DivBetResultCard>
            ))}
          </DivBetResultTop>
          <DivBetResultBottom>
            <DivBetResultBottomBox>
              <h5>Total Odds</h5>
              <h5>{totalOdds.toFixed(2)}</h5>
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
