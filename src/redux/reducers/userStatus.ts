/** @format */

interface stateType {
  email: string;
  isLoggedIn: boolean;
}

const initialState: stateType = {
  email: "",
  isLoggedIn: false,
};

interface actionType {
  type: string;
  payload: {
    email: string;
  };
}

export const updateUserStatus = (
  state = initialState,
  action: actionType
): stateType => {
  console.log("updateUserStatus");
  switch (action.type) {
    case "LOGIN": {
      const { email } = action.payload;
      return {
        email,
        isLoggedIn: true,
      };
    }
    case "LOGOUT": {
      return {
        email: "",
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};
