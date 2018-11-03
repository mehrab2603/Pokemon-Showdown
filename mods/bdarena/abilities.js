'use strict';

/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
	/*
	// Example
	"abilityid": {
		desc: "", // long description
		shortDesc: "", // short description, shows up in /dt
		id: "abilityid",
		name: "Ability Name",
		// The bulk of an ability is not easily shown in an example since it varies
		// For more examples, see https://github.com/Zarel/Pokemon-Showdown/blob/master/data/abilities.js
	},
	*/
	// Please keep abilites organized alphabetically based on staff member name!
	// Asim
	gethaxed: {
		desc: "Asim haxes",
		shortDesc: "Asim haxes",
		id: "gethaxed",
		name: "Get Haxed",
		isNonstandard: true,
		onStart: function (pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Get Haxed', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target, '[msg]');
				} else {
					this.boost({acc: -1}, target, pokemon);
				}
			}
		},
	},
	// Modified Illusion to support SSB volatiles
	illusion: {
		inherit: true,
		onEnd: function (pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				let disguisedAs = toId(pokemon.illusion.name);
				pokemon.illusion = null;
				let details = pokemon.template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Illusion');
				// Handle hippopotas
				if (this.getTemplate(disguisedAs).exists) disguisedAs += 'user';
				if (pokemon.volatiles[disguisedAs]) {
					pokemon.removeVolatile(disguisedAs);
				}
				if (!pokemon.volatiles[toId(pokemon.name)]) {
					let status = this.getEffect(toId(pokemon.name));
					if (status && status.exists) {
						pokemon.addVolatile(toId(pokemon.name), pokemon);
					}
				}
			}
		},
	},
	// Modified Prankster to not boost Army of Mushrooms
	prankster: {
		inherit: true,
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status' && move.id !== 'armyofmushrooms') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
	},
};

exports.BattleAbilities = BattleAbilities;
