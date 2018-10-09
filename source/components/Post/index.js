// Core
import React, { Component } from 'react';
import moment from 'moment';
import { string, number, func, array } from 'prop-types';
import { withProfile } from 'components/HOC/withProfile';
import Like from "components/Like";

import Styles from './styles.m.css';

@withProfile
export default class Post extends Component {
  static propTypes = {
    _deletePost: func.isRequired,
    _likePost:   func.isRequired,
    comment:     string.isRequired,
    created:     number.isRequired,
    id:          string.isRequired,
    likes:       array.isRequired
  }

  render () {
    const { _likePost, comment, created, _deletePost, id, likes, avatar, currentUserLastName, currentUserFirstName } = this.props;

    return (
      <section className={ Styles.post }>
        <span className={ Styles.cross } onClick={() => _deletePost(id)} />
        <img src={avatar} />
        <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
        <time>
          {moment.unix(created).format('MMMM D h:mm:ss a')}
        </time>
        <p>{comment}!</p>
        <Like _likePost={_likePost} id={id} likes={likes} />
      </section>
    );
  }
}
