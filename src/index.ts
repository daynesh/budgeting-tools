import { Command } from "commander";
import fs from "fs";
import path from "path";
import figlet from "figlet";
import { parse } from "csv-parse";

import Expense from "./expense.js";

// Define CLI options
const program = new Command();
program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .requiredOption("-i, --inputFile [value]", "Input CSV file to parse")
  .parse(process.argv);

const options = program.opts();

type ChaseTransaction = {
    transactionDate: string;
    postDate: string;
    description: string;
    category: string;
    type: string;
    amount: string;
    memo: string;
};

// Parse CSV file listing all transactions
if (options.inputFile) {
    const fileContent = fs.readFileSync(options.inputFile);

    // Define headers for input file
    const inputHeaders = ['transactionDate', 'postDate', 'description', 'category', 'type', 'amount', 'memo'];

    // Initialize the parser
    const parser = parse(fileContent, {
        delimiter: ',',
        columns: inputHeaders,
    });

    // Initialize vars we will use
    const listOfExpenses: Expense[] = [];
    let lineNumber = 0;

    // Use the readable stream api to consume transactions
    parser.on("readable", function() {
        let inputTransaction: ChaseTransaction;
        while ((inputTransaction = parser.read()) !== null) {
            // Increment line number counter
            lineNumber += 1;

            console.log(`Transaction #${lineNumber}: `, inputTransaction);

            // Skip header line
            if (lineNumber == 1)
                continue;

            // Skip over transactions that are "credits" as we're only interested in tracking expenses
            var amountAsUsd = parseFloat(inputTransaction.amount);
            if (amountAsUsd >= 0)
                continue;

            // Initialize the output transaction
            const expense = new Expense(
                inputTransaction.transactionDate,
                inputTransaction.description,
                inputTransaction.category,
                inputTransaction.amount
            )

            // Append output to our array of transformed expenses
            listOfExpenses.push(expense.transform());
        }
    });

    // Catch any error
    parser.on("error", function(err) {
        console.error(err.message);
    });

    parser.on("end", function() {
        console.log("Here's our transformed list of expenses", listOfExpenses);

        console.log(figlet.textSync("Finished!"));
    });
}