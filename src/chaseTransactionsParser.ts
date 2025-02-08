import TransactionsParser from "./transactionsParser";
import Expense from "./expense";
import exp from "constants";

export default class ChaseTransactionsParser extends TransactionsParser {

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
        var amountAsUsd = parseFloat(transaction['Amount']);
        if (amountAsUsd >= 0)
            return null;

        // Skip transactions associated with other months
        if (this.filterByMonth) {
            let transactionDate: string = transaction['Transaction Date'];
            if (this.filterByMonth != transactionDate.split("/")[0])
                return null;
        }

        // Initialize the output transaction
        const expense = new Expense(
            transaction['Transaction Date'],
            transaction['Description'],
            transaction['Category'],
            Number(transaction['Amount']) * -1, // All debits are listed as negative by Chase so we must negate before creating output
            transaction['Memo']
        )

        let dateAsDate = new Date(expense.date);

        // Categorize Insurance related expenses
        if (expense.description.includes("GEICO") ||
            expense.description.includes("JEWELERS-MUTUAL")
        )
            expense.category = "Insurance";

        // All Apple charges
        if (expense.description == "APPLE.COM/BILL") {
            // Default category & description for these expenses
            expense.category = "News & Entertainment";

            // AppleCare+ expenses should be categorized as Insurance
            if (expense.amount == 5.43) {
                expense.description += " - AppleCare+ for AppleWatch";
                expense.category = "Insurance";
            }
            else if (expense.amount == 14.38) {
                expense.description += " - AppleCare+ for iPhone 15";
                expense.category = "Insurance";
            }

            // Subscriptions managed by Apple
            if (dateAsDate.getDate() == 14) {
                expense.category = "Utilities";
                expense.description += " - Apple iCloud+ Storage";
            }
            else if (dateAsDate.getDate() == 18) {
                expense.description += " - Paramount+";
            }
            else if (dateAsDate.getDate() == 21) {
                expense.description += " - AppleTV+";
            }
        }
        
        // Categorize Auto Expenses
        if (expense.category == "Gas" ||
            expense.category == "Automotive" ||
            expense.description.includes("TCP ") ||
            expense.description.includes("E-Z*PASS") ||
            expense.description.toLowerCase().includes("dof parking")
        )
            expense.category = "Auto Expenses";

        // Storage Unit should be listed as Utilities
        if (expense.description.includes("STORAGE POST"))
            expense.category = "Utilities";

        // Athletic Greens should be listed as Health & Wellness
        if (expense.description == "ATHLETICGREENS")
            expense.category = "Health & Wellness";

        // Categorize Takeout Food
        if (expense.description == "PRIME ENERGY CAFE" ||
            expense.description.includes("CIPOLLINA GOURMET")
        )
            expense.category = "Takeout Food";

        // Categorize additional News & Entertainment expenses
        if (expense.description.toLowerCase().includes("netflix") ||
            expense.description.includes("YouTubePremium") ||
            expense.description == "D J*WSJ"
        )
            expense.category = "News & Entertainment";

        // Categorize Afterschool expenses
        if (expense.description.toLowerCase().includes("soccer friends")) {
            expense.category = "Childcare Expenses";
            expense.description += " - Afterschool";
        }

        // Rename categories that Chase uses to those that we use
        switch(expense.category) {
            case "Bills & Utilities": {
                expense.category = "Utilities";
                break;
            }
            case "Entertainment": {
                expense.category = "News & Entertainment";
                break;
            }
            case "Food & Drink": {
                expense.category = "Takeout Food";
                break;
            }
            case "Gifts & Donations": {
                expense.category = "Gifts";
                break;
            }
            case "Home":
            case "Shopping":
            case "Personal": {
                expense.category = "Household/Personal";
                break;
            }
            case "Education": {
                expense.category = "Childcare Savings";
                break;
            }
        }

        return expense;
    }
} 