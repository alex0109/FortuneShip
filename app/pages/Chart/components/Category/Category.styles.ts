import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'shared/assets/styles/local.style';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 10,
  },
  header: {
    height: height * 0.3,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    height: '100%',
    width: width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  belt: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    padding: 5,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  edit: {
    marginTop: 20,
  },
  materialContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconItem: {
    height: 60,
    width: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
