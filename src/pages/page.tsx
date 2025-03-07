import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    navigate("/");
    window.location.reload();
    await signOut(auth);
  };

  return (
    <div>
      asd
      <div onClick={Logout}>Logout</div>
    </div>
  );
};
