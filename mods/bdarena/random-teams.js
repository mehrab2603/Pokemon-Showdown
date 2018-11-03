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
				species: 'Machamp', ability: 'Dry Skin', item: 'Leftovers', gender: 'M',
				moves: ['Drain Punch', 'Earthquake', 'Confide'],
				signatureMove: 'I Like Pie',
				evs: {atk: 252, def: 4, spe: 252}, nature: 'Adamant', shiny: true,
			},
			'Salman': {
				species: 'Tyranitar', ability: 'Insomnia', item: 'Life Orb', gender: 'M',
				moves: ['Diamond Storm', 'Knock Off', 'Worry Seed'],
				signatureMove: 'arik wins lol',
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'Muhib': {
				species: 'Honchkrow', ability: 'Rattled', item: 'Life Orb', gender: 'M',
				moves: ['Swords Dance', 'Crunch', 'Chatter'],
				signatureMove: "Perfect Shitpost",
				evs: {hp:128, atk:252, spe:128}, nature: 'Hasty',
			},
			'Arifeen': {
				species: 'Togekiss', ability: 'Super Luck', item: 'Sharp Beak', gender: 'M',
				moves: ['Aeroblast', 'Moonblast', 'Roost'],
				signatureMove: 'Andromeda',
				evs: {spa:252, def:128, spe:128}, nature: 'Modest',
			},
			'Akash': {
				species: 'Sableye', ability: 'Magic Guard', item: 'Roseli Berry', gender: 'M',
				moves: ['Foul Play', 'Spectral Thief', 'Lovely Kiss'],
				signatureMove: 'Mono Ghost',
				evs: {atk:252, def:4, spe:252}, nature: 'Adamant',
			},
			'Shafi': {
				species: 'Azumarill', ability: 'Cheek Pouch', item: 'Sitrus Berry', gender: 'M',
				moves: ['Aqua Jet', 'Liquidation', 'Belly Drum'],
				signatureMove: 'Fair and Roughly',
				evs: {hp:252, atk:252, spe:4}, nature: 'Adamant',
			},
			'Aunim': {
				species: 'Mr. Mime', ability: 'Truant', item: 'Focus Band', gender: 'M',
				moves: ['Quiver Dance', 'Baton Pass', 'Moonblast'],
				signatureMove: 'Amake Diye Ki Hobe',
				evs: {spa:252, spd:4, spe:252}, nature: 'Timid',
			},
			'Shaafique': {
				species: 'Phanpy', ability: 'Huge Power', item: 'Eviolite', gender: 'M',
				moves: ['Thousand Arrows', 'Extreme Speed', 'Stealth Rock'],
				signatureMove: 'Phanchu Core',
				evs: {atk:252, spd:4, spe:252}, nature: 'Jolly',
			},
			'Nazib': {
				species: 'Manaphy', ability: 'Torrent', item: 'Splash Plate', gender: 'M',
				moves: ['Heart Swap', 'Steam Eruption', 'Grass Knot'],
				signatureMove: 'MANAPHY4EVA',
				evs: {hp:252, spd:128, spe:128}, nature: 'Timid',
			},
			'Uzair': {
				species: 'Raikou', ability: 'Download', item: 'Black Glasses', gender: 'M',
				moves: ['Nasty Plot', 'Ice Beam', 'Parabolic Charge'],
				signatureMove: 'Heel Turn',
				evs: {spa:252, spd:128, spe:128}, nature: 'Modest',
			},
			'Seyan': {
				species: 'Scizor', ability: 'Technician', item: 'Leftovers', gender: 'M',
				moves: ['Bullet Punch', 'Bug Bite', 'Ice Shard'],
				signatureMove: 'Super Saiyan',
				evs: {atk:252, def:128, spe:128}, nature: 'Adamant',
			},
			'Swagata': {
				species: 'Alakazam', ability: 'Illusion', item: 'Focus Sash', gender: 'M',
				moves: ['Protect', 'Psystrike', 'Dazzling Gleam'],
				signatureMove: 'Blaziken Boost',
				evs: {spa:252, spd:4, spe:252}, nature: 'Timid',
			},
			'Shadman': {
				species: 'Luxray', ability: 'Hustle', item: 'Bright Powder', gender: 'M',
				moves: ['Bolt Strike', 'Gunk Shot', 'Power Whip'],
				signatureMove: 'Five Knuckle Shuffle',
				evs: {atk:252, spd:4, spe:252}, nature: 'Jolly',
			},
			'Asim': {
				species: 'Cherrim', ability: 'Get Haxed', item: 'Bright Powder', gender: 'M',
				moves: ['Nuzzle', 'Giga Drain', 'Fusion Flare'],
				signatureMove: 'No Hax Just Me',
				evs: {spa:252, spd:4, spe:252}, nature: 'Timid',
			},
			'Rabib': {
				species: 'Empoleon', ability: 'Swift Swim', item: 'Waterium Z', gender: 'M',
				moves: ['Swords Dance', 'Rain Dance', 'Liquidation'],
				signatureMove: 'Insert Bad Joke Here',
				evs: {atk:252, spd:4, spe:252}, nature: 'Jolly',
			},
			'Sayad': {
				species: 'Typhlosion', ability: 'Desolate Land', item: 'Firium Z', gender: 'M',
				moves: ['Magma Storm', 'Fire Blast', 'Earth Power'],
				signatureMove: 'Bayad',
				evs: {spa:252, spd:4, spe:252}, nature: 'Modest',
			}
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
