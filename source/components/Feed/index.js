// Core
import React, { Component } from 'react';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';

import Styles from './styles.m.css';
import avatar from 'theme/assets/lisa'

export default class Feed extends Component {
    render () {
        return (
            <section className = { Styles.feed }>
                <StatusBar />
              <Composer />
              <Post />
            </section>
        );
    }
}
