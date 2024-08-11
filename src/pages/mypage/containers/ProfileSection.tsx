import * as React from "react";
import { cn } from "@/libs/utils.ts";
import { ManCircle } from "../../../components/Icons/Man";
import { WomanCircle } from "../../../components/Icons/Woman";
import { LevelBar } from "../../../components/Icons/MyPageIcon";

export interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  level: string;
  gen: string;
  school: string;
}

const Profile = React.forwardRef<HTMLDivElement, ProfileProps>(
  ({ className, name, level, gen, school }) => {
    return (
      <div
        className={cn(
          "stroke-[#CACACA] stroke-1 rounded-[10px] bg-white w-[340px] h-[150px] grid place-items-center",
          className
        )}
      >
        <div
          className={cn(
            "flex items-start stroke-none justify-start w-full ml-[20%] mt-[20px]",
            className
          )}
        >
          <div className={gen}>
            {gen === "man" ? <ManCircle /> : <WomanCircle />}
          </div>

          <div className="ml-[20px] flex flex-col items-start mt-2">
            <div className="font-semibold text-[#272727] text-[17px] tracking-[-5%]">
              {name}
            </div>
            <div className="font-medium text-[#535353] text-[12px] tracking-[-5%] mt-[1px]">
              {school}
            </div>
            <div className="font-regular text-[#535353] text-[10px] tracking-[-5%] mt-[1xwpx]">
              LV.{level}
            </div>
          </div>
        </div>
        <div className="mb-[15px] w-[80%]">
          <LevelBar />
        </div>
      </div>
    );
  }
);

Profile.displayName = "Profile";

export { Profile };
