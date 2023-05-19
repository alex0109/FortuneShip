import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  accountsButton: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    opacity: 0.6,
  },
  accountsTitle: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingLeft: 35,
    marginTop: 30,
    marginBottom: 30,
  },
  accountsNoFundMessage: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  accountsScroll: {
    flex: 10,
  },
  accountsContent: {
    flex: 11,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  h1Text: {
    fontSize: 27,
    fontWeight: '800',
    fontFamily: 'Assistant',
  },
  h2Text: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: '400',
    fontFamily: 'Assistant',
  },
  accountsHeaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth - windowWidth / 2.5,
    height: '100%',
  },
  modalContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    borderTopWidth: 5,
    padding: 15,
  },
  modalTitle: {
    justifyContent: 'center',
    textAlign: 'center',
    width: 300,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Assistant',
  },
  modalCountContainer: {
    height: '40%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalCountText: {
    textAlign: 'center',
    minWidth: '30%',
    marginBottom: 25,
    fontSize: 20,
    borderBottomWidth: 1,
  },
  modalPopUpButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalPopUpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalPopUpContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalPopUpButton: {
    fontSize: 16,
  },
});
