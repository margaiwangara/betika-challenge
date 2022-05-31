import { remify } from '@utils/remify';
import styled from 'styled-components';

export const SecHomeWrapper = styled.section`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden auto;
`;

export const SecBetPlayground = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
`;

export const SecBetPlaygroundTop = styled.section`
  display: flex;
  align-items: center;

  .top-left,
  .top-right {
    flex: 1;
  }

  .top-right {
    display: flex;
    h6 {
      flex: 1;
      text-align: center;
    }
  }

  h6 {
    color: ${(p) => p.theme.colors.gray};
    font-size: ${remify(12)};
    font-weight: 400;
  }
`;

export const SecBetResult = styled.section`
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 1rem ${remify(10)};
`;

// Component Card
export const DivBetOptionsCard = styled.div`
  display: flex;
  align-items: center;
  .left,
  .right {
    display: flex;
    gap: 0.2rem;
    flex: 1;
  }

  .left {
    flex-direction: column;
  }

  h5 {
    font-weight: 500;
    font-size: ${remify(14)};
    color: ${(p) => p.theme.colors.white};
    text-transform: capitalize;
  }
`;

export const BtnBetSelect = styled.button<{ isActive?: boolean }>`
  background-color: ${(p) =>
    p.isActive ? p.theme.colors.yellow : p.theme.colors.primary};
  border-radius: ${remify(15)};
  color: ${(p) => p.theme.colors.white};
  text-align: center;
  font-weight: 500;
  font-size: ${remify(15)};
  flex: 1;
  padding: ${remify(8)} ${remify(5)};
`;

// container core
export const DivBetResultTop = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const DivBetResultBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: solid 1px ${(p) => p.theme.colors.gray};
  padding: 1rem 0;
`;

export const DivBetResultBottomBox = styled.div<{ hasBg?: boolean }>`
  background-color: ${(p) =>
    p.hasBg ? p.theme.colors.primary : 'transparent'};
  border-radius: ${(p) => (p.hasBg ? remify(4) : 0)};
  padding: ${(p) => (p.hasBg ? `1rem ${remify(10)}` : 0)};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  justify-content: space-between;

  h5 {
    font-size: ${remify(14)};
    font-weight: 300;
    color: ${(p) => p.theme.colors.gray};

    &:nth-of-type(even) {
      font-weight: 500;
      color: ${(p) => p.theme.colors.white};
    }
  }

  h4 {
    font-size: ${remify(16)};
    color: ${(p) => p.theme.colors.white};
    font-weight: 500;
    flex: 2;
  }

  div {
    flex: 1;
    display: flex;
  }

  input[type='number'] {
    background-color: transparent;
    color: ${(p) => p.theme.colors.white};
    font-size: ${remify(16)};
    font-weight: 500;
    text-align: right;
    border: none;
    width: 100%;
  }
`;

// another component
export const DivBetResultCard = styled.div`
  background-color: ${(p) => p.theme.colors.primary};
  border-radius: ${remify(8)};
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.5rem;

  .left,
  .right {
    padding: 0.2rem;
  }
`;

export const DivBetResultCardContent = styled.div`
  padding: 0.2rem;
  display: flex;
`;

export const DivBetResultCardLeft = styled(DivBetResultCardContent)`
  align-items: center;
  justify-content: center;

  button {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: ${(p) => p.theme.colors.gray};
    color: ${(p) => p.theme.colors.black};
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.15rem;
  }
`;

export const DivBetResultCardCenter = styled(DivBetResultCardContent)`
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;

  a {
    font-weight: 500;
    color: ${(p) => p.theme.colors.white};
    font-size: ${remify(12)};
    text-transform: capitalize;
  }

  .odds {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    span {
      display: inline-block;
      height: 5px;
      width: 5px;
      border-radius: 50%;
      background-color: ${(p) => p.theme.colors.gray};
    }
  }

  h6 {
    font-weight: 300;
    font-size: ${remify(12)};
    color: ${(p) => p.theme.colors.gray};
  }
`;

export const DivBetResultCardRight = styled(DivBetResultCardContent)`
  align-items: center;
  justify-content: center;

  h6 {
    color: ${(p) => p.theme.colors.secondary};
    font-weight: 300;
    font-size: ${remify(12)};
  }
`;

export const BtnBetResultSubmit = styled.button<{ isYellow?: boolean }>`
  background-color: ${(p) =>
    p.isYellow ? p.theme.colors.yellow : p.theme.colors.primary};
  padding: 1rem;
  text-align: center;
  font-size: ${remify(14)};
  font-weight: 500;
  color: ${(p) => (p.isYellow ? p.theme.colors.black : p.theme.colors.white)};
  border-radius: ${remify(4)};
  width: 100%;
  margin-left: ${(p) => (p.isYellow ? '0.5rem' : 0)};
`;

export const DivFilterBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
  gap: 0.5rem;
  align-items: center;
  font-size: ${remify(12)};
  font-weight: 500;
  color: ${(p) => p.theme.colors.white};
`;

export const SelectFilterBox = styled.select`
  background-color: ${(p) => p.theme.colors.primary};
  padding: 0.2rem;
  font-size: ${remify(12)};
  color: ${(p) => p.theme.colors.white};
  font-weight: 500;
  border: none;
  border-radius: ${remify(4)};
`;
