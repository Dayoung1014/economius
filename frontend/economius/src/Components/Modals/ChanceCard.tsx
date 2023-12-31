import Modal from 'react-modal';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { IsModalOpenState, CallBackState } from '/src/recoil/animation/atom';
import { ChanceCardInfoState } from '/src/recoil/modalInfo/atom';
import { PlayerToRollState, PlayerIdState } from '/src/recoil/game/atom';
import * as S from './ChanceCard.style';
import { effectAudioPopup, effectAudioClick } from '/src/Audio';

function ChanceCard() {
    const playerId = useRecoilValue(PlayerIdState);
    const playerToRoll = useRecoilValue(PlayerToRollState);
    // const dummy = {
    //     title: '교통사고',
    //     desc: '교통사고를 당했습니다.',
    //     // TODO: result에서 주식이든 자산이든 변경되는 뭔가가 들어올 듯
    //     result: '',
    // };

    // 원래는 초기값 false로 두고 해당 위치 되면 true로 바꿔줘야할듯
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const [chanceCardInfo, setChanceCardInfo] = useRecoilState(ChanceCardInfoState);
    // 턴 종료 플래그
    const setCallBack = useSetRecoilState(CallBackState);
    console.log(chanceCardInfo);
    const closeModal = () => {
        if (playerToRoll !== playerId) return;
        setChanceCardInfo(null);
        setIsModalOpen(false);
        setCallBack(true);
    };

    useEffect(() => {
        effectAudioPopup.play(); // 출력할 위치에 작성
        return () => {
            effectAudioClick.play(); // 출력할 위치에 작성
        };
    }, []);

    return (
        <Modal isOpen={isModalOpen} style={S.modalStyle} onRequestClose={playerToRoll !== playerId ? null : closeModal}>
            {!(chanceCardInfo === null) ? (
                <S.ChanceCard>
                    <S.ChanceCardTop>
                        <S.ChanceCardTopTitle>{chanceCardInfo.name}</S.ChanceCardTopTitle>
                        <S.ChanceCardTopImg src={chanceCardInfo.url} alt='chanceCardImage' />
                    </S.ChanceCardTop>
                    <S.ChanceCardDivide />
                    <S.ChanceCardBottom>
                        <div>
                            {chanceCardInfo.description.split('.').map((line, index, array) => (
                                <span key={index}>
                                    {line}
                                    {/* 마지막 요소가 아닌 경우에만 .과 줄바꿈을 추가합니다. */}
                                    {index < array.length - 1 && (
                                        <>
                                            <span>.</span>
                                            <br />
                                        </>
                                    )}
                                </span>
                            ))}
                        </div>
                        <div>
                            {chanceCardInfo.moneyCard ? (
                                <div>
                                    <div>현금 -{chanceCardInfo.eventValue.toLocaleString()}</div>
                                    <div>
                                        {chanceCardInfo.apply === 'HX'
                                            ? '(상해 보험이 적용됩니다.)'
                                            : chanceCardInfo.apply === 'HS'
                                            ? '(상해 특약 보험이 적용됩니다.)'
                                            : chanceCardInfo.apply === 'MX'
                                            ? '(의료 보험이 적용됩니다.)'
                                            : chanceCardInfo.apply === 'MS'
                                            ? '(의료 특약 보험이 적용됩니다.)'
                                            : chanceCardInfo.apply}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {chanceCardInfo.apply} 업종
                                    {chanceCardInfo.eventValue > 0 ? ` ${chanceCardInfo.eventValue} % 상승` : ` ${Math.abs(chanceCardInfo.eventValue)} % 하락`}
                                </div>
                            )}
                        </div>
                    </S.ChanceCardBottom>
                </S.ChanceCard>
            ) : (
                `로딩중입니다...`
            )}
        </Modal>
    );
}

export default ChanceCard;
