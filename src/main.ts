import { Blockchain } from "./Blockchain";

const blockchain = new Blockchain();

blockchain.addBlock("Hello World");

console.log(blockchain.isValidChain());