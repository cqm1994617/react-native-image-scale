import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import styles from './Main.style';
import MainContainer from '../components/MainContainer';
import NavBar from '../components/NavBar';

export default class App extends React.Component {
  render() {
    return (
      <MainContainer>
        <NavBar
          title="Hello RN"
        />
        <Text>1234</Text>
      </MainContainer>
    );
  }
}
