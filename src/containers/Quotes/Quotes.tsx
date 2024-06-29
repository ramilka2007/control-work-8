import React, { useCallback, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Categories, Quote } from '../../types';
import axiosApi from '../../axiosApi';
import QuoteItem from '../../components/QuoteItem/QuoteItem';
import Spinner from '../../components/Spinner/Spinner';

interface Props {
  categories: Categories[];
}

const Quotes: React.FC<Props> = ({ categories }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [quotes, setQuotes] = React.useState<Quote[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchQuotes = useCallback(
    async (url: string) => {
      setIsLoading(true);

      const response = await axiosApi.get<Quote | null>(url);
      const postsResponse = response.data;

      try {
        if (postsResponse !== null) {
          const quotes: Quote[] = Object.keys(response.data).map(
            (id: string) => {
              return {
                ...response.data[id],
                id,
              };
            },
          );

          setQuotes(quotes);
        } else {
          setQuotes([]);
        }
      } catch (error) {
        console.error('Error happened');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [params.category],
  );

  useEffect(() => {
    if (params.category === undefined) {
      void fetchQuotes('/quotes.json');
    } else {
      void fetchQuotes(
        `/quotes.json?orderBy="category"&equalTo="${params.category}"`,
      );
    }
  }, [fetchQuotes, params.category]);

  const findCategory = () => {
    const start = categories.find(
      (category) => category.id === params.category,
    );
    if (start) {
      return start.title;
    }
  };

  const deleteQuote = async (id: string, category: string) => {
    setIsLoading(true);
    try {
      await axiosApi.delete(`/quotes/${id}.json`);
      navigate(`/quotes/${category}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="d-flex flex-row">
            <div className="text-start fs-3 col-4 ms-5 me-auto">
              <ul>
                <li>
                  <NavLink className="link-dark" to="/">
                    All
                  </NavLink>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <NavLink
                      className="link-dark"
                      to={`/quotes/${category.id}`}
                    >
                      {category.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="quotes col-7">
              <h1>{params.category ? <>{findCategory()}</> : <>All</>}</h1>
              {quotes.length > 0 ? (
                <>
                  {quotes.map((quote: Quote) => (
                    <QuoteItem
                      key={quote.id}
                      quote={quote}
                      deleteQuote={deleteQuote}
                    />
                  ))}
                </>
              ) : (
                <h4>No quotes yet</h4>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Quotes;
