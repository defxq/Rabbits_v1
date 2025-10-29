import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav>
        <ul>
          <li>
            <Link to="/">Main Page</Link>
          </li>
          <li>
            <Link to="/links">Links</Link>
          </li>
        </ul>
    </nav>
  )
}
export default NavBar