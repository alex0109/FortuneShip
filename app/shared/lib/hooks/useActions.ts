import { bindActionCreators } from '@reduxjs/toolkit';
import { cashActions } from 'pages/Accounts/lib/store/cashSlice';
import { targetActions } from 'pages/Accounts/lib/store/targetSlice';
import { categoriesActions } from 'pages/Chart/lib/store/categorySlice';
import { useDispatch } from 'react-redux';

// import { cashActions } from '../../../pages/Accounts/lib/store/cash.slice';

// import { targetActions } from '../../../pages/Accounts/lib/store/targets.slice';

const allActions = {
  ...categoriesActions,
  ...cashActions,
  ...targetActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
