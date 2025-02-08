import { parse } from "csv-parse/sync";
import TargetTransactionsParser from "./targetTransactionsParser";

test('transform the Auto Insurance transaction into the right expense parameters', () => {
    
    const mockCsvContents = `
"Trans Date",Type,Category,Merchant Name,Transaction Type,Amount
10/30/2024,Debit,Household,TARGET.COM,Sales Draft,$70.32 
`;

    const listOfTransactions = parse(mockCsvContents, {
        columns: true,
        skip_empty_lines: true
    });
    let parser = new TargetTransactionsParser(listOfTransactions, "10");
    const expenses = parser.extractExpenses()
    
    // Now validate that we've transformed the right fields and left the others
    expect(expenses[0].amount).toBe(70.32);
    expect(expenses[0].category).toBe("Household/Personal");
    expect(expenses[0].date).toBe("10/30/2024");
    expect(expenses[0].description).toBe("Target - Household Product");
});