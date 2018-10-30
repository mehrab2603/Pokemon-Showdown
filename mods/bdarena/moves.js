'use strict';

// Used for bumbadadabum and Snaquaza's move
const RandomStaffBrosTeams = require('./random-teams');
const Pokemon = require('../../sim/pokemon');

/** @type {{[k: string]: ModdedMoveData}} */
let BattleMovedex = {
	/*
	// Example
	"moveid": {
		accuracy: 100, // a number or true for always hits
		basePower: 100, // Not used for Status moves, base power of the move, number
		category: "Physical", // "Physical", "Special", or "Status"
		desc: "", // long description
		shortDesc: "", // short description, shows up in /dt
		id: "moveid",
		name: "Move Name",
		pp: 10, // unboosted PP count
		priority: 0, // move priority, -6 -> 6
		flags: {}, // Move flags https://github.com/Zarel/Pokemon-Showdown/blob/master/data/moves.js#L1-L27
		secondary: {
			status: "tox",
			chance: 20,
		}, // secondary, set to null to not use one. Exact usage varies, check data/moves.js for examples
		target: "normal", // What does this move hit?
		// normal = the targeted foe, self = the user, allySide = your side (eg light screen), foeSide = the foe's side (eg spikes), all = the field (eg raindance). More can be found in data/moves.js
		type: "Water", // The move's type
		// Other useful things
		noPPBoosts: true, // add this to not boost the PP of a move, not needed for Z moves, dont include it otherwise
		isZ: "crystalname", // marks a move as a z move, list the crystal name inside
		zMoveEffect: '', // for status moves, what happens when this is used as a Z move? check data/moves.js for examples
		zMoveBoost: {atk: 2}, // for status moves, stat boost given when used as a z move
		critRatio: 2, // The higher the number (above 1) the higher the ratio, lowering it lowers the crit ratio
		drain: [1, 2], // recover first num / second num % of the damage dealt
		heal: [1, 2], // recover first num / second num % of the target's HP
	},
	*/
	// Please keep sets organized alphabetically based on staff member name!
	// Tonmoy
	ilikepie: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack by two stages and cures the user of burns, paralysis, and poison. Removes Reflect, Light Screen, Aurora Veil, Safeguard, and Mist from the opponent's side and removes Spikes, Toxic Spikes, Stealth Rock, and Sticky Web from both sides.",
		shortDesc: "Raises Attack by 2, clears hazards/user status.",
		id: "ilikepie",
		name: "I Like Pie",
		isNonstandard: true,
		pp: 5,
		noPPBoosts: true,
		priority: 0,
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Howl', source);
			this.add('-anim', source, 'Boomburst', source);
		},
		onHit: function (target, source, move) {
			this.boost({atk: 2}, source, source, 'move: I Like Pie');
			if (!(['', 'slp', 'frz'].includes(source.status))) {
				source.cureStatus();
			}
			let removeTarget = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.getEffect(targetCondition).name, '[from] move: I Like Pie', '[of] ' + target);
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: I Like Pie', '[of] ' + source);
				}
			}
		},
		flags: {mirror: 1, snatch: 1, authentic: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// Arifeen
	andromeda: {
		accuracy: true,
		category: "Status",
		desc: "Boosts the user's Special Attack, Defense, and Speed by one stage.",
		shortDesc: "+1 spa, def, and spe.",
		id: "andromeda",
		name: "Andromeda",
		isNonstandard: true,
		pp: 15,
		priority: 0,
		flags: {snatch: 1, mirror: 1, dance: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Cosmic Power", source);
		},
		boosts: {def: 1, spe: 1},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	// Salman
	arikwinslol: {
		accuracy: 90,
		basePower: 50,
		category: "Physical",
		id: "arikwinslol",
		isViable: true,
		isNonstandard: true,
		name: "arik wins lol",
		pp: 10,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dark Pulse", source);
			this.add('-message', 'you tryna throw hands nigga ? im literally the greatest player of all time after zamrock , foxgod, wish killer , ctc and ikhwan.');
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('embargo');
			pokemon.addVolatile('torment');
		},
		secondary: false,
		target: "normal",
		type: "Dark",
	},
	// Aunim
	amakediyekihobe: {
		accuracy: 90,
		basePower: 200,
		category: "Special",
		id: "amakediyekihobe",
		isNonstandard: true,
		isViable: true,
		name: "Amake Diye Ki Hobe",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreImmunity: {'Psychic': true},
		onPrepareHit: function (target, source) {
			if (toId(source.name) === 'aunim') {
				this.add('c|Aunim| :( ');
			}
			this.attrLastMove('[still]');
			this.add('-anim', source, "Cosmic Power", source);
			this.add('-anim', source, "Explosion", source);
			this.add('-anim', source, "Light of Ruin", target);
		},
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Psychic",
	},
	// Akash
	monoghost: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		id: "monoghost",
		isNonstandard: true,
		isViable: true,
		name: "Mono Ghost",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		onHit: function (target) {
			if (!target.setType('Ghost')) return false;
			this.add('-start', target, 'typechange', 'Ghost');
		},
		secondary: {
			chance: 100,
			boosts: {	
				atk: -1,
			},
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Sneak", source);
		},
		target: "normal",
		type: "Ghost",
	},
	// Shafi
	fairandroughly: {
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		id: "fairandroughly",
		isViable: true,
		isNonstandard: true,
		name: "Fair and Roughly",
		pp: 10,
		priority: 0,
		flags: {contact:1, protect: 1, mirror: 1},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', target, "Play Rough", target);
		},
		secondary: {
			chance: 50,
			boosts: {	
				atk: -1,
			},
		},
		target: "Normal",
		type: "Fairy",
	},
	// Muhib
	perfectshitpost: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "perfectshitpost",
		isNonstandard: true,
		isViable: true,
		name: "Perfect Shitpost",
		pp: 5,
		noPPBoosts: true,
		priority: 1,
		self: {volatileStatus: 'magiccoat'},
		flags: {},
		onPrepareHit: function () {
			this.attrLastMove('[still]');
		},
		onHit: function (target, source) {
			source.side.addSideCondition('mist', source);
			source.side.addSideCondition('luckychant', source);
			source.side.addSideCondition('safeguard', source);
		},
		secondary: false,
		target: "self",
		type: "Dark",
	},
	// Shaafique
	phanchucore: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "phanchucore",
		isNonstandard: true,
		isViable: true,
		name: "Phanchu Core",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, snatch: 1},
		onHit: function (target, source) {
			let dice = this.random(9);
			if (dice === 1) {
				this.add('-message', "Cannot beat this combination");
				this.damage(source.maxhp / 2, source, source, 'phanchucore');
				return false;
			}
			this.useMove('volttackle', source);
			this.useMove('nuzzle', source);
		},
		secondary: false,
		target: "self",
		type: "Electric",
	},
	// Shadman
	fiveknuckleshuffle: {
		accuracy: 100,
		basePower: 20, 
		category: "Physical",
		id: "fiveknuckleshuffle",
		isNonstandard: true,
		isViable: true,
		name: "Five Knuckle Shuffle",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {boosts: {accuracy: 1}},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Minimize", target);
			this.add('-message', 'You can\'t see me');
		},
		secondary: false,
		target: "normal",
		type: "Fighting",
	},
	// Uzair
	heelturn: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		id: "heelturn",
		isNonstandard: true,
		isViable: true,
		name: "Heel Turn",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfSwitch: true,
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Volt Switch", target);
			this.add('-message', 'Watch my new upload!');
		},
		secondary: {
			chance: 100,
			status: 'tox',
		},
		target: "normal",		
		type: "Dark",
	},
	// Seyan
	supersaiyan: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "supersaiyan",
		isNonstandard: true,
		isViable: true,
		name: "Super Saiyan",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			def: 2,
			atk: 1,
		},
		secondary: false,
		target: "self",
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bulk Up", target);
			this.add('-message', 'Not even my final form!');
		},
		type: "Fighting",
	},
	// Nazib
	manaphy4eva: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "manaphy4eva",
		name: "MANAPHY4EVA",
		isNonstandard: true,
		isViable: true,
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [2, 10],
		flags: {mirror: 1, protect: 1},
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Rain Dance', target);
		},
		onAfterMoveSecondarySelf: function () {
			this.setWeather('raindance');
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	// Swagata
	blazikenboost: {
		accuracy: true,
		basePower: 0,
		id: "blazikenboost",
		name: "Blaziken Boost",
		isNonstandard: true,
		isViable: true,
		pp: 5,
		priority: 0,
		flags: {snatch: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Acupressure", source);
			this.add('-anim', source, "Flare Blitz", source);
		},
		onHit: function (target, source) {
			source.addVolatile('focusenergy', source);
		},
		boosts: {
			spe: 1,
		},
		target: "self",
		type: "Fire",
	},
	// Modified Moves \\
	// Purple Pills is immune to taunt
	"taunt": {
		inherit: true,
		volatileStatus: 'taunt',
		effect: {
			duration: 3,
			onStart: function (target) {
				if (target.activeTurns && !this.willMove(target)) {
					this.effectData.duration++;
				}
				this.add('-start', target, 'move: Taunt');
			},
			onResidualOrder: 12,
			onEnd: function (target) {
				this.add('-end', target, 'move: Taunt');
			},
			onDisableMove: function (pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.getMove(moveSlot.id).category === 'Status' && this.getMove(moveSlot.id).id !== 'purplepills') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove: function (attacker, defender, move) {
				if (!move.isZ && move.category === 'Status' && move.id !== 'purplepills') {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
			},
		},
	},
};

exports.BattleMovedex = BattleMovedex;
