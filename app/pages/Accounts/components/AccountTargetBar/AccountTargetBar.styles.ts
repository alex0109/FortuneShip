import { StyleSheet } from 'react-native';

import { colors } from '../../../../shared/assets/styles/local.style';

export const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '80%',
    marginBottom: 30,
    borderBottomWidth: 0.3,
    borderStyle: 'solid',
    // borderBottomColor: customStyles.colors.gray,
  },
  contentItem: {
    flexDirection: 'row',
    width: '100%',
  },
  mainText: {
    // color: customStyles.colors.white,
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
