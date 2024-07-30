import { Home, FindMentor, MentorBus, QABus, MyPage } from '@/components/Icons/Nav';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  // 현재 선택된 아이콘을 관리하는 state
  const location = useLocation();

  const getColor = (path: string): string => {
    return location.pathname === path ? "#393939" : "#B2BAC2";
  };

  return (
    <div>
      <nav className="wrapper">
        {/* 하단 네비게이션 최상위 태그 */}
        <div>
          <Link to="/mentorbus-frontend/main">
            <Home color={getColor('/mentorbus-frontend/main')} />
          </Link>
        </div>
        <div>
          <Link to="/mentorbus-frontend/find">
            <FindMentor color={getColor('/mentorbus-frontend/find')} />
          </Link>
        </div>
        <div>
          <Link to="/mentorbus-frontend/mentorbus">
            <MentorBus color={getColor('/mentorbus-frontend/mentorbus')} />
          </Link>
        </div>
        <div>
          <Link to="/mentorbus-frontend/qabus">
            <QABus color={getColor('/mentorbus-frontend/qabus')} />
          </Link>
        </div>
        <div>
          <Link to="/mentorbus-frontend/mypage">
            <MyPage color={getColor('/mentorbus-frontend/mypage')} />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
