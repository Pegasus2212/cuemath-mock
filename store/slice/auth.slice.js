import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  signup_cred: {
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    age: "",
  },
  login_cred: {
    email: "",
    password: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleSignUpChange: (state, action) => {
      switch (action.payload.type) {
        case "age":
          state.signup_cred.age = numericValue;
          break;
        case "name":
          state.signup_cred.name = action.payload.value;
          break;
        case "confirm_pass":
          state.signup_cred.name = action.payload.value;
          break;
        case "password":
          setPassLength(value.length);
          setCredentails((c) => ({ ...c, password: value }));
          break;
        case "email":
          setCredentails((c) => ({ ...c, email: value }));
          break;
      }
    },
    setModalData: (state, action) => {
      if (action.payload) {
        const { addingAccount, ...rest } = action.payload;
        state.modalData = rest;
      } else {
        state.modalData = action.payload;
      }
    },
    refreshAccounts: (state, action) => {
      state.modalData.accounts = action.payload;
    },
  },
});

export const { setModalData, refreshAccounts } = authSlice.actions;

export default authSlice.reducer;
