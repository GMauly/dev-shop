/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './Search.less';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';

@withStyles(styles)
class Search {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = 'Pesquisa de desenvolvedores';
    this.context.onSetTitle(title);
    return (
      <div className="Search">
        <div className="Search-container">
          <a className="Search-brand" href="/" onClick={Link.handleClick}>
            <span className="Search-brandTxt">Dev-Shop</span>
          </a>
          <div className="Search-banner">
            <h1 className="Search-bannerTitle">Loja de desenvolvedores</h1>
          </div>
        </div>
      </div>
    );
  };

}

export default Search;
