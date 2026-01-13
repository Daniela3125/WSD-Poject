FlickrSearch – Technical Documentation

1. General Overview
FlickrSearch is a web application for searching and viewing public photos from Flickr. The application allows filtering by author, tags, and date, and provides Dark Mode, search history, and authentication via Supabase. The project uses React for the frontend and Supabase for the backend (authentication and data storage).
The repository contains all the frontend code, while Supabase serves as a serverless backend for authentication and storage.

2. Technical Objectives
•	Modern web architecture with React 19.2.3
•	Responsive interface with Tailwind CSS
•	Magic Link authentication via Supabase
•	Synchronization of search history and Dark Mode with Supabase
•	Image filtering and pagination
•	Consumption of the Flickr public API and local caching (LocalStorage)
•	Full deployment on Vercel

3. Features
•	Search photos by tags or author
•	Dark Mode / Light Mode
•	Persistent search history for unauthenticated users (LocalStorage) and synchronized for logged-in users (Supabase)
•	Results pagination
•	Filtering by author, tag, and date
•	Magic Link authentication via email
•	Responsive design for desktop and mobile

4. Technologies Used
Frontend
•	React 19.2.3, JSX
•	Tailwind CSS 4.1.18
•	Lucide React for icons
•	react-scripts (CRA)
•	Axios for API requests
Backend / Services
•	Supabase (auth + database)
•	Flickr Public API
Storage / Persistence
•	LocalStorage (for unauthenticated users)
•	Supabase (for authenticated users)

5. Agile Methodology
The project was developed iteratively, with continuous testing and feedback.
Main sprints:
•	Interface and layout
•	Dark Mode and LocalStorage
•	Supabase integration for authentication and data synchronization
•	Photo search and filtering
•	Pagination and optimizations
•	Testing and deployment on Vercel
Development flow:
A[Planning] --> B[UI/UX Design]
B --> C[Implementation]
C --> D[Unit + Integration Testing]
D --> E[Evaluation]
E --> F[Sprint Retrospective]
F --> G[Next Sprint]
G --> A
6. Application Architecture
Frontend - React
A[React Components] --> B[SearchBar, PhotoGrid, PhotoCard]
B --> C[Custom Hooks: useFlickr, useLocalStorage, useSupabaseSync]
C --> D[API Calls / Flickr + Supabase]
end
Backend - Supabase
D --> E[Magic Link Authentication]
D --> F[Dark Mode + History Storage]
end
External Services
X[Flickr API] --> C
End
7. React Component Architecture
App --> Home
Home --> SearchBar
Home --> PhotoGrid
PhotoGrid --> PhotoCard
Home --> Pagination
Home --> Filters
Home --> HistoryButtons
Home --> DarkModeToggle
8. API Documetation
Flickr API (Public)
Method	Endpoint	Description
GET	https://www.flickr.com/services/feeds/photos_public.gne?tags=...	Returns public photos with the specified tag
Supabase (Profiles)
Method	Endpoint	Description
SELECT	profiles	Retrieves user data (dark_mode, search_history)
UPSERT	profiles	Saves/updates dark_mode and search_history for the user
9. Frontend Routes
Route	Component	Description
/	Home	Main page with photo search and viewing
N/A	–	Magic Link authentication in popup
		

10. Unit & Integration Testing
Jest + React Testing Library
Example test:
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

For custom hooks (useLocalStorage):
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

Run tests with:
npm test
11. Deployment – Vercel
1.	Pushed the project to GitHub ( https://github.com/Daniela3125/WSD-Poject )
2.	Vercel → New Project → Import GitHub Repo
3.	Framework: Create React App
4.	Build Command: npm run build
5.	Output Directory: build
6.	Deploy
Live Demo
The application is live at:
https://wsd-poject-lvh1.vercel.app/

12. Conclusions
FlickrSearch is a modern, responsive web application with authentication, Dark Mode, and synchronized search history. The project is ready for scaling, automated testing, and deployment on cloud platforms such as Vercel.

