require('./components/navbar_component')

// events
document.addEventListener('keypress', (e) => {
  if (e.code === "Enter") {
    e.preventDefault()
    return false
  }
})
