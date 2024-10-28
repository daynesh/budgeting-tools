import { Command } from "commander";
import fs from "fs";
import path from "path";
import figlet from "figlet";
import { parse } from "csv-parse";

// Display a figlet
console.log(figlet.textSync("Anything I want!"));

// Define CLI options
const program = new Command();
program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .requiredOption("-i, --inputFile [value]", "Input CSV file to parse")
  .parse(process.argv);

const options = program.opts();

type Transaction = {
    transactionDate: string;
    postDate: string;
    description: string;
    category: string;
    type: string;
    amountAsString: string;
    amountAsUsd: number;
    memo: string;
};

// 1. Parse CSV file listing all transactions
if (options.inputFile) {
    const fileContent = fs.readFileSync(options.inputFile);

    // Define headers for input file
    const headers = ['Transaction Date', 'Post Date', 'Description', 'Category', 'Type', 'Amount', 'Memo'];

    // Initialize the parser
    const parser = parse(fileContent, {
        delimiter: ',',
        columns: headers,
    });

    // Use the readable stream api to consume transactions
    const transactions: Transaction[] = [];
    parser.on("readable", function() {
        let transaction;
        while ((transaction = parser.read()) !== null) {
            console.log("Transaction: ", transaction);
            transactions.push(transaction);
        }

    });

    // Catch any error
    parser.on("error", function(err) {
        console.error(err.message);
    });
}

// 2. Create output CSV file to store transformation
// 3. Go through input file one line at a time:
//      a) Remove all transactions that were credits
//      b) Identify if transaction requires a more descriptive name
//      c) Map Chase transaction category into our own category
//      d) Write line into output CSV file
