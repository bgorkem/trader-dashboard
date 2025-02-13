import { FC, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import { useAppSelector } from "../../store/hooks";
import { StockRow } from "./StockRow";
import styled from "styled-components";

const ListContainer = styled.div`
  background: #2c2c2c;
  border-radius: 8px;
  padding: 1rem;
  height: calc(100vh - 150px);
`;

const StockList: FC = () => {
  const stocks = useAppSelector((state) => state.stocks.stocks);

  const stockList = useMemo(() => {
    return Object.values(stocks).sort((a, b) =>
      a.symbol.localeCompare(b.symbol)
    );
  }, [stocks]);

  return (
    <ListContainer>
      <List
        height={window.innerHeight - 150}
        itemCount={stockList.length}
        itemSize={60}
        width="100%"
      >
        {({ index, style }) => (
          <StockRow stock={stockList[index]} style={style} />
        )}
      </List>
    </ListContainer>
  );
};

export default StockList;
