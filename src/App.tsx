import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import { Link, Route, Routes } from 'react-router-dom';
import AddQuote from './containers/AddQuote/AddQuote';
import Quotes from './containers/Quotes/Quotes';
import { Categories } from './types';

const App = () => {
  const categories: Categories[] = [
    { title: 'Star Wars', id: 'star-wars' },
    { title: 'Famous people', id: 'famous-people' },
    { title: 'Saying', id: 'saying' },
    { title: 'Humour', id: 'humour' },
    { title: 'Motivational', id: 'motivational' },
  ];

  return (
    <>
      <header>
        <Toolbar />
      </header>
      <Routes>
        <Route path="/" element={<Quotes categories={categories} />} />
        <Route
          path="/new-quote"
          element={<AddQuote categories={categories} />}
        />
        <Route
          path="/quotes/:category"
          element={<Quotes categories={categories} />}
        ></Route>
        <Route
          path="*"
          element={
            <div>
              <h1 className={'mt-5 text-danger'}>Not found!</h1>
              <Link to="/" className={'btn btn-danger'}>
                Go back!
              </Link>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
