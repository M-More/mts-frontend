const getUsers = (url) => (
  new Array(10)
    .fill(0)
    .map(() => ({
      'role': '0',
      'phone': '@phone',
      'login': 1,
      'email': '@email',
      'username': '@cname',
    }))
);

export default getUsers;
