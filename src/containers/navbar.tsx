import {  Home, FindMentor, MentorBus, QABus, MyPage  } from '@/components/Icons/Nav';

import { Link, useLocation } from 'react-router-dom';



const BottomNav = () => {
  // 현재 선택된 아이콘을 관리하는 state
  const location = useLocation();

  const getColor = (path) => {
    return location.pathname === path ? "#393939" : "#B2BAC2";
  };

  return (
    <div>
    <nav className="wrapper">
      {/* 하단 네비게이션 최상위 태그 */}
      <div>
        <Link to="/main">
          <Home 
            icon="home"
            style={{ border: 'none' }}
            color={getColor('/main')}
          />
        </Link>
      </div>
      <div>
        <Link to="/find" >
          <FindMentor 
            icon="home"
            style={{ border: 'none' }}
            color={getColor('/find')}
          />
        </Link>
      </div>
      <div>
        <Link to="/mentorbus" >
          <MentorBus 
            icon="home"
            style={{ border: 'none' }}
            color={getColor('/mentorbus')}
          />
        </Link>
      </div>
      <div>
        <Link to="/qabus" >
          <QABus 
            icon="home"
            style={{ border: 'none' }}
            color={getColor('/qabus')}
          />
        </Link>
      </div>
      <div>
        <Link to="/mypage">
          <MyPage 
            icon="home"
            style={{ border: 'none' }}
            color={getColor('/mypage')}
          />
        </Link>
      </div>
    </nav>

</div>
  );
};

export default BottomNav;