import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../../../shared/assets/styles/local.style';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: windowWidth / 1.2,
    marginBottom: 30,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 2,
    borderRightColor: colors.red,
    backgroundColor: 'rgba(228, 229, 231, 0.2)',
  },
  contentItem: {
    flexDirection: 'row',
    width: '100%',
  },
  mainText: {
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Assistant',
    paddingLeft: 10,
  },
  subTitle: {
    paddingLeft: 10,
    color: colors.success,
    fontSize: 20,
    fontFamily: 'Assistant',
  },
});
