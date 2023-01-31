import { cashActions } from '../../../pages/Accounts/lib/store/cash.slice';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { targetActions } from '../../../pages/Accounts/lib/store/targets.slice';

const allActions = {
  ...cashActions,
  ...targetActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
