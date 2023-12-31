import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IsMovingState, MoveDistState, MovementCardState, MovementCardOpenState, MovementCardConfirmState } from '../../recoil/animation/atom';
import { PlayerToRollState, PlayerIdState } from '/src/recoil/game/atom';
import { useSpring, animated } from '@react-spring/web';
import Modal from 'react-modal';
import woncardfront from '/MovementCard/woncardfront.png';
import woncardback from '/MovementCard/woncardback.png';
import * as S from './MovementCard.style';
import { effectAudioPopup, effectAudioClick } from '/src/Audio';
import OtherPerson from './OtherPerson';

function Card({ idx, value, flip, top, left, selected, CardClick }) {
    const { opacity, transform } = useSpring({
        opacity: flip ? 1 : 0,
        transform: `perspective(600px) rotateY(${flip ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    const imageSize = useSpring({
        width: selected === idx ? '140px' : '120px', // 20px 커지게 변경
        left: selected === idx ? `${parseFloat(left) - 2.5}%` : left,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    return (
        <div>
            <animated.div
                style={{
                    position: 'absolute',
                    top: top,
                    left: left,
                    width: '120px',
                    aspectRatio: '58/90',
                    opacity: opacity.to(o => 1 - o),
                    transform,
                    backgroundImage: `url(${woncardback})`,
                    backgroundSize: 'contain',
                    cursor: 'pointer',
                }}
            ></animated.div>
            <animated.div
                onClick={() => (CardClick(), effectAudioClick.play())}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: top,
                    left: left,
                    ...imageSize,
                    opacity,
                    transform,
                    aspectRatio: '58/90',
                    rotateY: '180deg',
                    backgroundImage: `url(${woncardfront})`,
                    backgroundSize: 'contain',
                    border: 'soild 1px red',
                    cursor: 'pointer',
                }}
            >
                <S.Number>{value}</S.Number>
            </animated.div>
        </div>
    );
}

function MovementCard({}) {
    const [isMoving, setIsMoving] = useRecoilState(IsMovingState); // 캐릭터 이동 여부
    const [moveDist, setMoveDist] = useRecoilState(MoveDistState); // 캐릭터 이동 여부
    const [movementCard, setMovementCard] = useRecoilState(MovementCardState);
    const [movementCardOpen, setMovementCardOpen] = useRecoilState(MovementCardOpenState);
    const [movementCardConfirm, setMovementCardConfirm] = useRecoilState(MovementCardConfirmState);
    const PlayerToRoll = useRecoilValue(PlayerToRollState);
    const PlayerId = useRecoilValue(PlayerIdState);
    // 선택된 이동카드 인덱스
    const [selected, setSelected] = useState(-1);

    const [flip1, setFlip1] = useState(false);
    const [flip2, setFlip2] = useState(false);
    const [flip3, setFlip3] = useState(false);

    const flipAll = () => {
        setTimeout(() => setFlip1(true), 400);
        setTimeout(() => setFlip2(true), 700);
        setTimeout(() => setFlip3(true), 1000);
    };

    const closeModal = () => {
        setMovementCardOpen(false);
        setMovementCard(null);
        setSelected(-1);
        setFlip1(false);
        setFlip2(false);
        setFlip3(false);
    };

    // 3장 뒤집기
    useEffect(() => {
        if (!movementCardOpen) return;
        flipAll();
    }, [movementCardOpen]);

    // movePlay 에서 응답을 받았을 때 값 초기화
    useEffect(() => {
        closeModal();
    }, [isMoving]);

    // 내 차례일 때 선택 누르기
    const MoveButtonClick = (selectednum: number) => {
        setMoveDist(selectednum === -1 ? movementCard[1] : movementCard[selectednum]);
        if (selectednum === -1) {
            setSelected(1);
        }
        setTimeout(() => {
            setMovementCardConfirm(true);
        }, 500);
    };

    useEffect(() => {
        effectAudioPopup.play(); // 출력할 위치에 작성
        return () => {
            effectAudioClick.play(); // 출력할 위치에 작성
        };
    }, []);

    return PlayerToRoll === PlayerId ? (
        <Modal isOpen={movementCardOpen} style={S.modalStyle}>
            {movementCard === null ? (
                `로딩중입니다...`
            ) : (
                <>
                    <Card idx={0} value={movementCard[0]} top={'10%'} left={'8%'} flip={flip1} selected={selected} CardClick={() => setSelected(0)} />
                    <Card idx={1} value={movementCard[1]} top={'10%'} left={'38%'} flip={flip2} selected={selected} CardClick={() => setSelected(1)} />
                    <Card idx={2} value={movementCard[2]} top={'10%'} left={'68%'} flip={flip3} selected={selected} CardClick={() => setSelected(2)} />
                    <S.Button onClick={() => (MoveButtonClick(selected), effectAudioClick.play())}>이동카드 선택</S.Button>
                </>
            )}
        </Modal>
    ) : (
        <OtherPerson />
    );
}

export default MovementCard;
