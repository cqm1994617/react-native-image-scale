import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
});

export default class MainContainer extends React.Component {
  static defaultProps = {
    center: false,
  };
  static propTypes = {
    ...View.propTypes,
    style: View.propTypes.style,
  };

  render() {
    const { children, style, ...others } = this.props;
    return (
      <View
        style={[styles.container, style]}
        {...others}
      >
        {children}
      </View>
    );
  }
}
