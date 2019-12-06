import Row from './row'
import React, { Component, Fragment } from 'react';

class Table extends Component {
    render() {
      const { searchMatches } = this.props;
      return (
        <div id="table">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Follow</th>
              </tr>
            </thead>
            <tbody>
              {searchMatches.map(p => (
                <Row username={p.username} />
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  export default Table;