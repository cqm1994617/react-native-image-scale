import React, { PropTypes } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PixelRatio,
  Platform,
} from 'react-native';

const styles = StyleSheet.create({
  navbar: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    height: Platform.OS === 'ios' ? 65 : 50,
    borderBottomWidth: 1 / PixelRatio.get(),
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    flexDirection: 'row',
  },
  slide: {
    flex: 1,
  },
  center: {
    flex: 3,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: '#787878',
  },
});

export default class NavBar extends React.Component {
  static propTypes = {
    renderBack: PropTypes.bool,
    renderLeft: PropTypes.func,
    title: PropTypes.string,
  };

  static contextTypes = {
    navigator: PropTypes.object,
  };

  renderLeft() {
    if (this.props.renderLeft) {
      return this.props.renderLeft();
    } else if (this.props.renderBack) {
      return (
        <TouchableOpacity style={styles.container}>
          <Text>返回</Text>
        </TouchableOpacity>
      );
    }
    return <View style={styles.container} />
  }

  render() {
    console.log(this.refs);
    return (
      <View style={styles.navbar}>
        <View style={styles.slide}>{this.renderLeft()}</View>
        <View style={styles.center}>
          <View style={styles.container}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </View>
        <View style={styles.slide}></View>
      </View>
    );
  }
}