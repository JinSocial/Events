import { YMaps } from '@pbe/react-yandex-maps';
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import Main from 'pages/Main';
import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const userStore = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkAuth()
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
        </Routes>
      </BrowserRouter>
    </YMaps>
  );
}

export default observer(App);
