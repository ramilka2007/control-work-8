import React, { useState } from 'react';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';
import { AddQuote, Categories } from '../../types';
import Spinner from '../../components/Spinner/Spinner';

interface Props {
  categories: Categories[];
}

const AddPost: React.FC<Props> = ({ categories }) => {
  const navigate = useNavigate();

  const [sendQuote, setSendQuote] = React.useState<AddQuote>({
    author: '',
    description: '',
    category: 'star-wars',
  });
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const quote: AddQuote = {
      author: sendQuote.author,
      description: sendQuote.description,
      category: sendQuote.category,
    };

    try {
      await axiosApi.post('/quotes.json', quote);
    } catch (error) {
      console.error('Error happened');
      throw error;
    } finally {
      setIsLoading(false);
      navigate('/');
    }

    setSendQuote({
      author: '',
      description: '',
      category: '',
    });
  };

  const changeForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSendQuote((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const changeCategory = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setSendQuote((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <form onSubmit={onFormSubmit}>
            <h2 className="text-center mb-4">Add new post</h2>
            <div className="form-group mb-3 text-start w-75 mx-auto">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                required
                className="form-control form-select fs-5"
                aria-label="Default select example"
                name="category"
                id="category"
                value={sendQuote.category}
                onChange={changeCategory}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3 text-start w-75 mx-auto">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                required
                type="text"
                name="author"
                id="author"
                className="form-control"
                value={sendQuote.author}
                onChange={changeForm}
              />
            </div>
            <div className="form-group mb-3 text-start w-75 mx-auto">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                required
                name="description"
                id="description"
                className="form-control"
                value={sendQuote.description}
                onChange={changeForm}
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default AddPost;
