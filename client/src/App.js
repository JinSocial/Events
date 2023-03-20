import { YMaps } from '@pbe/react-yandex-maps';
import LoginModal from 'components/modal/LoginModal';
import ProfileModal from 'components/modal/ProfileModal';
import RegistrationModal from 'components/modal/RegistrationModal';
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import Main from 'pages/Main';
import News from 'pages/News';
import NewsList from 'pages/NewsList';
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
    <YMaps query={{ lang: 'ru_RU', apikey: '' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/news" element={<NewsList page={1} />} exact />
          <Route path="/news/page/:id" element={<NewsList />} exact />
          <Route path="/news/:id" element={<News />} />
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
