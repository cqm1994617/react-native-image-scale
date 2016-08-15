import React, { PropTypes } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class ListRow extends React.Component {
  static propTypes = {
    res: PropTypes.object,
  };
  render() {
    return (
      <TouchableOpacity>
        <Text>{this.props.res.ctitle}</Text>
      </TouchableOpacity>
    );
  }
}
