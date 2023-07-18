// modules
const { ipcRenderer } = require('electron')
const Chart = require('chart.js/auto')
const ctxOptions = require('./graphOpts')
const toast = require('../scripts/toast')

// DOM elements
const pokemonStats = document.querySelector('#pokemon-stats')
const pokemon = document.querySelector('#pokemon')
const pokemonSearch = document.querySelector('#analyze-button')
const pokemonSearchOpt = document.querySelector('#pokemon-opt')

const pokemonName = document.querySelector('#pokemon-name')
const pokemonTypes = document.querySelector('#pokemon-types')
const pokemonSprite = document.querySelector('#pokemon-sprite')

pokemonStats.getContext('2d')

// chart opts
Chart.defaults.color = '#ccc';
Chart.defaults.borderColor = '#fff';
const chart = new Chart(pokemonStats, ctxOptions)

// methods
const pokemonInfo = async () => {
	let result
	
	if (pokemonSearchOpt.value === 'name') {
		const pattern = /^[0-9]/g;
		
		if (pattern.test(pokemon.value)) {
			return toast(`you using search based in names not allow numbers`)
		}
		
		if(!pokemon.value) {
			return toast('this field is required')
		}
		
		result = pokemon.value
	} else {
		pokemon.type = 'number'
		
		if(pokemon.valueAsNumber <= 0 || isNaN(pokemon.valueAsNumber)) {
			return toast('please number 1 or higher')
		}
		
		result = pokemon.valueAsNumber
	}
	
	try {
		const data = await (
			await fetch(`https://pokeapi.co/api/v2/pokemon/${result}`)
		).json()
		
		pokemonSprite.src = data.sprites.front_default
		
		pokemonName.textContent = `#${data.id} - ${data.name}`
		
		pokemonTypes.innerHTML = ''
		
		data.types.forEach(({ type }) => {
			const pokeType = document.createElement('li')
			pokeType.classList.add(type.name)
			pokeType.textContent = type.name
			
			pokemonTypes.append(pokeType)
		})
		
		data.stats.forEach(({ base_stat },i) => {
			chart.data.datasets[0].data[i] = base_stat
		})
		
		chart.data.datasets[0].data[6] = data.base_experience
		
		chart.update()
		
	} catch(err) {
		toast(err.message)
		console.error(err.message)
	}
	
	if (typeof result === 'number') {
		pokemon.type = 'text'
		pokemonSearchOpt.value = 'name'
	}
	
	pokemon.value = ''
}

pokemonSearch.addEventListener('click', e => {
	pokemonInfo()
})

ipcRenderer.on('clear-stack', () => {
	pokemonSprite.src = 'no-found.jpg'
		
	pokemonName.textContent = '#0 - no pokemon'
	
	pokemonTypes.innerHTML = ''
	
	chart.data.datasets[0].data[0] = 0
	chart.data.datasets[0].data[1] = 0
	chart.data.datasets[0].data[2] = 0
	chart.data.datasets[0].data[3] = 0
	chart.data.datasets[0].data[4] = 0
	chart.data.datasets[0].data[5] = 0
	chart.data.datasets[0].data[6] = 0
	
	chart.update()
})
