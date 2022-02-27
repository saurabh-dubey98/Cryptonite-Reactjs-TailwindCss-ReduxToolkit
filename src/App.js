import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout, Homepage, News, CryptoCurrencies, CryptoDetails, PageNotFound } from './components';
import { store } from './app/store';

function App() {
  return (
    <div className="font-raleway">
      <Provider store={store}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="cryptocurrencies" element={<CryptoCurrencies only10={false} />} />
              <Route path="/news" element={<News />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/some-error" element={<PageNotFound />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </Layout>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
