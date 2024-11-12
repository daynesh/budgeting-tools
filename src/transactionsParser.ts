import Expense from "./expense";

export default abstract class TransactionsParser {
    listOfTransactions: [];
    filterByMonth: string;

    constructor(transactionsList: [], filterByMonth: string) {
        this.listOfTransactions = transactionsList;
        this.filterByMonth = filterByMonth;
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
    abstract extractExpenses(): Expense[];

    /**
     * Logic for transforming an individual expense
     * @param expense
     */
    abstract transformToExpense(expense: Expense): Expense | null;

    /**
     * Get the number of transactions processed
     * @returns 
     */
    getNumOfTransactions(): number {
        return this.listOfTransactions.length;
    }
}