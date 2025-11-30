// modules
const { ipcRenderer } = require('electron')
const TCGdex = require('@tcgdex/sdk').default
const toast = require('../scripts/toast')
const TCGP_EXPANSIONS = require('./tcgpSets')

// DOM elements
const tcgpForm = document.getElementById('tcgp-form')
const tcgpSet = document.querySelector('select')
const tcgpID = document.querySelector('input')
const cardImg = document.querySelector('img')
const cardTitle = document.querySelector('.card-title')
const cardSubtitle = document.querySelector('.card-subtitle')
const cardAttacks = document.querySelector('.card-attacks')
const cardFooter = document.querySelector('.card-footer')

// init tcgdex
const tcgdex = new TCGdex('en');

// function
async function tcgp(set, id) {
  try {
    const card = await tcgdex.fetchCard(id, set)

    cardImg.src = `${card.image}/high.webp`

    cardTitle.textContent = `${card.name} (${card.id})`
    const tcgpType = card.category === 'Trainer' ? card.trainerType : card.types.at(0)
    cardSubtitle.innerHTML = `${tcgpType} <em>${card.rarity}</em>`

    cardAttacks.innerHTML = ''

    if (typeof card.effect !== 'undefined') {
      const cardEffect = document.createElement('section')
      cardEffect.textContent = card.effect
      cardAttacks.append(cardEffect)
    }

    if (typeof card.abilities !== 'undefined') {
      const cardAbility = document.createElement('section')
      cardAbility.innerHTML = `
      <strong class="card-ability-name">${card.abilities[0].name}</strong>: ${card.abilities[0].effect}
      `
      cardAttacks.append(cardAbility)
    }

    if (typeof card.attacks !== 'undefined') {
      for (const attack of card.attacks) {
        const cardAttack = document.createElement('section')
        cardAttack.classList.add('card-attack')
        const cardEnergies = document.createElement('div')
        cardEnergies.classList.add('card-energies')
        const cardAttackName = document.createElement('em')
        const cardAttackDamage = document.createElement('strong')

        // cost
        if (typeof attack.cost === 'undefined') {
          const energyFree = document.createElement('img')
          energyFree.classList.add('card-energy')
          energyFree.alt = 'energy free'
          energyFree.src = './icons/free.svg'
          cardEnergies.append(energyFree)
        } else {
          attack.cost.forEach(energy => {
            const energyIcon = document.createElement('img')
            energyIcon.classList.add('card-energy')
            energyIcon.alt = `energy ${energy}`
            energyIcon.src = `./icons/${energy}.svg`
            cardEnergies.append(energyIcon)
          })
          
        }

        // atack name & damage
        cardAttackName.textContent = attack.name
        cardAttackDamage.textContent = attack.damage || 'special'

        cardAttack.append(cardEnergies, cardAttackName, cardAttackDamage)

        if (typeof attack.effect !== 'undefined') {
          const cardAttackEffect = document.createElement('p')
          cardAttackEffect.classList.add('card-attack-description')
          cardAttackEffect.textContent = attack.effect
          cardAttack.append(cardAttackEffect)
        }

        cardAttacks.append(cardAttack)
      }
    }

    if(typeof card.retreat !== 'undefined') {
      const weaknessesItem = document.createElement('li')
      weaknessesItem.textContent = `${card.weaknesses.at(0).type}: ${card.weaknesses.at(0).value}`
      const retreatItem = document.createElement('li')
      retreatItem.textContent = `retreat cost: ${card.retreat}`

      cardFooter.append(weaknessesItem, retreatItem)
    }

    // console.info(card)
  } catch (err) { toast(err.message) }
}

// events
tcgpSet.addEventListener('change', () => {
  tcgpID.disabled = tcgpSet.value === ''

  if (tcgpSet.value !== '') {
    tcgpID.max = TCGP_EXPANSIONS[tcgpSet.value]
  } else {
    tcgpID.removeAttribute('max')
  }
})

tcgpForm.addEventListener('submit', (e) => {
  tcgp(tcgpSet.value, tcgpID.valueAsNumber)

  e.preventDefault()
  tcgpForm.reset()
})

// delete analyzer
ipcRenderer.on('clear-stack', () => {
  cardImg.src = '../images/not-found.jpg'
  cardTitle.textContent = ''
  cardSubtitle.innerHTML = ''
  cardAttacks.innerHTML = ''
  cardFooter.innerHTML = ''
})
