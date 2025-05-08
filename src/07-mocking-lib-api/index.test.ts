import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('lodash', () => ({
  throttle: (fn: any) => fn,
}));

describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();

  beforeEach(() => {
    mockedAxios.create.mockReturnValue({
      get: mockGet,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    mockGet.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi('/posts');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockGet.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi('/users');

    expect(mockGet).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    const mockData = { id: 1, title: 'Test' };
    mockGet.mockResolvedValue({ data: mockData });

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(mockData);
  });
});
