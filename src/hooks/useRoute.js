export const UseRoute = (route) => {
  try {
    window.location.assign(route);
  } catch (error) {
    console.log(error);
  }
};
