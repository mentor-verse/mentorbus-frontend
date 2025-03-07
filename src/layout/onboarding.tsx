import Cloud from "@/assets/Cloud.svg?react";
import Cloud2 from "@/assets/Cloud2.svg?react";

const OnBoardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main min-h-screen relative">
      <div>
        <div className="absolute top-[10vh] right-0">
          <Cloud />
        </div>
        <div className="absolute left-0 top-[20vh]">
          <Cloud2 />
        </div>
      </div>
      {children}
    </div>
  );
};

export default OnBoardingLayout;
