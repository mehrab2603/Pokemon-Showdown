'use strict';

/**@type {{[k: string]: ModdedEffectData}} */
let BattleStatuses = {
	/*
	// Example:
	userid: {
		noCopy: true,
		onStart: function () {
			this.add(`c|+Username|Switch In Message`);
		},
		onSwitchOut: function () {
			this.add(`c|+Username|Switch Out Message`);
		},
		onFaint: function () {
			this.add(`c|+Username|Faint Message`);
		},
		// Innate effects go here
	},
	*/
	// Please keep statuses organized alphabetically based on staff member name!
	'Tonmoy': { // No single quotes causes issues
		noCopy: true,
		onStart: function () {
			this.add(`c|Tonmoy|Do you like pie?`);
		},
		onSwitchOut: function () {
			this.add(`c|Tonmoy|Time for the young to shine.`);
		},
		onFaint: function () {
			this.add(`c|Tonmoy|Hope you had fun!`);
		},
	},
	'Salman': {
		noCopy: true,
		onStart: function () {
			this.add(`c|Salman|le goat`);
		},
		onSwitchOut: function () {
			this.add(`c|Salman|Don't worry I will win this`);
		},
		onFaint: function () {
			this.add(`c|Salman|lol hax nub`);
		},
	},
	'Muhib': {
		noCopy: true,
		onStart: function () {
			this.add(`c|Muhib|Ei group e post dite bole amar permission lage na`);
		},
		onSwitchOut: function () {
			this.add(`c|Muhib|pika pika pika chu`);
		},
		onFaint: function () {
			this.add(`c|Muhib|One Piece er spoiler dicchi pm e`);
		},
	},
	'Shafi': {
		noCopy: true,
		onStart: function () {
			this.add(`c|Shafi|Wait why am I an Azumarill again`);
		},
		onSwitchOut: function () {
			this.add(`c|Shafi|New Theorymon adventure?`);
		},
		onFaint: function () {
			this.add(`c|Shafi|-_-`);
		},
	},
	// Custom effect for Yuki
	cutietrap: {
		duration: 5,
		noCopy: true,
		onStart: function (pokemon, source) {
			if (!this.runEvent('Attract', pokemon, source)) {
				this.debug('Attract event failed');
				return false;
			}
			this.add('-start', pokemon, 'Attract', '[from] move: Cutie Trap', '[of] ' + source);
			this.add('-message', `${pokemon.name} was trapped by love!`);
		},
		onBeforeMovePriority: 2,
		onBeforeMove: function (pokemon) {
			this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectData.source);
			if (this.randomChance(1, 2)) {
				this.add('cant', pokemon, 'Attract');
				return false;
			}
		},
		onTrapPokemon: function (pokemon) {
			pokemon.tryTrap();
		},
		onEnd: function (pokemon) {
			this.add('-end', pokemon, 'Attract', '[silent]');
			this.add('-message', `${pokemon.name} is no longer trapped by love.`);
		},
	},
	// Modified hail for Yuki
	hail: {
		inherit: true,
		onStart: function (battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				if (this.gen <= 5 || effect.id === 'snowstorm') this.effectData.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect, '[of] ' + source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
	},
	// boostreplacement condition for nui's zmove
	boostreplacement: {
		// this is a side condition
		name: 'boostreplacement',
		id: 'boostreplacement',
		onStart: function (side, source) {
			this.effectData.position = source.position;
		},
		onSwitchInPriority: 1,
		onSwitchIn: function (target) {
			if (!target.fainted && target.position === this.effectData.position) {
				this.boost({def: 1, spd: 1});
				target.side.removeSideCondition('boostreplacement');
			}
		},
	},
	// Prevents glitch out from running more than once per turn per pokemon & boosts base power
	glitchout: {
		duration: 1,
		onTryHit: function (target, source, move) {
			if (move.basePower) {
				move.basePower += 20;
				this.debug('glitch out base power boost');
			}
		},
	},
	// Modified type setup for arceus
	arceus: {
		inherit: true,
		onType: function (types, pokemon) {
			if (pokemon.transformed) return types;
			/** @type {string | undefined} */
			let type = 'Normal';
			if (pokemon.ability === 'multitype' || pokemon.ability === 'logia') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	// Slowbroth's Alien wave. This is here so Trick Room can be in the move's PseudoWeather.
	alienwave: {
		duration: 5,
		onStart: function (target, source) {
			this.add('-fieldstart', 'move: Alien Wave');
			this.add('-message', `Psychic-type attacks can hit Dark-type Pokemon!`);
		},
		onNegateImmunity: function (pokemon, type) {
			if (pokemon.hasType('Dark') && type === 'Psychic') return false;
		},
		onUpdate: function () {
			if (!this.pseudoWeather.trickroom) {
				this.removePseudoWeather('alienwave');
			}
		},
		onResidualOrder: 23,
		onEnd: function () {
			this.add('-fieldend', 'move: Alien Wave');
			this.add('-message', `Psychic-type attacks can no longer hit Dark-type Pokemon.`);
		},
	},
};

exports.BattleStatuses = BattleStatuses;
