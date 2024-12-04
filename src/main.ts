import { Command } from "commander";
import fs from "fs";
import path from "path";
import figlet from "figlet";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify";

import Expense from "./expense.js";
import TransactionsParser from "./transactionsParser";
import ChaseTransactionsParser from "./chaseTransactionsParser";
import TargetTransactionsParser from "./targetTransactionsParser.js";

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
 * Extracts a list of normalized expenses from a CSV file using custom parsers
 * @param inputFile
 * @param sourceType
 */
function extractExpensesFromList(inputFile: string, filterByMonth: string, sourceType: string): Expense[] {
    // Instantiate our transaction parser and extract our expenses
    let transactionsParser: TransactionsParser;
    let listToReturn: Expense[];

    // Fetch the contents of the input file
    const fileContent = fs.readFileSync(inputFile);

    // Parse our input file to get our normalized list of expenses
    const listOfTransactions = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
    });

    switch(sourceType) {
        case "freedom": {
            transactionsParser = new ChaseTransactionsParser(listOfTransactions, filterByMonth);
            listToReturn = transactionsParser.extractExpenses();
            break;
        }
        case "target": {
            transactionsParser = new TargetTransactionsParser(listOfTransactions, filterByMonth);
            listToReturn = transactionsParser.extractExpenses();
            break;
        }
        default: {
            throw new Error("Invalid source type specified: " + sourceType);
        }
    }

    return listToReturn;
}

/**
 * Execution in our tool all begins here
 */
function main() {
    // Define CLI options
    const program = new Command();
    program
    .version("1.0.0")
    .description("A CLI tool for categorizing expenses from different credit card platforms")
    .option("-f, --freedom <value>", "Specifies the Chase Freedom input CSV file to parse", false)
    .option("-t --target <value>", "Specifies the Target input CSV file to parse", false)
    .option("-m, --month <mm>", "Limit expenses to those associated with the specified month (ex: 10 for October)")
    .option("-o, --outputFile <value>", "Output file to save our normalized expenses", "output.csv")
    .parse(process.argv);

    // Fetch CLI options
    const options = program.opts();

    // Ensure we have at least one input file to parse
    if ((!options.freedom) && (!options.target)) {
        console.error("ERROR: Must specify an input file\n");
        program.help();
    }

    // Instantiate our list of normalized expenses
    let normalizedExpenses: Expense[] = [];

    // Lets handle transactions from Chase Freedom
    if (options.freedom) {
        // Append expenses to our normalizedExpenses array
        normalizedExpenses.push(...extractExpensesFromList(options.freedom, options.month, "freedom"));
    }

    // Lets handle transactions from Target
    if (options.target) {
        // Append expenses to our normalizedExpenses array
        normalizedExpenses.push(...extractExpensesFromList(options.target, options.month, "target"));
    }

    // Write list of expenses to output file
    writeExpenses(normalizedExpenses, options.outputFile);

    // Summarize everything
    console.log(figlet.textSync("Success!"));
    console.log("Number of expenses outputted: ", normalizedExpenses.length);
    console.log("Output location: ", options.outputFile);
}

// Now execute the entry point
main();