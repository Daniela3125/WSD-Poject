import axios from 'axios'
import { fetchPhotos } from '../services/flickrApi'

jest.mock('axios', () => ({
  get: jest.fn()
}))

describe('fetchPhotos service', () => {
  test('returns photos from mocked API', async () => {
    axios.get.mockResolvedValue({
      data: {
        contents: JSON.stringify({
          items: [{ title: 'Mock Photo' }]
        })
      }
    })

    const result = await fetchPhotos('test')

    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Mock Photo')
  })
})
