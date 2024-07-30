import { FC } from 'react';

interface FindTitleProps {
  title: string;
}

const FindTitle: FC<FindTitleProps> = ({ title }) => {
  return (
    <>
      <div className="text-lg not-italic font-bold text-[19px] mt-[20px]">
        {title}
      </div>
    </>
  );
};

export default FindTitle;
