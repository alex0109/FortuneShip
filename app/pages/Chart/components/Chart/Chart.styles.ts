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
  chart: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotate: {
    transform: [{ rotateZ: '-90deg' }],
  },
  buttonWrap: { marginTop: 20 },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 50 % -25,
    top: 50 % -25,
    height: 45,
    width: 45,
    borderRadius: 20,
    backgroundColor: 'orange',
  },
  input: {
    margin: 10,
    padding: 5,
    width: '43%',
    height: 30,
    backgroundColor: '#e8e8e8',
  },
});
