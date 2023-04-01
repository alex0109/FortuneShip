import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'shared/assets/styles/local.style';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 10,
    backgroundColor: colors.warning,
  },
  header: {
    height: height * 0.3,
    width: width,
    backgroundColor: colors.warning,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    height: height * 0.6,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
