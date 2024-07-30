import { useState, useEffect } from "react";
import { SearchBox } from "@/components/ui/searchbox";
import BottomNav from "@/containers/navbar";
import { useLocation } from "react-router-dom";

interface SelectedBox {
  gen: string;
  major: string;
  name: string;
  info: string;
  date: string;
  sort: string;
}

// Define a type for valid sort values
type SortType = "인문계열" | "예술계열" | "IT계열" | "공학계열";

const gatherTownUrls: Record<SortType, string> = {
  "인문계열": "nJCm-X-RR5OojtQzylwy",
  "예술계열": "5RvF4SJkTl6csexWVxQw",
  "IT계열": "PsbK1kvsSF2vqKIf-VLj",
  "공학계열": "nWPWj7r6T8eRB2mVaUT8"
};

// Type guard to check if a value is a valid SortType
function isSortType(value: any): value is SortType {
  return ["인문계열", "예술계열", "IT계열", "공학계열"].includes(value);
}

export function MentorBusPage() {
  const [filter, setFilter] = useState("entry"); // Default filter value
  const [selectedBox, setSelectedBox] = useState<SelectedBox | null>(null);
  const [hasEntered, setHasEntered] = useState(false); // State to track entry
  const location = useLocation();

  useEffect(() => {
    // Check if selectedBox is passed via location state or retrieve from localStorage
    const boxFromState = location.state?.selectedBox;
    const boxFromStorage = localStorage.getItem('selectedBox');
    const box = boxFromState || (boxFromStorage ? JSON.parse(boxFromStorage) : null);

    if (box) {
      setSelectedBox(box as SelectedBox);
    } 
  }, [location.state]);

  const handleEnter = () => {
    setHasEntered(true);
    setFilter("applied"); // Update filter to "applied" after entry

    if (selectedBox && isSortType(selectedBox.sort)) {
      const url = `https://app.gather.town/invite?token=${gatherTownUrls[selectedBox.sort]}`;
      window.location.href = url;
    }
  };

  return (
    <>
      <div className="main">
        <div className="main_content">
          <div style={{ background: '#fff' }}>
            <div className="text-lg not-italic font-bold text-[19px] mt-[20px]">
              멘토버스
            </div>
            <div className="flex justify-between mt-[40px]">
              <div className={`filter_btn_label ${filter === "entry" ? 'active' : ''}`} onClick={() => setFilter("entry")}>
                진행예정
              </div>
              <div className={`filter_btn_label ${filter === "applied" ? 'active' : ''}`} onClick={() => setFilter("applied")}>
                진행완료
              </div>
            </div>
            <div className="mt-[35px] grid place-items-center">
              {selectedBox && (filter === "entry" && !hasEntered ? (
                <div className="grid place-items-center mt-[0px] border-b-[0.7px] border-[#C0C0C0] h-[180px]">
                  <SearchBox
                    gen={selectedBox.gen}
                    major={selectedBox.major}
                    name={selectedBox.name}
                    info={selectedBox.info}
                    date={selectedBox.date}
                    sort={selectedBox.sort} // Pass sort to the SearchBox
                    variant="default"
                    size="default"
                    onClick={handleEnter} // Pass handleEnter function to the SearchBox
                   >
                    입장하기
                  </SearchBox>
                </div>
              ) : filter === "applied" && hasEntered ? (
                <div className="grid place-items-center mt-[25px] border-b-[0.7px] border-[#C0C0C0] h-[180px]">
                  <SearchBox
                    gen={selectedBox.gen}
                    major={selectedBox.major}
                    name={selectedBox.name}
                    info={selectedBox.info}
                    date={selectedBox.date}
                    sort={selectedBox.sort} // Pass sort to the SearchBox
                    variant="default"
                    size="default"
                  >
                    진행완료
                  </SearchBox>
                </div>
              ) : null)}
            </div>
          </div>
          <BottomNav />
        </div>
      </div>
    </>
  );
}
