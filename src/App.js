import './assets/css/App.css'
import 'react-bootstrap'
import React, { lazy, Suspense } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './assets/css/style.css'
import PageNotFound from './Components/PageNotFound'
import Header from './Components/Navbar'
import Footer from './Components/Footer'
import Landingsegment from './Components/Landingsegment'
import Loader from './Components/Loader'
import Login from './Components/Login'
import Signup from './Components/Signup'

// const Signup = lazy(() => import('./Components/Signup'))
// const Login = lazy(() => import('./Components/Login'))

const ForgotPassword = lazy(() => import('./Components/ForgotPassword'))
const UpdateProfile = lazy(() => import('./Components/UpdateProfile'))
const Profile = lazy(() => import('./Components/Profile'))
const Chat = lazy(() => import('./Components/Chatroom'))
const Todo = lazy(() => import('./Components/Todo'))
const AboutUs = lazy(() => import('./Components/AboutUs'))
const Notes = lazy(() => import('./notes/Notes'))
const PreviewNotes = lazy(() => import('./notes/PreviewNotes'))

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Landingsegment />} />
            <Route path='/aboutus' element={<Suspense fallback={<Loader />}><AboutUs /></Suspense>} />
            <Route path='/notes' element={<Suspense fallback={<Loader />}><Notes /></Suspense>} />
            <Route path='/visitloader' element={<Loader />} />
            <Route path = '/previewnotes' element={<Suspense fallback={<Loader />}><PreviewNotes /></Suspense>} />
            <Route
              path='/update-profile'
              element={
                <RequireAuth redirectTo='/login'>
                  <Suspense fallback={<Loader />}>
                    <UpdateProfile />
                  </Suspense>
                </RequireAuth>
              }
            />
            <Route
              path='/community'
              element={
                <RequireAuth redirectTo='/login'>
                  <Suspense fallback={<Loader />}>
                    <Chat />
                  </Suspense>
                </RequireAuth>
              }
            />
            <Route
              path='/taskboard'
              element={
                <RequireAuth redirectTo='/login'>
                  <Suspense fallback={<Loader />}>
                    <Todo />
                  </Suspense>
                </RequireAuth>
              }
            />
            <Route
              path='/login'
              element={
                <IsLoggedIn redirectTo='/profile'>
                  {/* <Suspense fallback={<Loader />}> */}
                    <Login />
                  {/* </Suspense> */}
                </IsLoggedIn>
              }
            />
            <Route
              path='/profile'
              element={
                <RequireAuth redirectTo='/login'>
                  <Suspense fallback={<Loader />}>
                    <Profile />
                  </Suspense>
                </RequireAuth>
              }
            />

            <Route
              path='/signup'
              element={
                <IsLoggedIn redirectTo='/profile'>
                  {/* <Suspense fallback={<Loader />}> */}
                    <Signup />
                  {/* </Suspense> */}
                </IsLoggedIn>
              }
            />
            <Route
              path='/forgot-password'
              element={
                <IsLoggedIn redirectTo='/update-profile'>
                  <Suspense fallback={<Loader />}>
                    <ForgotPassword />
                  </Suspense>
                </IsLoggedIn>
              }
            />




            {/* <Route path='/signup' caseSensitive={false} element={<Suspense fallback={<Loader />}><Signup /></Suspense>} /> */}
            {/* <Route path='/profile' caseSensitive={false} element={<Suspense fallback={<Loader />}><Profile /></Suspense>} /> */}
            {/* <Route path='/forgot-password' element={<Suspense fallback={<Loader />}><ForgotPassword /></Suspense>} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  )
}

function RequireAuth({ children, redirectTo }) {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to={redirectTo} />
}

function IsLoggedIn({ children, redirectTo }) {
  const { currentUser } = useAuth()
  return currentUser ? <Navigate to={redirectTo} /> : children
}

export default App
