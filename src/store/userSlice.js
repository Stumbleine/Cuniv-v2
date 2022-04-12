import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	user: {},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		sayHello: (state) => {
			console.log('hello');
		},
		setUser: (state, action) => {
			state.user = action.payload;
			console.log('USERDEMO=>', state.user);
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
