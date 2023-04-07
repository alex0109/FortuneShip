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
    position: 'relative',
  },
  rotate: {
    transform: [{ rotateZ: '-90deg' }],
  },
  buttonWrap: {
    marginTop: 20,
  },
  categorieCircle: {
    position: 'absolute',
    left: '35%',
    top: '40%',
    backgroundColor: 'red',
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '30%',
    left: '30%',
    height: 45,
    width: 45,
    borderRadius: 40,
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
