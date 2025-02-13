import { FC, memo } from "react";
import { Stock } from "../../types/stock";
import styled from "styled-components";

interface StockRowProps {
  stock: Stock;
  style: React.CSSProperties;
}

const Row = styled.div`
  display: grid;
  grid-template-columns: 100px 120px 120px 120px 150px;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #3a3a3a;

  &:hover {
    background-color: #3a3a3a;
  }
`;

const Symbol = styled.div`
  font-weight: bold;
  color: #ffffff;
`;

const Price = styled.div`
  font-family: monospace;
  font-size: 1.1rem;
`;

const Change = styled.div<{ isPositive: boolean }>`
  color: ${({ isPositive }) => (isPositive ? "#4caf50" : "#f44336")};
  font-family: monospace;
`;

const Volume = styled.div`
  color: #a0a0a0;
  font-family: monospace;
`;

export const StockRow: FC<StockRowProps> = memo(({ stock, style }) => {
  const { symbol, price, change, percentChange, volume } = stock;
  const isPositive = change >= 0;

  const formatPrice = (value: number) => value.toFixed(2);
  const formatVolume = (value: number) =>
    new Intl.NumberFormat("en-US").format(value);

  return (
    <Row style={style}>
      <Symbol>{symbol}</Symbol>
      <Price>${formatPrice(price)}</Price>
      <Change isPositive={isPositive}>
        {isPositive ? "+" : ""}
        {formatPrice(change)}
      </Change>
      <Change isPositive={isPositive}>
        {isPositive ? "+" : ""}
        {formatPrice(percentChange)}%
      </Change>
      <Volume>{formatVolume(volume)}</Volume>
    </Row>
  );
});

StockRow.displayName = "StockRow";
