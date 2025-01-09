import React from 'react'
import OrganizerDashboard from './pages/OrganizerPortal/OrganizerDashboard'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import ExhibitorDashboard from './pages/ExhibitorPortal/ExhibitorDashboard'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Home from './pages/AttendeePortal/Home'
import EventExpos from './pages/AttendeePortal/EventExpos'
import EventDetails from './pages/AttendeePortal/EventDetails'
import AttendeePage from './pages/AttendeePortal/AttendeePage'
import ScheduleEvents from './pages/AttendeePortal/ScheduledEvents'
import ExhibitorSearch from './pages/AttendeePortal/ExhibitorSearch'
import ProfilePage from './pages/AttendeePortal/ProfilePage'
export default function App() {

  const user = JSON.parse(localStorage.getItem('user'))

  // Check if user exists before trying to access its properties
  const role = user ? user.role : null;
  console.log(user);
  const router = createBrowserRouter([
    {
      path: '/', element: <AttendeePage />,
      children: [
        { path: "/", element: <Home /> },
        { path: '/event', element: <EventExpos /> },
        { path: '/event/:id', element: <EventDetails /> },
        { path: '/scheduledevents', element: <ScheduleEvents /> },
        { path: '/exhibitorsearch', element: <ExhibitorSearch /> },
        { path: '/profile', element: <ProfilePage /> },
      ]
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },

    { path: '/organizer', element:  role=="organizer"?<OrganizerDashboard />:<Navigate to="/"/> },
    { path: '/exhibitor', element:  role=="exhibitor"?<ExhibitorDashboard />:<Navigate to="/"/> },

  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
