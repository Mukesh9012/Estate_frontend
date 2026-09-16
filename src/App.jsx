import { useState } from 'react'
import Header from './Components/Header'
import About from './Components/About'
import Project from './Components/Project'
import Teswtimonials from './Components/Teswtimonials'
import Contact from './Components/Contact'
import Signup from './Components/Signup'
import Footer from './Components/Footer'
import Chatbot from './Components/Chatbot'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('estateTheme') || 'light')
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('estateUser')
    return savedUser ? JSON.parse(savedUser) : null
  })

  function handleLogin(loggedInUser) {
    localStorage.setItem('estateUser', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
  }

  function handleLogout() {
    localStorage.removeItem('estateUser')
    setUser(null)
  }

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light'
      localStorage.setItem('estateTheme', nextTheme)
      return nextTheme
    })
  }

  if (!user) {
    return <Signup onAuthenticated={handleLogin} />
  }

  return (
    <div className={`estate-app ${theme}-theme`}>
      <Header user={user} onLogout={handleLogout} theme={theme} onToggleTheme={toggleTheme} />
      <About />
      <Project user={user} />
      <Teswtimonials />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App
