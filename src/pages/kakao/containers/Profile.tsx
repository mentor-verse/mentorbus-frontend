import { useEffect, useState } from 'react';
import axios from 'axios';

type KakaoProfile = {
  id: number;
  properties: {
    nickname: string;
    profile_image: string;
    thumbnail_image: string;
  };
  kakao_account: {
    email: string;
    // Add other fields you expect from the kakao_account object if needed
  };
};


export function Profile() {
  const [profile, setProfile] = useState<KakaoProfile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('kakaoToken');
    if (token) {
      fetchProfile(token);
    }
  }, []);

  const fetchProfile = async (token: string) => {
    try {
      const res = await axios.get<KakaoProfile>('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Nickname: {profile.properties.nickname}</p>
      <p>Email: {profile.kakao_account.email}</p>
    </div>
  );
}
