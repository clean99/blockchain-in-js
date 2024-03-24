import { Blockchain } from "./Blockchain";

const blockchain = new Blockchain();

for (let i = 0; i < 10; i++) {
    blockchain.addBlock("Hello World " + i);
}
console.log(blockchain.isValidChain());