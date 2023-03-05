import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 10,
  },
  mainText: {
    fontFamily: 'Assistant',
  },
  rotate: {
    transform: [{ rotateZ: '-90deg' }],
  },
  buttonWrap: { marginTop: 20 },
});
