console.log('app started');
var socket = io.connect();

socket.on('init', function() {
  init();
});

const critMult = 1.2

var canvas, stage;
var stats;

var player;
var enemy;

function init() {
  console.log('init begin');
  //canvas = document.getElementById('main');
  //stage = new createjs.Stage(canvas);

  stats = document.getElementsByClassName('stat');

  player = {};
  player.level = 2;
  player.health = 12;
  player.strength = 5;
  player.armor = 6;
  player.speed = 8;
  player.luck = .15;

  enemy = {};
  enemy.elements = document.getElementsByClassName('enemy');

  enemy.level = 1;
  enemy.health = 8;
  enemy.strength = 6;
  enemy.armor = 4;
  enemy.speed = 7;
  player.luck = .10;

  update();
}

/**
 * Update everything
 */
function update() {
  updateStats();
  updateEnemy();
}

/**
 * Updates the stats of the player on html page
 */
function updateStats() {
  stats[0].innerHTML = 'Level: '+player.level;
  stats[1].innerHTML = 'Health: '+player.health;
  stats[2].innerHTML = 'Strength: '+player.strength;
  stats[3].innerHTML = 'Armor: '+player.armor;
  stats[4].innerHTML = 'Speed: '+player.speed;
}

/**
 * Updates the stats of the enemy on html page
 */
function updateEnemy() {
  enemy.elements[0].innerHTML = 'Level: '+enemy.level;
  enemy.elements[1].innerHTML = 'Health: '+enemy.health;
  enemy.elements[2].innerHTML = 'Strength: '+enemy.strength;
  enemy.elements[3].innerHTML = 'Armor: '+enemy.armor;
  enemy.elements[4].innerHTML = 'Speed: '+enemy.speed;
}

/**
 *
 *
 */
function attack() {
  if (hits(player.speed, enemy.speed)) {
    dmg = Math.floor(calcDamage(player.strength, player.luck, enemy.armor));
    console.log("hit for "+dmg);
    enemy.health -= dmg;
    update();
  } else {
    console.log("miss");
  }
}

/**
 * Calculates with random if hits
 * @param {Number} speed of attacker
 * @param {Number} evasiveness (speed) of defender
 * @returns {Boolean} hits
 */
function hits(speed, evasive) {
  return (rand(0, speed+evasive/2) <= speed);
}

/**
 * Calculates with random damage done during attack
 * @param {Number} attack (strength) of attacker
 * @param {Number} luck of attacker
 * @param {Number} defense (armor) of defender
 * @returns {Number} damage
 */
function calcDamage(attack, luck, defense) {
  if (rand(0, 1) < luck) crit = true;
  if (defense < attack) {
    dmg = rand(rand(attack-defense, attack), attack);
    return (crit ? dmg*critMult:dmg);
  }
  else if (defense == attack) {
    dmg = rand(attack-defense/3, attack-defense/4);
    return (crit ? dmg*critMult:dmg);
  }
  else {
    if (pierce(attack, luck, defense)) {
      dmg = rend();//finish....................
      return (crit ? dmg*critMult:dmg);
    }
    else return 0;
  }
}

/**
 * Calculates with random attack if pierces through armor
 * @param {Number} attack (strength) of attacker
 * @param {Number} luck of attacker
 * @param {Number} defense (armor) of defender
 * @returns {Boolean} pierces
 */
function pierce(attack, luck, defense) {
  return false;//finish.......................
}
