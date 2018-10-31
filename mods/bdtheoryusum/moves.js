'use strict';

exports.BattleMovedex = {
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
	"drainingkiss": {
		inherit: true,
		onBasePower: function (power, user) {
			if (user.template.id === 'comfey') return this.chainModify(1.5);
		},
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
};
