import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <div className="container nav">
        {/* כפתור שמחזיר לעמוד הבית */}
        <Link to="/">
          <h1>Guest Videos</h1>
        </Link>

        {/* כפתור שיוביל לעמוד יצירת אלבום חדש */}
        <Link className="btn" to="/albums/new">
          Create an Album
        </Link>
      </div>
    </header>
  );
};
export default Navbar;