import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../components/SearchBar'

test('calls onSearch when Enter is pressed', () => {
  const onSearch = jest.fn()

  render(<SearchBar onSearch={onSearch} />)

  const input = screen.getByPlaceholderText(/search photos/i)

  fireEvent.change(input, {
    target: { value: 'nature' }
  })

  fireEvent.keyDown(input, {
    key: 'Enter',
    code: 'Enter'
  })

  expect(onSearch).toHaveBeenCalledWith('nature')
})
