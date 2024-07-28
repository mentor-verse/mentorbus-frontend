const KakaoLogin = () => {
    const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY; // REST API KEY
    const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI; 
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleLogin = () => {
        window.location.href = kakaoURL;
    }
    

    const code = new URL(window.location.href).searchParams.get("code");

    console.log(code)


    return (
        <>
            <button onClick={handleLogin}>카카오 로그인</button>
        </>
    );
}

export default KakaoLogin;
