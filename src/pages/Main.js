import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import styles from './Main.style';
import MainContainer from '../components/MainContainer';
import NavBar from '../components/NavBar';
import ListRow from '../components/ListRow';

const list = [
  { ctitle: "加速度", etitle: "Acc" },
  { ctitle: "摄像头", etitle: "Camera"},
];

export default class App extends React.Component {
  row() {
    return (
      <TouchableOpacity>
        <Text>123</Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <MainContainer>
        <NavBar
          title="Hello RN"
        />
        <ScrollView>
          {list.map((z, i) => <ListRow key={i} res={z} />)}
        </ScrollView>
      </MainContainer>
    );
  }
}
