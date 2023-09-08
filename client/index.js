const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  if (process.argv.length < 3) {
    console.error("pass name by CLI parameters!");
    process.exit(1);
  }
  const name = process.argv.slice(2).join(' ');
  const index = niceList.findIndex(n => n === name);

  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(index);
  const root = merkleTree.getRoot();
  console.log("[MERKLE_ROOT]", root);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name: name,
    proof: JSON.stringify(proof)
  });

  console.log({ gift });
}

main();