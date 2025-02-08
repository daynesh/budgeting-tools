import TransactionsParser from "./transactionsParser";
import Expense from "./expense";

export default class TargetTransactionsParser extends TransactionsParser {

    constructor(transactionsList: [], filterByMonth: string) {
        super(transactionsList, filterByMonth);
    }

    /**
     * Extract a list of expenses based on the listOfTransactions
     * @returns An array of normalized expenses
     */
    extractExpenses(): Expense[] {
        let listOfExpenses: Expense[] = [];

        this.listOfTransactions.forEach(transaction => {
            let expense = this.transformToExpense(transaction);

            // Skip this transaction if there is no transformed expense
            if (expense == null)
                return;

            // Append output to our array of transformed expenses
            listOfExpenses.push(expense);
        });

        return listOfExpenses;
    }

    /**
     * Transform an individual Chase transaction into a normalized expense
     * @param 
     * @returns an instantiated Expense or null which signifies not a valid expense
     */
    transformToExpense(transaction: never): Expense | null {
        // Skip over transactions that are "credits" as we're only interested in tracking expenses
        if (transaction['Type'] == "Credit")
            return null;

        // Skip transactions associated with other months
        if (this.filterByMonth) {
            let transactionDate: string = transaction['Trans Date'];
            if (this.filterByMonth != transactionDate.split("/")[0])
                return null;
        }

        // Remove the $ character from the amount field
        let amount: string = transaction['Amount'];
        amount = amount.replace(/[^0-9.-]/g, '');

        // Initialize the output transaction
        const expense = new Expense(
            transaction['Trans Date'],
            transaction['Description'],
            transaction['Category'],
            Number(amount),
            transaction['Merchant Name']
        )

        // Now do some revisions here
        expense.description = "Target - " + transaction['Category'] + " Product";
        
        // Rename categories that Chase uses to those that we use
        switch(expense.category) {
            case "Household": {
                expense.category = "Household/Personal";
                break;
            }
        }

        return expense;
    }
} 