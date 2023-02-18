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
    borderBottomWidth: 0.3,
    borderStyle: 'solid',
  },
  contentItem: {
    flexDirection: 'row',
    width: '100%',
  },
  mainText: {
    paddingLeft: 10,
  },
  h1Text: {
    fontSize: 27,
    fontWeight: '800',
    fontFamily: 'Assistant',
  },
  h2Text: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Assistant',
  },
  subTitle: {
    paddingLeft: 10,
    color: colors.success,
  },
});
