import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../hooks/useLocalStorage'

describe('useLocalStorage hook', () => {
  test('stores value in localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test-key', [])
    )

    act(() => {
      result.current[1](['test-value'])
    })

    const stored = JSON.parse(localStorage.getItem('test-key'))
    expect(stored).toEqual(['test-value'])
  })
})
