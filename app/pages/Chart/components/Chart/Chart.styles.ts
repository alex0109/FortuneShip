import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 10,
  },
  mainText: {
    fontFamily: 'Assistant',
  },
  testText: {
    fontFamily: 'Assistant',
    fontWeight: '900',
  },
  rotate: {
    transform: [{ rotateZ: '-90deg' }],
  },
  buttonWrap: { marginTop: 20 },
});
