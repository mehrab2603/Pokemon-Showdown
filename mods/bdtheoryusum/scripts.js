'use strict';

exports.BattleScripts = {
   init: function () {
     for (let i in this.data.Pokedex) {
       let learnset = (this.data.Learnsets[i]) ? this.data.Learnsets[i].learnset : false;
       let pokemon = this.data.Pokedex[i];
       if (learnset) {
         //All ground types have access to Fissure.
         if (pokemon.types.indexOf('Ground') > -1) {
           if (learnset.fissure) {
             this.modData('Learnsets', i).learnset.fissure = learnset.fissure.push('6T');
           } else {
             this.modData('Learnsets', i).learnset.fissure = ['6T'];
           }
         }
       }
     }

     //New Moves
     this.modData('Learnsets', 'kommoo').learnset.dragonhammer = ['7T'];
     this.modData('Learnsets', 'kommoo').learnset.closecombat = ['7T'];
     this.modData('Learnsets', 'incineroar').learnset.suckerpunch = ['7T'];
     this.modData('Learnsets', 'golemalola').learnset.firepunch = ['7T'];
     this.modData('Learnsets', 'silvally').learnset.recover = ['7T'];
     this.modData('Learnsets', 'palossand').learnset.stealthrock = ['7T'];
     this.modData('Learnsets', 'primarina').learnset.wish = ['7T'];     
     this.modData('Learnsets', 'golurk').learnset.shiftgear = ['7T'];
     this.modData('Learnsets', 'mismagius').learnset.moonblast = ['7T'];
     this.modData('Learnsets', 'honchkrow').learnset.swordsdance = ['7T'];
     this.modData('Learnsets', 'bouffalant').learnset.headsmash = ['7T'];
     this.modData('Learnsets', 'yanmega').learnset.dragonpulse = ['7T'];
     this.modData('Learnsets', 'luxray').learnset.knockoff = ['7T'];     
     this.modData('Learnsets', 'torterra').learnset.thousandwaves = ['7T'];
     this.modData('Learnsets', 'roserade').learnset.earthpower = ['7T'];
     this.modData('Learnsets', 'machamp').learnset.drainpunch = ['7T'];     
     
    },

   //Allow custom mega-evolutions without anything in terms of sprites breaking:
   runMegaEvo: function (pokemon) {
     let template = this.getTemplate(pokemon.canMegaEvo);
     let side = pokemon.side;

     // Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
     let foeActive = side.foe.active;
     for (let i = 0; i < foeActive.length; i++) {
       if (foeActive[i].volatiles['skydrop'] && foeActive[i].volatiles['skydrop'].source === pokemon) {
         return false;
       }
     }
     
     //Prevent sprites from screwing with our stuff.
     let forbid = {'Machamp-Mega':'Bluk Berry', 'Torterra-Mega':'Qualot Berry', 'Roserade-Mega':'Grepa Berry', 'Luxray-Mega':'Kelpsy Berry', 'Yanmega-Mega':'Hondew Berry', 'Bouffalant-Mega':'Pomeg Berry', 'Honchkrow-Mega':'Dusk Ball', 'Mismagius-Mega':'Moon Ball', 'Golurk-Mega':'Heavy Ball'};
     if (template.species in forbid) {
       //Case 1: Sprites don't exist
       template = Object.assign({}, template); //Prevent metagame crosstalk.
       template.spriteid = toId(template.baseSpecies);
       template.actualSpecies = template.species;
       template.species = template.species.split('-')[0];
       template.requiredItem = forbid[template.species];
     } else if (template.species === 'Venusaur-Mega-Y') {
       //Case 2: Sprites do exist, but the mega changed.
       template = Object.assign({}, template);
       template.spriteid = 'venusaur-mega';
       template.species = 'Venusaur-Mega';
       template.actualSpecies = 'Venusaur-Mega-Y'; //yes this is venusaur-mega-y
       template.requiredItem = 'Venusaurite Y';
     } else if (template.species === 'Blastoise-Mega-X') {
       //Case 2: Sprites do exist, but the mega changed.
       template = Object.assign({}, template);
       template.spriteid = 'blastoise-mega';
       template.species = 'Blastoise-Mega';
       template.actualSpecies = 'Blastoise-Mega-X';
       template.requiredItem = 'Blastoisinite X';
     }
     pokemon.formeChange(template);
     pokemon.baseTemplate = template; // mega evolution is permanent
     pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
     this.add('detailschange', pokemon, pokemon.details);
     this.add('-mega', pokemon, template.baseSpecies, template.requiredItem);
     pokemon.setAbility(template.abilities['0']);
     pokemon.baseAbility = pokemon.ability;
     let changed = {'Blastoise':true, 'Raichu':true, 'Aerodactyl':true, 'Feraligatr':true};
     if (template.actualSpecies in forbid || template.species === 'Venusaur-Mega' || template.baseSpecies in changed) {
       let types = template.types;
       let bTypes = (types.length === 1 || types[1] === 'caw') ? types[0] : types.join('/');
       this.add('-start', pokemon, 'typechange', bTypes, '[silent]');
     }

     // Limit one mega evolution
     for (let i = 0; i < side.pokemon.length; i++) {
       side.pokemon[i].canMegaEvo = false;
     }
     return true;
   },
   randomTheoryNewTeam: function () {
       let pokemon = [];
 
        let excludedTiers = {'NFE':1, 'LC Uber':1, 'LC':1, 'Unreleased':1, 'Illegal':1, 'Uber':1, 'PU':1};
        let allowedNFE = {'Chansey':1, 'Doublade':1, 'Gligar':1, 'Porygon2':1, 'Scyther':1, 'Togetic':1};
 
        // For Monotype
        let isMonotype = this.format === 'gen7monotyperandombattle';
        let typePool = Object.keys(this.data.TypeChart);
        let type = typePool[this.random(typePool.length)];
 
        //For Theorymon new
        let theoryMonList = ['Golisopod', 'Palossand', 'Necrozma', 'Incineroar', 'Primarina', 'Wishiwashi', 'Salazzle', 'Tsareena', 'Silvally', 'Turtonator', 'Kommo-o', 'Exeggutor-Alola', 'Golem-Alola', 'Raichu-Alola'];
        let theorymonPool = [];
 
        let pokemonPool = [];
        for (let id in this.data.FormatsData) {
            let template = this.getTemplate(id);
            if (isMonotype) {
                let types = template.types;
                if (template.battleOnly) types = this.getTemplate(template.baseSpecies).types;
                if (types.indexOf(type) < 0) continue;
            }
            if (template.gen <= this.gen && !excludedTiers[template.tier] && !template.isMega && !template.isPrimal && !template.isNonstandard && template.randomBattleMoves) {
                pokemonPool.push(id);
                if(theoryMonList.indexOf(template.species) >= 0) {
                    theorymonPool.push(id);
                }
            }
        }
 
        // PotD stuff
        let potd;
        if (Config.potd && 'Rule:potd' in this.getBanlistTable(this.getFormat())) {
            potd = this.getTemplate(Config.potd);
        }
 
        let typeCount = {};
        let typeComboCount = {};
        let baseFormes = {};
        let uberCount = 0;
        let puCount = 0;
        let teamDetails = {};
 
        while (pokemonPool.length && pokemon.length < 6) {
            let id;
            if(pokemon.length > 1 || theorymonPool.length == 0) id = this.sampleNoReplace(pokemonPool);
            else id =  this.sampleNoReplace(theorymonPool);
            let template = this.getTemplate(id);
            if (!template.exists) continue;
 
            // Limit to one of each species (Species Clause)
            if (baseFormes[template.baseSpecies]) continue;
 
            // Only certain NFE Pokemon are allowed
            if (template.evos.length && !allowedNFE[template.species]) continue;
 
            // Adjust rate for species with multiple formes
            switch (template.baseSpecies) {
            case 'Arceus': case 'Silvally':
                if (this.random(18) >= 1) continue;
                break;
            case 'Genesect':
                if (this.random(5) >= 1) continue;
                break;
            case 'Castform': case 'Gourgeist': case 'Oricorio':
                if (this.random(4) >= 1) continue;
                break;
            case 'Basculin': case 'Cherrim': case 'Greninja': case 'Hoopa': case 'Meloetta': case 'Meowstic':
                if (this.random(2) >= 1) continue;
                break;
            }
 
            if (potd && potd.exists) {
                // The Pokemon of the Day belongs in slot 2
                if (pokemon.length === 1) {
                    template = potd;
                    if (template.species === 'Magikarp') {
                        template.randomBattleMoves = ['bounce', 'flail', 'splash', 'magikarpsrevenge'];
                    } else if (template.species === 'Delibird') {
                        template.randomBattleMoves = ['present', 'bestow'];
                    }
                } else if (template.species === potd.species) {
                    continue; // No thanks, I've already got one
                }
            }
 
            let types = template.types;
 
            if (!isMonotype) {
                // Limit 2 of any type
                let skip = false;
                for (let t = 0; t < types.length; t++) {
                    if (typeCount[types[t]] > 1 && this.random(5) >= 1) {
                        skip = true;
                        break;
                    }
                }
                if (skip) continue;
            }
 
            let set = this[this.gameType === 'singles' ? 'randomSet' : 'randomDoublesSet'](template, pokemon.length, teamDetails);
 
            // Illusion shouldn't be the last Pokemon of the team
            if (set.ability === 'Illusion' && pokemon.length > 4) continue;
 
            // Pokemon shouldn't have Physical and Special setup on the same set
            let incompatibleMoves = ['bellydrum', 'swordsdance', 'calmmind', 'nastyplot'];
            let intersectMoves = set.moves.filter(move => incompatibleMoves.includes(move));
            if (intersectMoves.length > 1) continue;
 
            // Limit 1 of any type combination, 2 in monotype
            let typeCombo = types.slice().sort().join();
            if (set.ability === 'Drought' || set.ability === 'Drizzle' || set.ability === 'Sand Stream') {
                // Drought, Drizzle and Sand Stream don't count towards the type combo limit
                typeCombo = set.ability;
                if (typeCombo in typeComboCount) continue;
            } else {
                if (typeComboCount[typeCombo] >= (isMonotype ? 2 : 1)) continue;
            }
            
            if(template.species == 'Incineroar') {
                set.moves = ['uturn', 'flareblitz', 'suckerpunch', 'earthquake'];
                set.item = 'Life Orb';
                set.evs = {hp: 0, atk: 252, def: 4, spa: 0, spd: 0, spe: 252};
            }
            if(template.species == 'Primarina') {
                set.moves = ['moonblast', 'scald', 'sparklingaria', 'wish'];
                set.item = 'Leftovers';
                set.evs = {hp: 252, atk: 0, def: 128, spa: 128, spd: 0, spe: 0};
            }
            if(template.species == 'Palossand') {
                set.moves = ['stealthrock', 'toxic', 'earthpower', 'shoreup'];
                set.item = 'Leftovers';
                set.evs = {hp: 252, atk: 0, def: 124, spa: 0, spd: 132, spe: 0};
            }
            if(template.species == 'Kommo-o') {
                set.moves = ['dragondance', 'dragonhammer', 'closecombat', 'poisonjab'];
                set.item = teamDetails['zMove'] == 1 ? 'Lum Berry' : 'Poisonium Z';
                set.evs = {hp: 0, atk: 252, def: 4, spa: 0, spd: 0, spe: 252};
            }
            if(template.species == 'Raichu-Alola') {
                set.moves = ['thunderbolt', 'psychic', 'surf', 'nastyplot'];
                set.item = teamDetails['zMove'] == 1 ? 'Life Orb' : 'Aloraichium Z';
                set.evs = {hp: 0, atk: 0, def: 4, spa: 252, spd: 0, spe: 252};
            }

            // Okay, the set passes, add it to our team
            pokemon.push(set);
 
            // Now that our Pokemon has passed all checks, we can increment our counters
            baseFormes[template.baseSpecies] = 1;
 
            // Increment type counters
            for (let t = 0; t < types.length; t++) {
                if (types[t] in typeCount) {
                    typeCount[types[t]]++;
                } else {
                    typeCount[types[t]] = 1;
                }
            }
            if (typeCombo in typeComboCount) {
                typeComboCount[typeCombo]++;
            } else {
                typeComboCount[typeCombo] = 1;
            }
 
            // Team has Mega/weather/hazards
            let item = this.getItem(set.item);
            if (item.megaStone) teamDetails['megaStone'] = 1;
            if (item.zMove) teamDetails['zMove'] = 1;
            if (set.ability === 'Snow Warning') teamDetails['hail'] = 1;
            if (set.ability === 'Drizzle' || set.moves.includes('raindance')) teamDetails['rain'] = 1;
            if (set.ability === 'Sand Stream') teamDetails['sand'] = 1;
            if (set.moves.includes('stealthrock')) teamDetails['stealthRock'] = 1;
            if (set.moves.includes('toxicspikes')) teamDetails['toxicSpikes'] = 1;
            if (set.moves.includes('defog') || set.moves.includes('rapidspin')) teamDetails['hazardClear'] = 1;
        }
       var i,j,x;
       for(i = pokemon.length; i; i--){
           j = Math.floor(Math.random() * i);
           x = pokemon[i-1];
           pokemon[i-1] = pokemon[j];
           pokemon[j] = x;
       }
       return pokemon;
   },
};
