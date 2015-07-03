/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './Search.less';
import request from 'request';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';

@withStyles(styles)
class Search extends React.Component {

  static propTypes = {
    developer: PropTypes.func.isString
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  onChange() {
    request('http://www.google.com.br/', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
      };
    });
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
          <div className="Search-developer">
            <input className="Search-developer-input" type="text" value={this.props.developer} />
          </div>
        </div>
      </div>
    );
  };

}

export default Search;
