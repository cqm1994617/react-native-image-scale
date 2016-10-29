import React from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PanResponder,
} from 'react-native';

import img from './img.jpeg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 300,
    height: 300,
  },
});

// 阻力
const friction = 0.02 * 1000 / 60;

function calcDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) || 0;
}

export default class App extends React.Component {
  currentX = 0;
  currentY = 0;
  currentScale = 1;

  _panResponder = PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

      // gestureState.{x,y}0 现在会被设置为0
      console.log('onPanResponderGrant', evt.nativeEvent);

      if (this.timer) {
        cancelAnimationFrame(this.timer);
        this.timer = null;
      }

      const {touches} = evt.nativeEvent;
      let centerX = touches.reduce((a, v)=>a + v.pageX, 0) / touches.length;
      let centerY = touches.reduce((a, v)=>a + v.pageY, 0) / touches.length;

      let distance = touches.reduce((a, v)=>a + calcDistance(centerX, centerY, v.pageX, v.pageY), 0) / touches.length;

      this.gestureCount = gestureState.numberActiveTouches;

      this.startScale = this.currentScale;
      this.startDistance = distance;

      this.startX = this.currentX - centerX + this.width / 2;
      this.startY = this.currentY - centerY + this.height / 2;
    },
    onPanResponderMove: (evt, gestureState) => {
      // 最近一次的移动距离为gestureState.move{X,Y}

      // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}

      const {touches} = evt.nativeEvent;
      let centerX = touches.reduce((a, v)=>a + v.pageX, 0) / touches.length;
      let centerY = touches.reduce((a, v)=>a + v.pageY, 0) / touches.length;

      let distance = touches.reduce((a, v)=>a + calcDistance(centerX, centerY, v.pageX, v.pageY), 0) / touches.length;

      //console.log(touches);
      console.log(touches.length, '' + distance, '' + this.startDistance);

      if (this.gestureCount !== gestureState.numberActiveTouches) {
        // 手指数目变化,记录状态
        this.gestureCount = gestureState.numberActiveTouches;

        this.startScale = this.currentScale;
        this.startDistance = distance;

        this.startX = this.currentX - centerX + this.width / 2;
        this.startY = this.currentY - centerY + this.height / 2;

      } else {
        // 判断缩放
        if (this.gestureCount > 1 && this.startDistance > 1) {
          this.currentScale = this.startScale * distance / this.startDistance;
        }
        this.currentX = this.startX / this.startScale * this.currentScale + centerX - this.width / 2;
        this.currentY = this.startY / this.startScale * this.currentScale + centerY - this.height / 2;
      }

      this.forceUpdate();

      // 滑动
      //console.log('onPanResponderMove', evt.nativeEvent);
      //console.log(this.currentY);
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
      // 一般来说这意味着一个手势操作已经成功完成。

      this.vx = gestureState.vx;
      this.vy = gestureState.vy;

      this.timer = requestAnimationFrame(this.onFrame);
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
      // 默认返回true。目前暂时只支持android。
      return true;
    },
  });

  onFrame = () => {
    this.timer = null;
    let v = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (v < friction) {
      return;
    }
    let c = (v - friction) / v;
    this.vx *= c;
    this.vy *= c;
    this.currentX += this.vx * 1000 / 60;
    this.currentY += this.vy * 1000 / 60;
    this.forceUpdate();
    this.timer = requestAnimationFrame(this.onFrame);
  };

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Image
          source={img}
          onLayout={ev=> {
            this.width = ev.nativeEvent.layout.width;
            this.height = ev.nativeEvent.layout.height;
          }}
          style={[
            styles.img,
            {
              resizeMode: 'contain',
              transform: [
                {translateX: this.currentX},
                {translateY: this.currentY},
                {scale: this.currentScale},
              ]
            }]}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('HelloRN', () => App);
