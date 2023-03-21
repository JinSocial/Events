import { YMaps } from '@pbe/react-yandex-maps';
import LoginModal from 'components/modal/LoginModal';
import ProfileModal from 'components/modal/ProfileModal';
import RegistrationModal from 'components/modal/RegistrationModal';
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import Main from 'pages/Main';
import Event from 'pages/Event';
import EventList from 'pages/EventList';
import NotFound from 'pages/NotFound';
import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const userStore = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkAuth();
    }
  }, [userStore]);

  if (userStore.isLoading) {
    return <div />;
  }

  return (
    <YMaps query={{ lang: 'ru_RU', apikey: '2c3253d2-7808-4e3a-a853-795412be87b9' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/event" element={<EventList page={1} />} exact />
          <Route path="/event/page/:id" element={<EventList />} exact />
          <Route path="/event/:id" element={<Event />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <LoginModal />
      <RegistrationModal />
      <ProfileModal />
    </YMaps>
  );
}

export default observer(App);
