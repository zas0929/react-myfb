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

  _deletePost = () => {
    const { _deletePost, id } = this.props;

    _deletePost(id);
  }

  _getCross = () => {
    const { firstName, lastName, currentUserFirstName, currentUserLastName } = this.props;

    return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
      ? <span className={ Styles.cross } onClick={this._deletePost} />
      : null
  }

  render () {
    const { _likePost, comment, created, id, likes, avatar, firstName, lastName } = this.props;

    const cross = this._getCross();

    return (
      <section className={ Styles.post }>
        {cross}
        <img src={avatar} />
        <a>{`${lastName} ${firstName}`}</a>
        <time>
          {moment.unix(created).format('MMMM D h:mm:ss a')}
        </time>
        <p>{comment}!</p>
        <Like _likePost={_likePost} id={id} likes={likes} />
      </section>
    );
  }
}
