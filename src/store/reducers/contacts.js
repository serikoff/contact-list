const initialState = {
	items: [],
	isLoading: false,
	isSubmitting: false,
	isVisibleForm: false,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'CONTACTS:SET_ITEMS':
			return {
				...state,
				items: payload,
			};
		case 'CONTACTS:SET_IS_LOADING':
			return {
				...state,
				isLoading: payload,
			};
		case 'CONTACTS:SET_IS_SUBMITTING':
			return {
				...state,
				isSubmitting: payload,
			};
		case 'CONTACTS:ADD_CONTACT':
			return {
				...state,
				items: [payload, ...state.items],
			};
		case 'CONTACTS:SET_IS_VISIBLE_FORM':
			return {
				...state,
				isVisibleForm: payload,
			};
		default:
			return state;
	}
};
