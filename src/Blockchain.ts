import { Block } from "./Block";

export class Blockchain {
    public chain: Block[];
    difficulty: number;
    height: number;

    constructor(difficulty: number = 2) {
        this.difficulty = difficulty;
        this.height = 1;
        this.chain = [this.createGenesisBlock()];
    }

    private createGenesisBlock(): Block {
        return new Block(0, new Date(), "Genesis Block", 0);
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data: string): void {
        const newBlock = new Block(this.height, new Date(), data, 0, this.getLatestBlock().hash);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        this.height++;
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
