import { bindActionCreators } from '@reduxjs/toolkit';
import { categoriesActions } from 'pages/Chart/lib/store/categorySlice';
import { countActions } from 'pages/Count/lib/store/countSlice';
import { targetActions } from 'pages/Target/lib/store/targetSlice';
import { useDispatch } from 'react-redux';

// import { cashActions } from '../../../pages/Accounts/lib/store/cash.slice';

// import { targetActions } from '../../../pages/Accounts/lib/store/targets.slice';

const allActions = {
  ...categoriesActions,
  ...countActions,
  ...targetActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
