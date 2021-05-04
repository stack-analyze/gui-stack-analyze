const { Dropdown } = require('materialize-css')

// events
document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.dropdown-trigger')
  Dropdown.init(elems, { 
    constrainWidth: false,
    coverTrigger: false
  })
})

document.addEventListener('keypress', (e) => {
  if (e.code === "Enter") {
    e.preventDefault()
    return false
  }
})
