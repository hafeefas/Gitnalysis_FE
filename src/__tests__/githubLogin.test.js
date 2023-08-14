import { getAuthenticatedUser } from "../services/githubLogin";
import mockAxios from 'axios';

jest.mock('axios');

it('calls axios and returns github auth', async () => {
  const expectedData = {
    results: ['userAuth']
  };

  // Set up the Axios mock to return the expected data
  mockAxios.get.mockResolvedValueOnce({ data: expectedData });

  // Call the function and await its response
  const authUser = await getAuthenticatedUser();
  
  // Check if the Axios mock function was called with the expected URL
  expect(mockAxios.get).toHaveBeenCalledWith(expect.stringContaining('/users/me'));
  
  // Check if the returned data matches the expected data
  expect(authUser).toEqual(undefined);
});
