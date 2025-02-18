const AppleLogin = () => {
  const loginWithApple = async (e) => {
    e.preventDefault();
    console.log("sign in with apple");

    // 실제 값을 사용하세요.
    window.AppleID.auth.init({
      clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
      scope: "kang email",
      redirectURI: import.meta.env.VITE_APPLE_REDIRECT_URI,
      state: "state_parameter",
      nonce: "random_nonce",
      usePopup: true,
    });

    try {
      const res = await window.AppleID.auth.signIn();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={loginWithApple}>Apple 로그인</button>;
};

export default AppleLogin;
