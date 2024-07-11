// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')
const toast = require('../scripts/toast')

// DOM elements
const search = document.querySelector('#search')
const analyzeButton = document.querySelector('#analyze-button')
const albumsList = document.querySelector('#albums')

// method
const deezerSearch = async () => {
	if(!search.value) {
		return toast('this field is required')
	}
	
	try {
		const { data } = await axios.get(
			'https://api.deezer.com/search/album', {
				params: {
			 		q: search.value
				}
		})
		
		data.data.forEach((album) => {
			// create Elements
			const albumContainer = document.createElement('article')
			const albumCover = document.createElement('img')
			const albumName = document.createElement('h2')
			const albumInfoList = document.createElement('ul')
			const albumRecordType = document.createElement('li')
			const albumArtist = document.createElement('li')
			const albumTotalTracks = document.createElement('li')
			const albumLyricsType = document.createElement('li')
			
			albumContainer.classList.add('app-glass', 'album')
			
			// image
			albumCover.src = album?.cover_medium ?? '../images/not-found.jpg'
			albumCover.alt = album.id
			albumCover.classList.add('album-img')
			
			// album title
			albumName.textContent = album.title
			albumName.classList.add('album-title')
			
			// list elements
			albumInfoList.classList.add('album-desc')
			
			albumArtist.textContent = `artist: ${album.artist.name}`
			albumRecordType.textContent = `record type: ${album.record_type}`
			albumTotalTracks.textContent = `tracks: ${album.nb_tracks}`
			albumLyricsType.textContent = album.explicit_lyrics 
				? 'explicit lyrics' 
				: 'clean lyrics'
				
			albumInfoList.append(albumArtist, albumRecordType, albumTotalTracks, albumLyricsType)
			
			// append elements
			albumContainer.append(albumCover, albumName, albumInfoList)
			albumsList.append(albumContainer)
		})
	} catch(err) { toast(err.message) }
}

analyzeButton.addEventListener('click', () => {
	deezerSearch()
	search.value = ''
})

ipcRenderer.on('clear-stack', () => {
  albumsContainer.innerHTML = ''
})
