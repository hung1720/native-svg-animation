import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Animated, Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import React from 'react';

const CIRCLE_SIZE = 100;
const translateXValue1 = parseFloat("0%");
const translateXValue2 = parseFloat("50%");


const Circle = ({ onPress, animatedValue }) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];

  const containerBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['gold', 'gold', 'gold', '#444', '#444']
  })
  const circleBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['#444', '#444', '#444', 'gold', 'gold']
  })
  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, styles.circleContainer, {
      backgroundColor: containerBg
    }]}>
      <Animated.View style={[styles.circle, {
        backgroundColor: circleBg,
        transform: [
          {
            perspective: 400,
          },
          {
            rotateY: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: ['0deg', '-90deg', '-180deg']
            })
          },
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 8, 1]
            })
          },
          {
            translateX: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [translateXValue1, translateXValue2, translateXValue1],
            })
          },

        ]
      }]}>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circle, styles.circleButton]}>
            <AntDesign name='arrowright' size={28} color={'white'} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default function App() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animation = (toValue) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 3000,
      useNativeDriver: false,
    });
  const [index, setIndex] = React.useState(0)
  const onPress = () => {
    setIndex(index === 1 ? 0 : 1);
    animation(index === 1 ? 0 : 1).start()
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' hidden />
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  circleContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    paddingBottom: 100,
    backgroundColor: 'gold',
    justifyContent: 'flex-end'
  },
  circle: {
    backgroundColor: '#444',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
