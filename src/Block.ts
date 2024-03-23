import { sha256 } from "crypto-js";

class Block {
    public index: number;
    public previousHash: string;
    public timestamp: number;
    public data: string;
    public nonce: number;
    public hash: string;

    constructor(index: number, timestamp: number, data: string, nonce: number, previousHash: string = "") {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = nonce;
        this.hash = this.calculateHash();
    }

    private calculateHash(): string {
        return sha256(this.index.toString() + this.previousHash + this.timestamp.toString() + this.data + this.nonce.toString());
    }

    mineBlock(difficulty: number): void {
        this.nonce = 0;
        const aim = "0".repeat(difficulty);
        while (this.hash.substring(0, difficulty) !== aim) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.index + " " + this.hash);
    }
}

export default Block;