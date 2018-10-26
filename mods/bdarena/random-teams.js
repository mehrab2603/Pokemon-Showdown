'use strict';

/** @typedef {{[name: string]: SSBSet}} SSBSets */
/**
 * @typedef {Object} SSBSet
 * @property {string} species
 * @property {string | string[]} ability
 * @property {string | string[]} item
 * @property {GenderName} gender
 * @property {(string | string[])[]} moves
 * @property {string} signatureMove
 * @property {{hp?: number, atk?: number, def?: number, spa?: number, spd?: number, spe?: number}=} evs
 * @property {{hp?: number, atk?: number, def?: number, spa?: number, spd?: number, spe?: number}=} ivs
 * @property {string | string[]} nature
 * @property {number=} level
 * @property {boolean=} shiny
 */

const RandomTeams = require('../../data/random-teams');

class RandomBDarenaTeams extends RandomTeams {
	randomBDarenaTeam() {
		/** @type {PokemonSet[]} */
		let team = [];
		/** @type {SSBSets} */
		let sets = {
			/*
			// Example:
			'Username': {
				species: 'Species', ability: 'Ability', item: 'Item', gender: '',
				moves: ['Move Name', ['Move Name', 'Move Name']],
				signatureMove: 'Move Name',
				evs: {stat: number}, ivs: {stat: number}, nature: 'Nature', level: 100, shiny: false,
			},
			// Species, ability, and item need to be captialized properly ex: Ludicolo, Swift Swim, Life Orb
			// Gender can be M, F, N, or left as an empty string
			// each slot in moves needs to be a string (the move name, captialized properly ex: Hydro Pump), or an array of strings (also move names)
			// signatureMove also needs to be capitalized properly ex: Scripting
			// You can skip Evs (defaults to 82 all) and/or Ivs (defaults to 31 all), or just skip part of the Evs (skipped evs are 0) and/or Ivs (skipped Ivs are 31)
			// You can also skip shiny, defaults to false. Level can be skipped (defaults to 100).
			// Nature needs to be a valid nature with the first letter capitalized ex: Modest
			*/
			// Please keep sets organized alphabetically based on staff member name!
			'Tonmoy': {
				species: 'Machamp', ability: 'Mold Breaker', item: 'Leftovers', gender: 'M',
				moves: ['Drain Punch', 'Earthquake', 'Morning Sun'],
				signatureMove: 'Noble Howl',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Adamant', shiny: true,
			},
			'5gen': {
				species: 'Sawsbuck', ability: 'Season\'s Gift', item: 'Heat Rock', gender: 'M',
				moves: ['Sunny Day', 'Return', 'High Jump Kick'],
				signatureMove: 'Too Much Saws',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'ACakeWearingAHat': {
				species: 'Dunsparce', ability: 'Serene Grace', item: 'Leftovers', gender: 'M',
				moves: ['Headbutt', 'Shadow Strike', 'Roost'],
				signatureMove: 'Sparce Dance',
				evs: {hp: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'Aelita': {
				species: 'Porygon-Z', ability: 'Protean', item: 'Life Orb', gender: 'F',
				moves: [['Boomburst', 'Moonblast'], 'Blue Flare', 'Chatter'],
				signatureMove: 'Energy Field',
				evs: {hp: 4, spa: 252, spe: 252}, ivs: {atk: 0}, nature: 'Modest',
			},
			'Akir': {
				species: 'Parasect', ability: 'Regrowth', item: 'Leftovers', gender: 'M',
				moves: ['Spore', 'Leech Life', ['Toxic', 'Healing Wish', 'Parting Shot']],
				signatureMove: 'Compost',
				evs: {hp: 248, atk: 8, spd: 252}, nature: 'Careful',
			},
			'Amaluna': {
				species: 'Octillery', ability: 'Neuroforce', item: 'Expert Belt', gender: 'F',
				moves: ['Surf', 'Fire Blast', 'Freeze-Dry'],
				signatureMove: 'Turismo Splash',
				evs: {hp: 252, spa: 252, spd: 4}, ivs: {atk: 0, spe: 0}, nature: 'Quiet',
			},
			'Andy >_>': {
				species: 'Absol', ability: 'Adaptability', item: 'Absolite', gender: 'M',
				moves: ['Pursuit', 'Destiny Bond', 'Sucker Punch'],
				signatureMove: 'Pilfer',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Adamant',
			},
			'ant': {
				species: 'Durant', ability: 'Flash Fire', item: 'Leftovers', gender: 'F',
				moves: ['King\'s Shield', 'U-turn', 'Pursuit'],
				signatureMove: 'TRU ANT',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Jolly',
			},
			'A Quag to The Past': {
				species: 'Quagsire', ability: 'Unaware', item: 'Leftovers', gender: 'M',
				moves: ['Recover', 'Toxic', 'Scald'],
				signatureMove: 'Murky Ambush',
				evs: {hp: 252, def: 252, spd: 4}, ivs: {spe: 0}, nature: 'Relaxed',
			},
			'Arcticblast': {
				species: 'Garbodor', ability: 'Analytic', item: 'Assault Vest', gender: 'M',
				moves: ['Knock Off', 'Earthquake', ['Horn Leech', 'U-turn', 'Avalanche']],
				signatureMove: 'Trashalanche',
				evs: {hp: 252, atk: 252, def: 4}, ivs: {spe: 0}, nature: 'Brave',
			},
			'Zarel': {
				species: 'Meloetta', ability: 'Serene Grace', item: '', gender: 'M',
				moves: ['Lunar Dance', 'Fiery Dance', 'Perish Song', 'Petal Dance', 'Quiver Dance'],
				signatureMove: 'Relic Song Dance',
				evs: {hp: 4, atk: 252, spa: 252}, nature: 'Quiet',
			},
			'Zyg': {
				species: 'Zygarde', ability: 'Poison Heal', item: 'Leftovers', gender: 'N',
				moves: ['Thousand Arrows', 'Stone Edge', 'Coil'],
				signatureMove: 'The Life of Zyg',
				evs: {hp: 188, atk: 68, def: 252}, nature: 'Adamant',
			},
		};
		let pool = Object.keys(sets);
		/** @type {{[type: string]: number}} */
		let typePool = {};
		while (pool.length && team.length < 6) {
			let name = this.sampleNoReplace(pool);
			let ssbSet = sets[name];
			// Enforce typing limits
			let types = this.getTemplate(ssbSet.species).types;
			if (name === 'E4 Flint') types = ["Steel", "Ground", "Fire"];
			if (name === 'OM') types = ["Fire", "Fairy"];
			let rejected = false;
			for (let type of types) {
				if (typePool[type] === undefined) typePool[type] = 0;
				if (typePool[type] >= 2) {
					// Reject
					rejected = true;
					break;
				}
			}
			if (rejected) continue;
			// Update type counts
			for (let type of types) {
				typePool[type]++;
			}
			/** @type {PokemonSet} */
			let set = {
				name: name,
				species: ssbSet.species,
				item: Array.isArray(ssbSet.item) ? this.sampleNoReplace(ssbSet.item) : ssbSet.item,
				ability: Array.isArray(ssbSet.ability) ? this.sampleNoReplace(ssbSet.ability) : ssbSet.ability,
				moves: [],
				nature: Array.isArray(ssbSet.nature) ? this.sampleNoReplace(ssbSet.nature) : ssbSet.nature,
				gender: ssbSet.gender,
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
				level: ssbSet.level || 100,
				shiny: ssbSet.shiny,
			};
			if (ssbSet.ivs) {
				for (let iv in ssbSet.ivs) {
					// IVs from the set override the default of 31, assume the hardcoded IVs are legal
					// @ts-ignore StatsTable has no index signature
					set.ivs[iv] = ssbSet.ivs[iv];
				}
			}
			if (ssbSet.evs) {
				for (let ev in ssbSet.evs) {
					// EVs from the set override the default of 0, assume the hardcoded EVs are legal
					// @ts-ignore StatsTable has no index signature
					set.evs[ev] = ssbSet.evs[ev];
				}
			} else {
				set.evs = {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84};
			}
			while (set.moves.length < 3 && ssbSet.moves.length > 0) {
				let move = this.sampleNoReplace(ssbSet.moves);
				if (Array.isArray(move)) move = this.sampleNoReplace(move);
				set.moves.push(move);
			}
			set.moves.push(ssbSet.signatureMove);
			team.push(set);
		}
		return team;
	}
}

module.exports = RandomBDarenaTeams;
