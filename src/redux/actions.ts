/** @format */

export const loginUser = (content: string) => ({
  type: "LOGIN",
  payload: {
    email: content,
  },
});

export const logoutUser = () => ({
  type: "LOGOUT",
});
