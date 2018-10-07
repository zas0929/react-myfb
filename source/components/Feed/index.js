// Core
import React, { Component } from 'react';
import moment from 'moment';

import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

import Styles from './styles.m.css';
import { getUniqueID } from "instruments";

export default class Feed extends Component {
  state = {
    posts: [
      { id: '123', comment: 'Hi there', created: 1526825076849 },
      { id: '321', comment: 'Hello', created: 1526825076855 }
    ],
    isSpinning: false,
  }

  _createPost = (comment) => {
    const post = {
      id:      getUniqueID(),
      created: moment.now(),
      comment,
    };

    this.setState(({ posts }) => ({
      posts: [post, ...posts],
    }));
  }

  render () {
    const { posts, isSpinning } = this.state;

    const postsJSX = posts.map((post) => {
      return <Post key={ post.id } { ...post } />;
    });

    return (
      <section className={Styles.feed }>
        <Spinner isSpinning={isSpinning} />
        <StatusBar />
        <Composer _createPost={this._createPost} />
        {postsJSX}
      </section>
    );
  }
}
