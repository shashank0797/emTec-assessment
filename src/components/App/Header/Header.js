import React from "react";

import close from "../../../assets/close.svg";
import menu from "../../../assets/menu.svg";
import NavMenu from "./NavMenu/NavMenu";
import useIsMobile from "../../hooks/useScreenSize";

import "./Header.css";

const Header = () => {
  const [navMenuOpen, setNavMenuOpen] = React.useState(false);
  const { isMobile } = useIsMobile();
  return (
    <React.Fragment>
      <header className="App-header">
        <div className="Header">
          <h2>Welcome to the MovieHub</h2>
        </div>
        {isMobile && (
          <button
            aria-label="Main menu"
            onClick={() => setNavMenuOpen((open) => !open)}
            className="HamburgerButton"
          >
            <img
              src={navMenuOpen ? close : menu}
              className="HamburgerButton-icon"
              alt="menu icon"
            />
          </button>
        )}
      </header>
      {(!isMobile || navMenuOpen) && <NavMenu />}
    </React.Fragment>
  );
};

export default Header;
