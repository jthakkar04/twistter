import React, { Component, Fragment } from 'react';

class Row extends Component {
    render() {
      return (
        <tr>
          <td value={this.props.username}>
            {this.props.username}
          </td>
          {/* <td key={uuidv4()} value={this.props.keyword}>
            {this.props.keyword}
          </td> */}
        </tr>
      );
    }
  }
  export default Row;