import * as React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/libs/utils.ts";

export interface CollegeProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  explain: string;
  img: string;
  name: string;
}

const College = React.forwardRef<HTMLDivElement, CollegeProps>(
  ({ className, img, name }, ref) => {
    const navigate = useNavigate();

    const handleClick = () => {
      // Ensure `img` is properly escaped or sanitized if necessary
      navigate(`/${img}`);
    };

    return (
      <button className="w-[64px]" onClick={handleClick}>
        <div ref={ref} className={cn(className)}>
          <div><img src={img} alt={name} /></div>
          <div className="mt-[10px] text-[#535353] not-italic font-medium text-[9px]">{name}</div>
        </div>
      </button>
    );
  }
);

College.displayName = "College";

export { College };
