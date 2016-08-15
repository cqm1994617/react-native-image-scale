import React from 'react';
import {
  View,
  Text,
  Navigator,
} from 'react-native';
import Main from './pages/Main';

const initRoute = {
  component: Main,
};

export default class App extends React.Component {

  configScene = () => {
    return Navigator.SceneConfigs.PushFromRight;
  };

  renderScene = (route, navigator) => {
    console.log(route);
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
