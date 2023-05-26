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
  buttonWrap: {
    marginTop: 20,
  },
  categoriesCircle: {
    position: 'absolute',
    left: '35%',
    top: '43%',
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: 45,
    width: 45,
    borderRadius: 40,
  },
  addItemCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: 45,
    width: 45,
    borderRadius: 40,
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  input: {
    margin: 10,
    padding: 5,
    width: '43%',
    height: 30,
    backgroundColor: '#e8e8e8',
  },
});
