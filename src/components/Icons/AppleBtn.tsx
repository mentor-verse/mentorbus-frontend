import { FaApple } from "react-icons/fa";

export function AppleBtn() {
  return (
    <div className="bg-black w-[45px] h-[45px] rounded-full flex justify-center align-middle">
      <button>
        <FaApple className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
