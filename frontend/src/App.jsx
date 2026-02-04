import { useState } from "react"
import Nav from "./components/Nav.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx"
import { Outlet } from "react-router-dom"

function App() {
  const [user, setUser] = useState(null)
  return (
    <>
      <div>
        <ScrollToTop />
        <Nav />
        <Outlet context={{ user, setUser }} />
      </div>
    </>
  )
}

export default App
