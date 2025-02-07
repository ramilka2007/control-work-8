import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Quote } from '../../types';

interface QuoteItemProps {
  quote: Quote;
  deleteQuote: (id: string, category: string) => void;
}

const QuoteItem: React.FC<QuoteItemProps> = ({ quote, deleteQuote }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="card mb-3 d-flex flex-row justify-content-between">
        <div className="info text-start col-10">
          <div className="card-body">
            <p className="card-text fs-3">"{quote.description}"</p>
          </div>
          <div className="card-header bg-body">
            <h2 className="card-title fs-1">-{quote.author}</h2>
          </div>
        </div>
        <div className="mt-1 col-2">
          <Link
            to={`/quotes/${quote.id}/edit`}
            className="btn me-1"
            type="button"
            onClick={() => navigate(`/quotes/${quote.id}/edit`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
            </svg>
          </Link>

          <Link
            to="/"
            className="btn text-black fw-bold fs-2"
            type="button"
            onClick={() => deleteQuote(quote.id, quote.category)}
          >
            X
          </Link>
        </div>
      </div>
    </>
  );
};

export default QuoteItem;
