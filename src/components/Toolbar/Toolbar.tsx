import { NavLink } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-dark bg-black mb-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-white fw-bold" to="/">
          Quotes
        </NavLink>

        <div className="links d-flex flex-row align-items-center gap-2 justify-content-evenly">
          <NavLink className="first-link nav-link text-white" to="/">
            Quotes
          </NavLink>
          <hr/>
          <NavLink className="second-link nav-link text-white" to="/new-quote">
            Submit new quote
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
