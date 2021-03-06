import { userApi } from 'utils/api';
import { openNotification } from 'utils/helpers';
import { axios } from 'core';

const Actions = {
	setUserData: ({ isAuth }) => ({ type: 'USER:SET_DATA', payload: isAuth }),
	fetchUserSignIn: postData => dispatch => {
		dispatch({ type: 'USER:SET_IS_SUBMITTING', payload: true });

		userApi
			.signIn(postData)
			.then(({ data }) => {
				const { token, status } = data;
				if (status === 'success') {
					window.localStorage['token'] = token;
					axios.defaults.headers.common['token'] = token;
					dispatch(Actions.setUserData({ isAuth: true }));
					openNotification({
						type: 'success',
						message: 'You are successfully logged in',
					});
				} else {
					openNotification({
						type: 'error',
						message: 'Authorization error',
						description: 'Invalid username or password',
					});
				}
				dispatch({ type: 'USER:SET_IS_SUBMITTING', payload: false });
			})
			.catch(() => {
				openNotification({
					type: 'error',
					message: 'Server error',
				});
				dispatch({ type: 'USER:SET_IS_SUBMITTING', payload: false });
			});
	},
};

export default Actions;
