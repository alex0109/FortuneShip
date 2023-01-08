import { cashActions } from '../store/Cash/cash.slice';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { targetActions } from '../store/Targets/targets.slice';

const allActions = {
  ...cashActions,
  ...targetActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
