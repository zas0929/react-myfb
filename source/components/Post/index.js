// Core
import React, { Component } from 'react';
import moment from 'moment';
import { string, number, func, array } from 'prop-types';
import { Consumer } from 'components/HOC/withProfile';
import Like from "components/Like";

import Styles from './styles.m.css';

export default class Post extends Component {
  static propTypes = {
    _likePost: func.isRequired,
    comment:   string.isRequired,
    created:   number.isRequired,
    id:        string.isRequired,
    likes:     array.isRequired
  }

  render () {
    const { _likePost, comment, created, id, likes } = this.props;

    return (
      <Consumer>
        {(context) => (
          <section className={ Styles.post }>
            <span className={ Styles.cross } />
            <img src={context.avatar} />
            <a>{`${context.currentUserFirstName} ${context.currentUserLastName}`}</a>
            <time>
              {moment.unix(created).format('MMMM D h:mm:ss a')}
            </time>
            <p>{comment}!</p>
            <Like _likePost={_likePost} id={id} likes={likes} {...context} />
          </section>
        )}
      </Consumer>
    );
  }
}
