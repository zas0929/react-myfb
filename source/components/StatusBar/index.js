import React, { Component } from 'react';

import { withProfile } from 'components/HOC/withProfile';
import Styles from './styles.m.css';

@withProfile
export default class StatusBar extends Component {
  render () {
    return (
      <section className={ Styles.statusBar }>
        <button>
          <img src={this.props.avatar} />
          <span>{this.props.currentUserFirstName}</span>
          &nbsp;
          <span>{this.props.currentUserLastName}</span>
        </button>
      </section>
    );
  }
}
