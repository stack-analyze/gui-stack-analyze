const toast = (txt, classAlert = 'toast' ) => {
  const toast = document.createElement('div')
  toast.textContent = txt
  toast.classList.add(classAlert, 'show')
  document.body.prepend(toast)
  
  setTimeout(() => { 
    toast.classList.remove('show')
    document.body.removeChild(toast)
  }, 3000)
}

module.exports = toast

