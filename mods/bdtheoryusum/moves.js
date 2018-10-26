'use strict';

exports.BattleMovedex = {
	"tropkick": {
		num: 688,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Attack by 1 stage.",
		shortDesc: "100% chance to lower the target's Attack by 1.",
		id: "tropkick",
		name: "Trop Kick",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Grass",
		zMovePower: 140,
		contestType: "Cute",
	},
	"pulverizingpancake": {
		num: 701,
		accuracy: true,
		basePower: 190,
		category: "Physical",
		desc: "Bypasses Protection. Causes the target to have its positive evasiveness stat stage ignored while it is active. Normal- and Fighting-type attacks can hit the target if it is a Ghost type. The effect ends when the target is no longer active. Fails if the target is already affected, or affected by Miracle Eye or Odor Sleuth.",
		shortDesc: "Breaks Protect. Negates type immunity",
		id: "pulverizingpancake",
		name: "Pulverizing Pancake",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		breaksProtect: true,
		onEffectiveness: function (typeMod, type, move) {
			if (move.type !== 'Normal') return;
			let target = this.activeTarget;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Ghost type and immune to Normal
			if (!target.runImmunity('Normal')) {
				if (target.hasType('Ghost')) return 0;
			}
		},
		volatileStatus: 'foresight',
		ignoreImmunity: {'Normal': true},
		ignoreAbility: true,
		isZ: "snorliumz",
		secondary: {
			chance: 50,
			status: 'par',
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	"stokedsparksurfer": {
		num: 700,
		accuracy: true,
		basePower: 185,
		category: "Special",
		desc: "Has a 100% chance to paralyze the target. Summons Electric Terrain",
		shortDesc: "100% chance to paralyze the target. Summons Electric Terrain",
		id: "stokedsparksurfer",
		name: "Stoked Sparksurfer",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "aloraichiumz",
		secondary: {
			chance: 100,
			status: 'par',	
			chance: 100,
			self: {
				onHit: function () {
					this.setTerrain('electricterrain');
				},
			},			
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	"sparklingaria": {
		num: 664,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Heals the team of any status afflictions",
		shortDesc: "Deals damage. Heals the team",
		id: "sparklingaria",
		name: "Sparkling Aria",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onHit: function (pokemon, source) {
			this.add('-activate', source, 'move: Heal Bell');
			let side = pokemon.side.foe;
			for (let i = 0; i < side.pokemon.length; i++) {
				if (side.pokemon[i].hasAbility('soundproof')) continue;
				side.pokemon[i].cureStatus();
			}
		},
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			}
		},
		target: "allAdjacent",
		type: "Water",
		zMovePower: 175,
		contestType: "Tough",
	},
	"shelltrap": {
		num: 704,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Prevents the target from switching out.",
		id: "shelltrap",
		isViable: true,
		name: "Shell Trap",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		secondary: {
			chance: 100,
			onHit: function (target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},			
                        self: {
                               heal: [1.5, 10],
                        },			
		},
		target: "normal",
		type: "Fire",
		zMovePower: 170,
		contestType: "Tough",
	},
	"strengthsap": {
		num: 668,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's Attack by 1 stage. The user restores its HP equal to the target's Attack stat calculated with its stat stage before this move was used. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down. Fails if the target's Attack stat stage is -6.",
		shortDesc: "User heals HP=target's Atk stat. Lowers Atk by 1.",
		id: "strengthsap",
		isViable: true,
		name: "Strength Sap",
		pp: 10,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1, heal: 1},
		onHit: function (target, source) {
			if (target.boosts.atk === -6) return false;
			let atk = target.getStat('atk', false, true);
			this.boost({atk:-1}, target, source, null, null, true);
			this.heal(atk, source, target);
		},
		secondary: false,
		target: "normal",
		type: "Grass",
		zMoveBoost: {def: 1},
		contestType: "Cute",
	},
	"drainingkiss": {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'comfey') return this.chainModify(1.5);
		},
	},
	"relicsong": {
		num: 547,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "Has a 10% chance to cause the target to fall asleep. If this move is successful on at least one target and the user is a Meloetta, it changes to Pirouette Forme if it is currently in Aria Forme, or changes to Aria Forme if it is currently in Pirouette Forme. This forme change does not happen if the Meloetta has the Ability Sheer Force. The Pirouette Forme reverts to Aria Forme when Meloetta is not active.",
		shortDesc: "10% chance to sleep foe(s). Meloetta transforms.",
		id: "relicsong",
		isViable: true,
		name: "Relic Song",
		pp: 10,
		priority: 3,
		flags: {contact: 1, protect: 1, mirror: 1, sound: 1, authentic: 1},
		onTry: function (pokemon, target) {
			if (pokemon.activeTurns > 1) {
				this.add('-fail', pokemon);
				this.add('-hint', "Relic Song now only works on your first turn out. Nice mod huh?");
				return null;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		onHit: function (target, pokemon) {
			if (pokemon.baseTemplate.baseSpecies === 'Meloetta' && !pokemon.transformed) {
				pokemon.addVolatile('relicsong');
			}
		},
		effect: {
			duration: 1,
			onAfterMoveSecondarySelf: function (pokemon, target, move) {
				if (pokemon.formeChange(pokemon.template.speciesid === 'meloettapirouette' ? 'Meloetta' : 'Meloetta-Pirouette')) {
					this.add('-formechange', pokemon, pokemon.illusion ? pokemon.illusion.template.species : pokemon.template.species, '[msg]');
				}
				pokemon.removeVolatile('relicsong');
			},
		},
		target: "allAdjacentFoes",
		type: "Normal",
		zMovePower: 140,
		contestType: "Beautiful",
	},
	"topsyturvy": {
		num: 576,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The target's positive stat stages become negative and vice versa. Fails if all of the target's stat stages are 0.",
		shortDesc: "Inverts the target's stat stages.",
		id: "topsyturvy",
		name: "Topsy-Turvy",
		pp: 20,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		onHit: function (target) {
			let success = false;
			for (let i in target.boosts) {
				if (target.boosts[i] === 0) continue;
				target.boosts[i] = -target.boosts[i];
				success = true;
			}
			if (!success) return false;
			this.add('-invertboost', target, '[from] move: Topsy-Turvy');
		},
		secondary: false,
		target: "normal",
		type: "Dark",
		zMoveBoost: {atk: 1},
		contestType: "Clever",
	},
	"revelationdance": {
		num: 686,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "This move's type depends on the user's primary type.",
		shortDesc: "Type varies based on the user's primary type.",
		id: "revelationdance",
		isViable: true,
		name: "Revelation Dance",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: false,
		target: "normal",
		type: "Normal",
		zMovePower: 175,
		contestType: "Beautiful",
	},
	"trickortreat": {
		num: 567,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Causes the Ghost type to be added to the target, effectively making it have two or three types. Fails if the target is already a Ghost type. If Forest's Curse adds a type to the target, it replaces the type added by this move and vice versa.",
		shortDesc: "Adds Ghost to the target's type(s).",
		id: "trickortreat",
		name: "Trick-or-Treat",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		onHit: function (target) {
			if (target.hasType('Ghost')) return false;
			if (!target.addType('Ghost')) return false;
			this.add('-start', target, 'typeadd', 'Ghost', '[from] move: Trick-or-Treat');

			if (target.side.active.length === 2 && target.position === 1) {
				// Curse Glitch
				const decision = this.willMove(target);
				if (decision && decision.move.id === 'curse') {
					decision.targetLoc = -1;
				}
			}
		},
		secondary: false,
		target: "normal",
		type: "Ghost",
		zMoveBoost: {atk: 2, def: 2, spa: 2, spd: 2, spe: 2},
		contestType: "Cute",
	},
};
