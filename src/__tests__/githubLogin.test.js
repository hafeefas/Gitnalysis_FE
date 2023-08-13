const {getAuthenticatedUser} = require("../services/githubLogin");

jest.mock('axios');

it('calls axios and returns github auth', () => {
    const authUser = getAuthenticatedUser();
    console.log(authUser);
})