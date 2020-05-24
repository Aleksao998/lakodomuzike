import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

function NavbarMenu(props) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    setNavbarColor("");
  });
  const logOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    props.logOut();
  };
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/"
            target="_blank"
            title="Lako Do Muzike"
            tag={Link}
          >
            Lako do Muzike
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink to="/" tag={Link}>
                Pocetna
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/ads" tag={Link}>
                Oglasi
              </NavLink>
            </NavItem>

            {props.isAutenticated === false ? (
              <NavItem>
                <NavLink to="/register-page" tag={Link}>
                  Registruj se
                </NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <NavLink to={props.profileRoute} tag={Link}>
                  Profil
                </NavLink>
              </NavItem>
            )}
            {props.isAutenticated === false ? (
              <NavItem>
                <NavLink to="/login-page" tag={Link}>
                  Uloguj se
                </NavLink>
              </NavItem>
            ) : (
              <NavItem onClick={logOut}>
                <NavLink to="/" tag={Link}>
                  Izloguj se
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
