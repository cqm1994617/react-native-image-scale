import React, { PropTypes } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    height: 50,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: '#787878'
  },
});

export default class ListRow extends React.Component {
  static propTypes = {
    res: PropTypes.object,
  };

  render() {
    return (
      <TouchableOpacity style={styles.row}>
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.res.ctitle}</Text>
        </View>
        <View style={styles.line} />
      </TouchableOpacity>
    );
  }
}
