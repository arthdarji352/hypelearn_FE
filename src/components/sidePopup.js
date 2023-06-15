import React from 'react'
import '../app.css'
// import styles from './sidepopup.module.css'

export default function Index({ isOpen, children }) {
  const [localOpen, setLocalOpen] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      setLocalOpen(true)
    } else {
      setTimeout(() => setLocalOpen(false), 500)
    }
  }, [isOpen])
  return (
    <>
      {localOpen ? (
        <div
          className={`h-screen w-full fixed bottom-0 left-0 bg-gray-700/50 backdrop-blur-sm backdrop-opacity-60 z-20  ${
            isOpen ? 'fade-in' : 'fade-out'
          }`}
        ></div>
      ) : null}
      {localOpen ? (
        <div
          className={`fixed bg-white w-1/3 h-screen top-0 right-0 overflow-auto z-20 ${
            isOpen ? 'slide-in' : 'slide-out'
          }`}
        >
          {children}
        </div>
      ) : null}
    </>
  )
}
