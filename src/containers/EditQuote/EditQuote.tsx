import React, { useCallback, useEffect, useState } from 'react';
import { AddQuote, Categories } from '../../types';
import axiosApi from '../../axiosApi';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

interface Props {
  categories: Categories[];
}

const EditQuote: React.FC<Props> = ({ categories }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [editQuote, setEditQuote] = React.useState<AddQuote>({
    author: '',
    description: '',
    category: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchEditPost = useCallback(async () => {
    setIsLoading(true);

    const response = await axiosApi.get(`/quotes/${params.category}.json`);
    const quote = response.data;

    try {
      if (response.data !== null) {
        setEditQuote({
          ...quote,
          author: quote.author,
          description: quote.description,
          category: quote.category,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [params.category]);

  useEffect(() => {
    void fetchEditPost();
  }, [fetchEditPost]);

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const edited: AddQuote = {
      author: editQuote.author,
      description: editQuote.description,
      category: editQuote.category,
    };

    try {
      await axiosApi.put(`/quotes/${params.category}.json`, edited);
    } catch (error) {
      console.error('Error happened');
      throw error;
    } finally {
      navigate('/quotes/' + editQuote.category);
      setIsLoading(false);
    }

    setEditQuote({
      author: '',
      description: '',
      category: '',
    });
  };

  const changeForm = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setEditQuote((prev) => ({
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
            <h2 className="text-center mb-4">Edit post</h2>
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
                value={editQuote.category}
                onChange={changeForm}
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
                value={editQuote.author}
                onChange={changeForm}
              />
            </div>
            <div className="form-group mb-3 text-start w-75 mx-auto">
              <label htmlFor="description" className="form-label">
                Quote
              </label>
              <textarea
                required
                name="description"
                id="description"
                className="form-control"
                value={editQuote.description}
                onChange={changeForm}
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Edit
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EditQuote;
