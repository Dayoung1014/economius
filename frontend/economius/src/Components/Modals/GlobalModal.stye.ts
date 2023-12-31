import { styled } from 'styled-components';

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #fff9ee;
`;

export const Top = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TopTitle = styled.div`
    font-size: 28px;
    font-weight: 800;
`;

export const Mid = styled.div`
    flex: 5.85;
    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly; */
    align-items: center;
`;

export const MidImg = styled.img`
    height: 150px;
`;

export const MidNoImg = styled.div`
    flex: 5.85;
    display: flex;
    flex-direction: column;
    font-size: 18px;

    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 30px;
`;

export const MidDesc = styled.div`
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const Divide = styled.div`
    flex: 0.15;
    background-color: white;
`;

export const Button = styled.button`
    flex: 2;
    border: none;
    background: #ffdaae;
    cursor: pointer; /* 커서를 포인터로 설정 */
    transition: all 250ms ease-in-out;

    /* 호버 시 색상 변경 */
    &:hover {
        background: #ffaa55; /* 원하는 색상으로 변경 */
    }
`;

export const RoundButton = styled.button`
    flex: 2.15;
    border: none;
    background: #fff9ee;
    transition: all 250ms ease-in-out;
    span {
        padding: 10px 20px;
        border-radius: 20px;
        background: #ffdaae;
        cursor: pointer; /* 커서를 포인터로 설정 */

        /* 호버 시 색상 변경 */
        &:hover {
            background: #ffaa55; /* 원하는 색상으로 변경 */
        }
    }
`;

export const ButtonOuter = styled.div`
    display: inline;
    /* position: absolute; */
    position: fixed;
    top: 80%;
    /* right: 50%; */
    /* left: 50%; */
`;

export const RoundButtonRoom = styled.button`
    /* flex: 2.15; */
    /* background: #fff9ee; */
    display: inline-block;
    transition: all 250ms ease-in-out;
    font-size: 24px;
    margin: 0 20px;
    padding: 25px 70px;

    width: auto;
    border: 5px solid white;
    border-radius: 15px;
    background: #ffdaae;
    /* 호버 시 색상 변경 */
    &:hover {
        background: #ffaa55; /* 원하는 색상으로 변경 */
    }
    cursor: pointer; /* 커서를 포인터로 설정 */
    background: #ffdaae;
    cursor: pointer; /* 커서를 포인터로 설정 */

    /* 호버 시 색상 변경 */
    &:hover {
        background: #ffaa55; /* 원하는 색상으로 변경 */
    }
    span {
        width: auto;

        /* padding: 10px 20px; */
    }
`;

export const RealRoundButton = styled.span`
    span {
        padding: 10px 20px;
        border-radius: 20px;
        background: #ffdaae;
        cursor: pointer; /* 커서를 포인터로 설정 */

        /* 호버 시 색상 변경 */
        &:hover {
            background: #ffaa55; /* 원하는 색상으로 변경 */
        }
    }
`;

export const ExitButton = styled.img`
    position: absolute;
    top: 17px;
    right: 17px;
`;
