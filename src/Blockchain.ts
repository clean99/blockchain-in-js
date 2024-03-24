import { Block } from "./Block";
import fs from "fs";

export class Blockchain {
    public chain: Block[];
    difficulty: number;
    dataPath: string;
    constructor(difficulty: number = 2, dataPath: string = "./blockchain.json") {
        this.difficulty = difficulty;
        this.chain = [this.createGenesisBlock()];
        this.dataPath = dataPath;
        this.load();
        process.on('exit', () => {
            this.save();
        });
    }

    private createGenesisBlock(): Block {
        return new Block(0, new Date(), "Genesis Block", 0);
    }

    save(): void {
        console.log("Saving blockchain to file...");
        if(!this.isValidChain()) {
            console.error("Blockchain is not valid. Not saving.");
            return;
        }
        fs.writeFileSync(this.dataPath, JSON.stringify(this.chain));
        console.log("Blockchain saved to file.");
    }

    load(): void {
        console.log("Loading blockchain from file...");
        if(!fs.existsSync(this.dataPath)) {
            console.error("File not found. Not loading.");
            return;
        }
        const data = fs.readFileSync(this.dataPath);
        this.chain = JSON.parse(data.toString()).map((block: any) => new Block(block.index, block.timestamp, block.data, block.nonce, block.previousHash));
        if(!this.isValidChain()) {
            console.error("Blockchain is not valid. Not loading.");
            this.chain = [this.createGenesisBlock()];
            return;
        }
        console.log("Blockchain loaded from file.");
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    getHeight(): number {
        return this.chain.length;
    }

    addBlock(data: string): void {
        const newBlock = new Block(this.getHeight(), new Date(), data, 0, this.getLatestBlock().hash);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isValidChain(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            if (this.chain[i].previousHash !== this.chain[i - 1].hash) {
                return false;
            }

            if (this.chain[i].hash !== this.chain[i].calculateHash()) {
                return false;
            }
        }
        return true;
    }
}
