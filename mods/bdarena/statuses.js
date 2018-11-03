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
	tonmoy: { // No single quotes causes issues
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
	salman: {
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
	muhib: {
		noCopy: true,
		onStart: function () {
			this.add(`c|Muhib|Ei group e post dite hole amar permission lage na`);
		},
		onSwitchOut: function () {
			this.add(`c|Muhib|pika pika pika chu`);
		},
		onFaint: function () {
			this.add(`c|Muhib|One Piece er spoiler dicchi pm e`);
		},
	},
	shafi: {
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
	arifeen: {
		noCopy: true,
		onStart: function () {
			this.add(`c|Arifeen|OMG SURPRISE DOGGO`);
		},
		onSwitchOut: function () {
			this.add(`c|Arifeen|Timer on kor`);
		},
		onFaint: function () {
			this.add(`c|Arifeen|Going back to study, have an exam tomorrow`);
		},
	},
	akash: {
		noCopy: true,
		onStart: function () {
			this.add(`c|Akash|Chumma`);
		},
		onSwitchOut: function () {
			this.add(`c|Akash|Wadu heck`);
		},
		onFaint: function () {
			this.add(`c|Akash|Ma nama Jeff`);
		},
	},
	aunim: {
		noCopy: true,
		onStart: function () {
			this.add(`c|Aunim|Ki ase jibone`);
		},
		onSwitchOut: function () {
			this.add(`c|Aunim|Please use me`);
		},
		onFaint: function () {
			this.add(`c|Aunim|Sigh. As expected`);
		},
	},
	shaafique: {
		noCopy: true,
		onStart: function () {
			this.add(`c|Shaafique|Fekasu reporting for duty`);
		},
		onSwitchOut: function () {
			this.add(`c|Shaafique|Next time, boss`);
		},
		onFaint: function () {
			this.add(`c|Shaafique|Phanpy and Pikachu still best combination`);
		},
	},
	nazib: {
		noCopy: true,
		onStart: function () {
			this.add(`c|Nazib|Mana-chan <3`);
		},
		onSwitchOut: function () {
			this.add(`c|Nazib|Yay this Manaphy has a way to hit Water-types!`);
		},
		onFaint: function () {
			this.add(`c|Nazib|Glad`);
		},
	},
	seyan: {
		noCopy: true,
		onStart: function () {
			this.add(`c|Seyan|Activating ultimate power`);
		},
		onSwitchOut: function () {
			this.add(`c|Seyan|Not even my final form`);
		},
		onFaint: function () {
			this.add(`c|Seyan|Scizor OP`);
		},
	},
	uzair: {
		noCopy: true,
		onStart: function () {
			this.add(`c|Uzair|Whats going on ladies and gentlemen the Uzigunner here with another UBL match`);
		},
		onSwitchOut: function () {
			this.add(`c|Uzair|Your friendly neighbourhood stutterman will be back`);
		},
		onFaint: function () {
			this.add(`c|Uzair|This was the Uzigunner, signing out. PHISH!`);
		},
	},
	swagata: {
		noCopy: true,
		onFaint: function () {
			this.add(`c|Swagata|... How did you know`);
		},
	shadman: {
		noCopy: true,
		onStart: function () {
			this.add(`c|Shadman|TUTUTUTUTTUUTU trumpet noise`);
		},
		onSwitchOut: function () {
			this.add(`c|Shadman|Put kora Dipjol`);
		},
		onFaint: function () {
			this.add(`c|Shadman|The world is filled with many unique psychological views. I just can'/t understand some of them`);
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
