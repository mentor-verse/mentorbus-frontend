import OnBoardingLayout from "@/layout/onboarding";
import RegisterBus from "@/assets/onBoardingRegisterBus.svg?react";

import LogoSVG from "@/assets/Logo.svg?react";
import NextArrowCircleSVG from "@/assets/icons/next_arrow_circle.svg?react";
import SearchSVG from "@/assets/icons/search.svg?react";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { fetchCheckNickname, fetchRegister } from "@/controllers/api";

const RegisterStepTitle = ({
  stepTitle,
}: {
  stepTitle: { text?: string; subtext?: string };
}) => (
  <>
    <div className="flex gap-2 items-end text-3xl">
      <LogoSVG />
      {stepTitle.subtext}
    </div>
    <p className="text-3xl">{stepTitle.text}</p>
  </>
);

const RegisterStepNicknameTextField = ({
  nickname,
  setNickname,
  nextStep,
}: {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  nextStep: () => void;
}) => {
  const [isValid, setIsValid] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsValid(0);
  };

  const handleCheckNickname = async () => {
    setIsLoading(true);
    const result = await fetchCheckNickname(nickname);
    setIsLoading(false);
    setIsValid(result.data ? 1 : 2);
  };

  const validColor = ["#FFFFFF", "#88e09f", "#ef4444"][isValid];

  return (
    <div className="relative flex flex-col items-end gap-8 w-full">
      <input
        className={`bg-transparent border-b-2 w-full text-center text-3xl
          p-2 my-4 outline-none`}
        style={{ color: validColor, borderColor: validColor }}
        value={nickname}
        onChange={handleChangeNickname}
      />
      <div className="absolute top-full">
        {isValid != 1 ? (
          nickname.trim() && (
            <div
              className={`cursor-pointer p-2 px-4 rounded-md ${
                isValid ? "bg-red-500 text-white" : "bg-white"
              }`}
              onClick={handleCheckNickname}
            >
              {isLoading
                ? "Loading..."
                : isValid
                ? "중복됨"
                : "닉네임 중복 확인"}
            </div>
          )
        ) : (
          <NextArrowCircleSVG
            className="cursor-pointer"
            onClick={() => nextStep()}
          />
        )}
      </div>
    </div>
  );
};

const RegisterStepUserTypeField = ({
  userType,
  setUserType,
  nextStep,
}: {
  userType: string;
  setUserType: Dispatch<SetStateAction<string>>;
  nextStep: () => void;
}) => {
  const userTypeList = [
    {
      type: "MENTEE",
      title: "멘티로 가입하기",
      desc: "입시, 전공 관련 정보를 얻고 싶어요",
    },
    {
      type: "MENTOR",
      title: "멘토로 가입하기",
      desc: "입시, 전공 관련 경험을 나누고 싶어요",
    },
  ];

  const handleSelectUserType = (userType: string) => {
    setUserType(userType);
    nextStep();
  };

  return (
    <div className="flex flex-col gap-4 w-full my-2">
      {userTypeList.map((e) => (
        <div
          className={`cursor-pointer font-bold text-xl p-6 border-2 rounded-md hover:bg-white hover:text-[#5baedd] ${
            e.type == userType ? "bg-white text-[#5baedd]" : "text-white"
          }`}
          onClick={() => {
            handleSelectUserType(e.type);
          }}
        >
          <p className="text-2xl font-bold">{e.title}</p>
          <p>{e.desc}</p>
        </div>
      ))}
    </div>
  );
};

const RegisterStepSearchField = ({
  affiliation,
  setAffiliation,
  nextStep,
}: {
  affiliation: string;
  setAffiliation: Dispatch<SetStateAction<string>>;
  nextStep: () => void;
}) => {
  return (
    <div className="relative flex flex-col items-end gap-8 w-full my-2">
      <div className="relative w-full">
        <input
          className="text-white bg-transparent border-b-2 w-full text-center text-3xl p-2 outline-none"
          value={affiliation}
          onChange={(e) => {
            setAffiliation(e.target.value);
          }}
        />
        <SearchSVG className="cursor-pointer absolute bottom-0 right-0 h-full w-auto p-2" />
      </div>
      {affiliation.trim() && (
        <NextArrowCircleSVG
          className="cursor-pointer absolute top-full my-2"
          onClick={nextStep}
        />
      )}
    </div>
  );
};

