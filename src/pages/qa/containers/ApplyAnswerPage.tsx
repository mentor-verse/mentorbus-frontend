import * as React from "react";
import { cn } from "../../../libs/utils.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { XIcon } from "@/components/Icons/PlusButton.tsx";
import axios from "axios";

export interface ApplyAnswerPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  Link: string;
  back_disable: string;
  back_work: string;
}

const ApplyAnswerPage = React.forwardRef<HTMLDivElement, ApplyAnswerPageProps>(
  ({ className, back_disable, back_work, Link }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [inputValue, setInputValue] = React.useState("");
    const [letter_id, setLetterId] = React.useState<string | null>(null); // kakaoId 상태값으로 설정

    const handleBackClick = () => {
      if (back_work === "no") {
        return;
      }

      if (Link) {
        navigate(Link);
      } else {
        window.history.back();
      }
    };

    const handleInputChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const value = event.target.value;
      setInputValue(value);

      event.target.style.height = "auto"; // Reset height to auto to calculate correct scrollHeight
      event.target.style.height = `${event.target.scrollHeight}px`; // Set height to the scrollHeight of the content
    };

    const handleSaveAndNavigate = () => {
      // Navigate back to the question/comment page after saving
      fetchData();
      updateData();
      navigate(`/mentorbus-frontend/qabus`);
    };

    // URL에서 kakaoId를 가져오는 함수
    React.useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const urlLetterId = searchParams.get("letter_id"); // URL에서 userId 파라미터로 kakaoId 추출

      if (urlLetterId) {
        setLetterId(urlLetterId); // 상태 업데이트
        localStorage.setItem("letter_id", urlLetterId); // localStorage에 저장
      } else {
        const storedLetterId = localStorage.getItem("letter_id");
        if (storedLetterId) {
          setLetterId(storedLetterId);
        }
      }
    }, [location.search]);

    /*
    const kakaoId = localStorage.getItem("kakao_id");

    React.useEffect(() => {
      if (kakaoId) {
        // 백엔드 API 호출
        axios
          .get(
            `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/onboarding/userdata/${kakaoId}`
          )
          .then((response) => {
            // 성공적으로 데이터를 가져왔을 때
            setUserData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    }, [location.search]); // kakaoId가 변경될 때마다 실행
    */

    const fetchData = async () => {
      try {
        // Check if there's at least one entry
        if (inputValue.length > 0) {
          try {
            // POST request for the first entry
            const response = await axios.post(
              `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/comments`,
              {
                kakao_id: localStorage.getItem("kakao_id"),
                userName: localStorage.getItem("userName"),
                position: localStorage.getItem("userBelong"),
                content: inputValue,
                likes: 0,
                replyCount: 0,
                letter_id: letter_id,
              }
            );

            // Check if the request was successful
            if (response.status === 200) {
              const commentData = response;
              console.log("comment created successfully:", commentData);
            } else {
              console.error("Failed to create comment for:", inputValue);
            }
          } catch (error) {
            console.error("Error creating comment for:", error);
          }
        }
      } catch (error) {
        console.error("Error processing LetterData:", error);
      }
    };

    const updateData = async () => {
      try {
        // Check if there's at least one entry
        if (letter_id) {
          try {
            // PATCH request with the new API endpoint
            const response = await axios.patch(
              `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/comments/${letter_id}`,
              {
                comment_id: letter_id, // comment_id is the input value in this case
              }
            );

            // Check if the request was successful
            if (response.status === 200) {
              const commentData = response.data;
              console.log("Letter updated successfully:", commentData);
            } else {
              console.error("Failed to update letter for:", inputValue);
            }
          } catch (error) {
            console.error("Error updating letter for:", inputValue, error);
          }
        }
      } catch (error) {
        console.error("Error processing letter data:", error);
      }
    };

    return (
      <>
        <div className="main">
          <div className="main_content">
            <div style={{ background: "#fff" }}>
              <div
                className={cn(
                  "flex items-center justify-between text-lg not-italic font-bold text-[19px] mt-[20px]",
                  className
                )}
                ref={ref}
              >
                {!back_disable && (
                  <a className="ml-[20px]" onClick={handleBackClick}>
                    <XIcon />
                  </a>
                )}
                <div className="text-[19px] text-[#333333] font-bold">
                  답변등록
                </div>
                <div
                  className="text-[16px] text-[#333333] font-medium mr-[20px] cursor-pointer"
                  onClick={handleSaveAndNavigate}
                >
                  작성
                </div>
              </div>
              <textarea
                className={cn(
                  "text-[13px] text-[#383838] font-normal mt-[90px] flex justify-start ml-[33px] w-[80%] border-none focus:outline-none resize-none min-h-[50px] max-h-[500px] overflow-y-auto",
                  className
                )}
                placeholder="내용을 입력하세요"
                rows={4}
                style={{ resize: "none" }}
                onChange={handleInputChange}
              ></textarea>
              <div className="grid place-items-center">
                <div className="text-[12px] font-normal text-[#8E9398] w-[80%] text-start">
                  {inputValue && (
                    <p>
                      깨끗한 커뮤니티를 위해 편파적인 발언 및 욕설 비하는
                      자제해주세요. 해당 사항을 어길 시 활동이 제한될 수
                      있습니다
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

ApplyAnswerPage.displayName = "ApplyAnswerPage";

export { ApplyAnswerPage };
