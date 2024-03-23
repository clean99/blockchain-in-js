import sha256 from "crypto-js/sha256";

export class Block {
    public index: number;
    public previousHash: string;
    public timestamp: Date;
    public data: string;
    public nonce: number;
    public hash: string;

    constructor(index: number, timestamp: Date, data: string, nonce: number, previousHash: string = "") {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = nonce;
        this.hash = this.calculateHash();
    }

    calculateHash(): string {
        const hash = sha256(this.index.toString() + this.previousHash + this.timestamp.toString() + this.data + this.nonce.toString());
        // console.log('Hash: ' + hash.toString());
        return hash.toString();
    }

    mineBlock(difficulty: number): void {
        const aim = "0".repeat(difficulty);
        while (this.hash.substring(0, difficulty) !== aim) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.index + " " + this.hash);
    }
}