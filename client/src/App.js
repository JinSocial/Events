import { YMaps } from '@pbe/react-yandex-maps';
import LoginModal from 'components/modal/LoginModal';
import ProfileModal from 'components/modal/ProfileModal';
import RegistrationModal from 'components/modal/RegistrationModal';
import { observer } from 'mobx-react-lite';
import Main from 'pages/Main';
import Project from 'pages/Project';
import EventList from 'pages/EventList';
import NotFound from 'pages/NotFound';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rating from 'pages/Rating';
import UserStore from 'store/UserStore';

function App() {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      UserStore.checkAuth();
    }
  }, []);

  if (UserStore.isLoading) {
    return <div />;
  }

  return (
    <YMaps query={{ lang: 'ru_RU', apikey: '2c3253d2-7808-4e3a-a853-795412be87b9' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/event" element={<EventList page={1} />} exact />
          <Route path="/event/page/:id" element={<EventList />} exact />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <LoginModal />
        <RegistrationModal />
        <ProfileModal />
      </BrowserRouter>
    </YMaps>
  );
}

export default observer(App);
