import Expense from "./expense.js";

export default class TransactionsParser {
    type: string;
    listOfTransactions: [];
    filterByMonth: string;

    constructor(inputSource: string, transactionsList: [], filterByMonth: string) {
        this.type = inputSource;
        this.listOfTransactions = transactionsList;
        this.filterByMonth = filterByMonth;
    }

    /**
     * Extract list of expenses from Chase transactions
     */
    protected extractFromChaseTransactions(): Expense[] {
        let listToReturn: Expense[] = [];
        
        this.listOfTransactions.forEach(transaction => {
            // Skip over transactions that are "credits" as we're only interested in tracking expenses
            var amountAsUsd = parseFloat(transaction['Amount']);
            if (amountAsUsd >= 0)
                return;

            // Skip transactions associated with other months
            if (this.filterByMonth) {
                let transactionDate: string = transaction['Transaction Date'];
                if (this.filterByMonth != transactionDate.split("/")[0])
                    return;
            }

            // Initialize the output transaction
            const expense = new Expense(
                transaction['Transaction Date'],
                transaction['Description'],
                transaction['Category'],
                transaction['Amount'],
                transaction['Memo']
            )

            // Append output to our array of transformed expenses
            listToReturn.push(expense.transform());
        });

        return listToReturn;
    }

        /**
     * Extract list of expenses from Chase transactions
     */
    protected extractFromTargetTransactions(): Expense[] {
        const listToReturn: Expense[] = [];
        
        this.listOfTransactions.forEach(transaction => {
            // TODO: Implement this logic!
        });

        return listToReturn;
    }

    /**
     * Extract a list of expenses based on the listOfTransactions
     * @returns An array of normalized expenses
     */
    extractExpenses(): Expense[] {
        let listOfExpenses: Expense[] = [];

        switch(this.type) {
            case "chase": {
                listOfExpenses = this.extractFromChaseTransactions();
                break;
            }
            case "target": {
                listOfExpenses = this.extractFromTargetTransactions();
                break;
            }
            default: {
                throw new Error("Invalid source type specified: " + this.type);
            }
        }

        return listOfExpenses;
    }

    /**
     * Get the number of transactions processed
     * @returns 
     */
    getNumOfTransactions(): number {
        return this.listOfTransactions.length;
    }
}