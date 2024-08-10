import { LeftArrow } from "@/components/Icons/LeftArrow";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface FindTitleProps {
  title: string;
  Link: string;
  back_disable: string;
  back_work: string;
}

const FindTitle: FC<FindTitleProps> = ({
  title,
  back_disable,
  back_work,
  Link,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (back_work === "no") {
      return;
    }

    if (Link) {
      navigate(Link);
    } else {
      const currentPath = location.pathname;

      if (
        currentPath === "/Onboarding/Phone" ||
        currentPath === "/Onboarding/Submit" ||
        currentPath === "/Onboarding/Underage"
      ) {
        // Handle back navigation if needed
      } else {
        window.history.back();
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center text-lg not-italic font-bold text-[19px] mt-[20px] mr-[140px]">
        {!back_disable && (
          <a onClick={handleBackClick}>
            <LeftArrow />
          </a>
        )}

        <div className="ml-[140px]"></div>

        <div>{title}</div>
      </div>
    </>
  );
};

export default FindTitle;
