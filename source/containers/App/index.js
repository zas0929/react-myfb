// Core
import React, { Component } from 'react';
import Feed from 'components/Feed';
import { Provider } from 'components/HOC/withProfile';
import avatar from 'theme/assets/lisa';
import Catcher from "components/Catcher";

const options = {
  avatar,
  currentUserFirstName: "Роман",
  currentUserLastName:  "Лисовский"
};

export default class App extends Component {
  render () {
    return (
      <Catcher>
        <Provider value = {options}>
          <Feed />
        </Provider>
      </Catcher>
    );
  }
}
