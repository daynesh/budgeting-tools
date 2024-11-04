import { Command } from "commander";
import fs from "fs";
import path from "path";
import figlet from "figlet";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify";

import Expense from "./expense.js";
import TransactionsParser from "./transactionsParser.js";
import ChaseTransactionsParser from "./chaseTransactionsParser.js";

/**
 * Write the list of expenses to an output csv file
 * @param listOfExpenses 
 * @param filename 
 */
function writeExpenses(listOfExpenses: Expense[], filename: string) {
    // Initialize up our write stream & stringify object
    const writableStream = fs.createWriteStream(filename);
    const outputHeaders = ["date", "amount", "description", "category", "memo"];
    const stringifier = stringify({
        header: true,
        columns: outputHeaders
    });

    // Now write list of expenses into our output csv file
    listOfExpenses.forEach( (expense) => {
        stringifier.write(expense);
    });
    stringifier.pipe(writableStream);
}

/**
 * Execution in our tool all begins here
 */
function main() {
    // Define CLI options
    const program = new Command();
    program
    .version("1.0.0")
    .description("An example CLI for managing a directory")
    .requiredOption("-i, --inputFile <value>", "Input CSV file to parse")
    .option("-m, --month <mm>", "Limit expenses to those associated with the specified month (ex: 10 for October")
    .option("-s, --source <type>", "Specifies the source of the input csv file", "chase")
    .option("-o, --outputFile <value>", "Output file to save our normalized expenses", "output.csv")
    .parse(process.argv);

    // Fetch CLI options
    const options = program.opts();

    // Fetch the contents of the input file
    const fileContent = fs.readFileSync(options.inputFile);

    // Parse our input file to get our normalized list of expenses
    const listOfTransactions = parse(fileContent, {
        columns: true
    });

    // Instantiate our transaction parser and extract our expenses
    let transactionsParser: TransactionsParser;
    let normalizedExpenses: Expense[];
    switch(options.source) {
        case "chase": {
            transactionsParser = new ChaseTransactionsParser(listOfTransactions, options.month);
            normalizedExpenses = transactionsParser.extractExpenses();
            break;
        }
        // case "target": {
        //     transactionsParser = new TargetTransactionsParser(listOfTransactions, options.month);
        //     normalizedExpenses = transactionsParser.extractExpenses();
        //     break;
        // }
        default: {
            throw new Error("Invalid source type specified: " + options.source);
        }
    }

    // Write list of expenses to output file
    writeExpenses(normalizedExpenses, options.outputFile);

    // Summarize everything
    console.log(figlet.textSync("Success!"));
    console.log("Number of transactions processed: ", transactionsParser.getNumOfTransactions());
    console.log("Number of expenses outputted: ", normalizedExpenses.length);
    console.log("Output location: ", options.outputFile);
}

// Now execute the entry point
main();