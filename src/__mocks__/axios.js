//to mock axios, use jest mock function
export default{
    get: jest.fn(() => Promise.resolve({data: {}} ))
}