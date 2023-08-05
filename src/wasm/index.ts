import init from '../../pkg/wasm_game_of_life_bg.wasm?init';

let memory;

init({})
  .then((instance) => {
    console.log(instance);
    memory = instance.exports.memory;
  })
  .catch((e) => console.log(`error: ${e}`));

export { memory };
