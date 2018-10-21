// Core
import React, { Component } from 'react';

import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import Catcher from "components/Catcher";
import Postman from "components/Postman";
import { withProfile } from 'components/HOC/withProfile';
import { Transition } from "react-transition-group"
import { fromTo } from "gsap"

import Styles from './styles.m.css';
import { getUniqueID, delay } from "instruments";
import { api, GROUP_ID, TOKEN } from "config/api";
import { socket } from "socket/init";

@withProfile
export default class Feed extends Component {
  state = {
    posts: [
      // { id: '123', comment: 'Hi there', created: 1526825076849, likes: []},
      // { id: '321', comment: 'Hello', created: 1526825076855, likes: []}
    ],
    isSpinning: false,
  }

  componentDidMount () {
    const { currentUserFirstName, currentUserLastName } = this.props;

    this._fetchPosts();
    socket.emit("join", GROUP_ID);

    socket.on("create", (postJSON) => {
      const { data: createdPost, meta } = JSON.parse(postJSON);

      if (
        `${currentUserFirstName} ${currentUserLastName}` !==
        `${meta.authorFirstName} ${meta.authorLastName}`
      ) {
        this.setState(({ posts }) => ({
          posts: [createdPost, ...posts]
        }));
      }
    });

    socket.on("remove", (postJSON) => {
      const { data: removedPost, meta } = JSON.parse(postJSON);

      if (
        `${currentUserFirstName} ${currentUserLastName}` !==
        `${meta.authorFirstName} ${meta.authorLastName}`
      ) {
        this.setState(({ posts }) => ({
          posts: posts.filter((post) => post.id !== removedPost.id)
        }));
      }
    });
  }

  componentWillUnmount () {
    socket.removeListener("create");
    socket.removeListener("remove");
  }

  _setPostsFetchingState = (state) => {
    this.setState({
      isSpinning: state
    });
  }

  _fetchPosts = async () => {
    this._setPostsFetchingState(true);

    const response = await fetch(api, {
      method: "GET"
    });

    const { data: posts } = await response.json();

    console.log(posts);

    this.setState({
      posts,
      isSpinning: false
    });
  }

  _createPost = async (comment) => {
    this._setPostsFetchingState(true);

    const response = await fetch(api, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:  TOKEN
      },
      body: JSON.stringify({ comment })
    });

    const { data: post } = await response.json();

    this.setState(({ posts }) => ({
      posts:      [post, ...posts],
      isSpinning: false
    }));
  }

  _deletePost = async (id) => {
    this._setPostsFetchingState(true);

    await fetch(`${api}/${id}`, {
      method:  "DELETE",
      headers: {
        Authorization: TOKEN
      }
    });

    this.setState(({ posts }) => ({
      posts:      posts.filter((post) => post.id !== id),
      isSpinning: false
    }));
  }

  _likePost = async (id) => {
    this._setPostsFetchingState(true);

    const response = await fetch(`${api}/${id}`, {
      method:  "PUT",
      headers: {
        Authorization: TOKEN
      }
    });

    const { data: likedPost } = await response.json();

    this.setState(({ posts }) => ({
      posts: posts.map(
        (post) => post.id === likedPost.id ? likedPost : post),
      isSpinning: false
    }));

  }

  _animateComposerEnter = (composer) => {
    fromTo(
      composer,
      1,
      { opacity: 0, rotationX: 50 },
      { opacity: 1, rotationX: 0 }
    );
  }

  render () {
    const { posts, isSpinning } = this.state;

    const postsJSX = posts.map((post) => {
      return (
        <Catcher key={post.id}>
          <Post _deletePost={this._deletePost} key={ post.id } { ...post } _likePost={ this._likePost} />
        </Catcher>
      );
    });

    return (
      <section className={Styles.feed }>
        <Spinner isSpinning={isSpinning} />
        <StatusBar />
        <Transition
          appear
          in
          timeout={ 1000 }
          onEnter={ this._animateComposerEnter }
        >
          <Composer _createPost={this._createPost} />
        </Transition>
        <Postman />
        {postsJSX}
      </section>
    );
  }
}
