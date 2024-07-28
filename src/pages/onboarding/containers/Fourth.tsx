import { Logo } from "@/components/Icons/Logo";
import { OnboardingButton } from "@/components/ui/onboardingbutton";
import { useNavigate } from "react-router-dom";

export function Fourth({ count, setCount, sentence }) {

  const navigate = useNavigate();
  
  const handleNext = (major) => {
    localStorage.setItem('major', major);  // Store the major in localStorage
    navigate('/main');
  };

  return (
    <div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-[70%] -translate-y-2/3 z-10 text-[#fff]">
        <div className="flex items-start mb-3 text-[12px]">{count}/5</div>
        <div className="flex items-start text-[26px] font-bold w-max items-baseline">
          <Logo width={"175"} /> <div>에서</div>
        </div>
        <div className="flex items-start text-[26px] font-bold w-max">{sentence}</div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-2/3 z-50 mt-20">
        <div className="flex">
          <button onClick={() => handleNext('인문계열')}>
            <OnboardingButton className="w-[160px]" title="인문계열" />
          </button>

          <button onClick={() => handleNext('사회계열')}>
            <OnboardingButton className="w-[160px] ml-[12px]" title="사회계열" />
          </button>
        </div>

        <div className="mt-[11px]">
          <button onClick={() => handleNext('자연계열')}>
            <OnboardingButton className="w-[160px]" title="자연계열" />
          </button>

          <button onClick={() => handleNext('공학계열')}>
            <OnboardingButton className="w-[160px] ml-[12px]" title="공학계열" />
          </button>
        </div>

        <div className="mt-[11px]">
          <button onClick={() => handleNext('의학계열')}>
            <OnboardingButton className="w-[160px]" title="의학계열" />
          </button>

          <button onClick={() => handleNext('교육계열')}>
            <OnboardingButton className="w-[160px] ml-[12px]" title="교육계열" />
          </button>
        </div>
      </div>
    </div>
  );
}
