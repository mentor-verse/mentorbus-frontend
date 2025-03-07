const GoogleLoginRedirect = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    // console.log(await auth.currentUser?.getIdToken());
    await signInWithPopup(auth, provider)
      .then(async (data) => {
        const uid = data.user.uid;
        const socialType = "GOOGLE";
        const email = data.user.email ?? "";

        fetchLogin(socialType, uid, email)
          .then((res) => {
            console.log(res);
            if (res?.data.result == 201) {
              navigate("/main");
            } else {
              console.log(123);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  return <></>;
};

export default GoogleLoginRedirect;