const RegisterStepGridField = ({
  dataList,
  data,
  setData,
  nextStep,
  isLastStep,
  register,
}: {
  dataList: string[];
  data: string;
  setData: Dispatch<SetStateAction<string>>;
  nextStep: () => void;
  isLastStep: boolean;
  register: () => void;
}) => {
  const handleItemClick = (data: string) => {
    setData(data);
    if (isLastStep) return;
    nextStep();
  };

  return (
    <div className="relative flex flex-col items-end w-full gap-8 my-2">
      <div className="grid grid-cols-2 gap-4 w-full">
        {dataList.map((e, i) => {
          return (
            <div
              key={i}
              className={`cursor-pointer font-bold text-xl p-6 border-2 rounded-md hover:bg-white hover:text-[#5baedd] ${
                e == data ? "bg-white text-[#5baedd]" : "text-white"
              }`}
              onClick={() => handleItemClick(e)}
            >
              {e}
            </div>
          );
        })}
      </div>
      {isLastStep && data && (
        <NextArrowCircleSVG
          className="cursor-pointer absolute top-full my-2"
          onClick={register}
        />
      )}
    </div>
  );
};

const RegisterComponent = ({
  onBoardingStep,
  setOnBoardingStep,
  socialType,
}: {
  onBoardingStep: number;
  setOnBoardingStep: Dispatch<SetStateAction<number>>;
  socialType: string;
}) => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [userType, setUserType] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [major, setMajor] = useState("");
  const [interest, setInterest] = useState("");

  const nextStep = () => {
    //if nickname is not distinct reinput
    setOnBoardingStep((prev) => prev + 1);
  };

  const register = async () => {
    console.log(auth.currentUser);
    console.log(socialType, nickname, userType, affiliation, major, interest);

    if (!auth.currentUser) {
      console.error("no user");
      return;
    }

    if (
      await fetchRegister({
        uid: auth.currentUser?.uid ?? "",
        email: auth.currentUser?.email ?? "",
        nickname: nickname,
        socialType: socialType as "DEFAULT" | "GOOGLE",
        profileImage: "url",
        userType: userType as "MENTOR" | "MENTEE",
        affiliation: affiliation,
        major: major,
        interest: interest,
      })
    ) {
      navigate("/");
    } else {
      alert("회원가입 실패");
    }
  };

  const RegisterStepTitleItems = [
    { text: "닉네임을 입력해주세요" },
    { text: "무엇을 하고싶나요?", subtext: "에서" },
    {
      text: `${
        userType == "MENTOR" ? "소속대학교/직장을" : "소속학교를"
      } 알려주세요`,
    },
    {
      text: `${userType == "MENTOR" ? "소속" : "관심"} 계열을 선택해주세요`,
    },
    { text: "관심사를 선택해주세요" },
  ];

  const majorList = [
    "인문계열",
    "사회계열",
    "자연계열",
    "공학계열",
    "의학계열",
    "교육계열",
  ];
  const interestList = ["입시전략", "전공탐색", "진로고민", "자기계발"];

  const registerStepInput = [
    <></>,
    <RegisterStepNicknameTextField
      nickname={nickname}
      setNickname={setNickname}
      nextStep={nextStep}
    />,
    <RegisterStepUserTypeField
      userType={userType}
      setUserType={setUserType}
      nextStep={nextStep}
    />,
    <RegisterStepSearchField
      affiliation={affiliation}
      setAffiliation={setAffiliation}
      nextStep={nextStep}
    />,
    <RegisterStepGridField
      dataList={majorList}
      data={major}
      setData={setMajor}
      nextStep={nextStep}
      isLastStep={userType == "MENTOR"}
      register={register}
    />,
    <RegisterStepGridField
      dataList={interestList}
      data={interest}
      setData={setInterest}
      nextStep={nextStep}
      isLastStep={userType == "MENTEE"}
      register={register}
    />,
  ];

  return (
    <div className="absolute w-full flex flex-col p-16 pt-48 gap-24 z-10">
      <div className="flex flex-col gap-2 items-start text-white font-semibold">
        <p>
          {onBoardingStep} / {userType == "MENTEE" ? 5 : 4}
        </p>
        {/* {registerStepTitleList[onBoardingStep]} */}
        <RegisterStepTitle
          stepTitle={RegisterStepTitleItems[onBoardingStep - 1]}
        />
      </div>
      <div className="flex flex-col items-start w-full">
        {registerStepInput[onBoardingStep]}
        {onBoardingStep > 1 && (
          <p
            className="bg-white p-2 px-4 rounded-md"
            onClick={() => setOnBoardingStep((prev) => prev - 1)}
          >
            이전
          </p>
        )}
      </div>
    </div>
  );
};

const RegisterPage = () => {
  const [onBoardingStep, setOnBoardingStep] = useState(1);

  const { state } = useLocation();
  const { socialType } = state;

  if (!socialType) return <div>ERRor</div>;

  return (
    <OnBoardingLayout>
      <RegisterComponent
        onBoardingStep={onBoardingStep}
        setOnBoardingStep={setOnBoardingStep}
        socialType={socialType}
      />
      <RegisterBus className="absolute bottom-0 w-full h-auto z-0" />
    </OnBoardingLayout>
  );
};

export default RegisterPage;
