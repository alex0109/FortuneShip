import { StyleSheet } from 'react-native';

import { colors } from '../../../../shared/assets/styles/local.style';

export const styles = StyleSheet.create({
  registration: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registrationTitle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  registrationBox: {
    flex: 1,
    width: '40%',
    justifyContent: 'center',
  },
  registrationBoxItem: {
    fontSize: 18,
    tintColor: colors.gray,
    marginBottom: 15,
    borderBottomWidth: 1,
  },
  registrationLinks: {
    flex: 1,
  },
  title: {
    fontSize: 35,
    fontWeight: '800',
    fontFamily: 'Assistant',
  },
  authButton: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Assistant',
    marginBottom: 20,
  },
});
