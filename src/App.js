import React, { PropTypes } from 'react';
import {
  View,
  Text,
  Navigator,
} from 'react-native';

import Main from './pages/Main';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

const initRoute = {
  component: Main,
};

export default class App extends React.Component {

  configScene = (route) => {
    return Navigator.SceneConfigs.PushFromRight;
  };

  renderScene = (route, navigator) => {
    const Component = route.component;
    return <Component {...route.params} navigator={navigator} />;
  };

  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={initRoute}
        configureScene={this.configScene}
        renderScene={this.renderScene}
      />
    );
  }
}
