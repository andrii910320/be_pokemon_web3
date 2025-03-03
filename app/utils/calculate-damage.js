export const calculateDamage = (pokemon) => {
  const { Attack, Defense, HP: Power } = pokemon.base;
  const level = 50;
  const random = Math.random();
  const damage =
    ((((2 * level) / 5 + 2) * Power * (Attack / Defense)) / 50 + 2) * random;
  return damage;
};
