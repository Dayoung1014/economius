import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // axios 불러오기

const KakaoCallback: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        console.log(code);

        if (code) {
            // axios를 사용하여 API에 POST 요청 보내기
            axios
                .post('https://j9b109.p.ssafy.io/api/auth/kakao', {
                    authorizationCode: code, // 받아온 코드를 authorizationCode 필드에 담아서 보냄
                })
                .then(response => {
                    const accessToken = response.headers.accesstoken; // Header에서 accessToken 받아오기
                    const { player, nickname } = response.data; // Body에서 player와 nickname 받아오기

                    // localStorage에 accessToken, player, nickname 저장
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('player', player);
                    localStorage.setItem('nickname', nickname);

                    navigate('/room');
                })
                .catch(error => {
                    // 요청이 실패하면 오류를 처리합니다.
                    console.error('Error during the request', error);
                    navigate('/error');
                });
        } else {
            console.error('No code received');
            navigate('/error');
        }
    }, [location, navigate]);

    return <div>Redirecting...</div>;
};

export default KakaoCallback;
