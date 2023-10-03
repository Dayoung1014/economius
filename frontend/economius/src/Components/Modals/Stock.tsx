import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { IsModalOpenState, CallBackState } from '/src/recoil/animation/atom';
import { StockDetailState, TradeStockState } from '/src/recoil/trading/atom';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import * as S from './Stock.style';
import StockGraph from '../Common/StockGraph';
import BuyOrSell from '../Common/BuyOrSell';
import { PlayerIdState, PortfolioState, StockState } from '/src/recoil/game/atom.tsx';

function getStocks(stocks, stockId, userId) {
    return stocks[stockId].owners[userId];
}

function makeStockGraphData(stockPriceHistoryData) {
    const graphData = [];
    let index = 0;
    for (index; index < stockPriceHistoryData.length; index++) {
        graphData.push({
            turn: index + 1,
            open: stockPriceHistoryData[index].openingPrice,
            high: stockPriceHistoryData[index].highPrice,
            low: stockPriceHistoryData[index].lowPrice,
            close: stockPriceHistoryData[index].closingPrice,
        });
    }

    for (index; index < 20; index++) {
        graphData.push({
            turn: index + 1,
            open: null,
            high: null,
            low: null,
            close: null,
        });
    }

    return graphData;
}

function Stock() {
    // 턴 종료 플래그
    const setCallBack = useSetRecoilState(CallBackState);

    //  매수,매도 탭 구분 플래그
    const [buyClick, isBuyClick] = useState(true);
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const closeModal = () => {
        setStockDetail(null);
        setIsModalOpen(false);
        setCallBack(true);
    };
    // 주식 매수, 매도 여부
    const [tradeStock, setTradeStock] = useRecoilState(TradeStockState);
    const [stockDetail, setStockDetail] = useRecoilState(StockDetailState);
    const player = useRecoilValue(PlayerIdState);
    const portfolios = useRecoilValue(PortfolioState);
    const stocks = useRecoilValue(StockState);

    // modal style
    const modalStyle: any = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 10,
        },
        content: {
            display: 'flex',
            flexDirextion: 'column',
            backgroundColor: 'rgba(255,255,255,0.95)',
            overflow: 'auto',
            zIndex: 10,
            top: '150px',
            left: '150px',
            right: '550px',
            bottom: '150px',
            border: '5px solid white',
            borderRadius: '20px',
            padding: '0px',
        },
    };

    return (
        <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
            {stockDetail === null ? (
                `loading...`
            ) : (
                <S.StockMain>
                    <S.StockTop>
                        <S.StockTopImg src={`Stock/${stockDetail.stockId}.png`} />
                        <S.StockTopTitle>
                            <S.StockTopTitleEnterprise>{stockDetail.name}</S.StockTopTitleEnterprise>
                            <S.StockTopTitleType>{stockDetail.companyCategory}</S.StockTopTitleType>
                        </S.StockTopTitle>
                    </S.StockTop>
                    <S.StockMid>
                        <S.StockMidLeft>
                            <StockGraph data={makeStockGraphData(stockDetail.priceHistory)} />
                            <S.StockMidLeftPrice>
                                현재가 : {stockDetail.price}
                                {stockDetail.rate >= 0 ? (
                                    <span style={{ color: '#DF7D46' }}> (+{stockDetail.rate}%)</span>
                                ) : (
                                    <span style={{ color: '#DF7D46' }}> ({stockDetail.rate}%)</span>
                                )}
                            </S.StockMidLeftPrice>
                        </S.StockMidLeft>
                        <S.StockMidRight>
                            {/* 매도,매수 */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <S.Main>
                                    <S.BtnSection>
                                        <S.BuyOrSellBtn
                                            onClick={() => {
                                                isBuyClick(true);
                                            }}
                                            style={{
                                                backgroundColor: buyClick ? '#F7BC0F' : 'rgba(247, 188, 15, 0.5)',
                                            }}
                                        >
                                            매수
                                        </S.BuyOrSellBtn>
                                        <S.BuyOrSellBtn
                                            onClick={() => {
                                                isBuyClick(false);
                                            }}
                                            style={{
                                                backgroundColor: !buyClick ? '#F7BC0F' : 'rgba(247, 188, 15, 0.5)',
                                            }}
                                        >
                                            매도
                                        </S.BuyOrSellBtn>
                                    </S.BtnSection>
                                    <BuyOrSell
                                        isBuy={buyClick}
                                        StockOrGold='stock'
                                        price={stockDetail.price}
                                        amount={getStocks(stocks, stockDetail.stockId, player)}
                                        money={portfolios[player].money}
                                    />
                                </S.Main>
                            </div>
                        </S.StockMidRight>
                    </S.StockMid>
                    <S.StockDivide />
                    {buyClick ? (
                        <S.StockBuyBottom onClick={() => setTradeStock([true, false])}>매수하기</S.StockBuyBottom>
                    ) : (
                        <S.StockSellBottom onClick={() => setTradeStock([false, true])}>매도하기</S.StockSellBottom>
                    )}
                </S.StockMain>
            )}
        </Modal>
    );
}

export default Stock;
