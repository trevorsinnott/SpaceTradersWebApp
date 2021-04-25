import { NavLink } from 'react-router-dom';

import classes from './TopBar.module.scss';

const TopBar: React.FC = () => (
  <nav className={classes.navBar}>
    <div>
      <NavLink className={classes.homeNav} to="/" activeClassName="selected">
        React Boilerplate
      </NavLink>
    </div>
    <div>
      <NavLink
        className={classes.navItem}
        to="/other"
        activeClassName={classes.activeNavItem}
      >
        other
      </NavLink>
    </div>
  </nav>
);

export default TopBar;
