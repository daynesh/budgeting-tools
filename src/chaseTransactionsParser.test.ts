import { parse } from "csv-parse/sync";
import ChaseTransactionsParser from "./chaseTransactionsParser";

test('transform the Auto Insurance transaction into the right expense parameters', () => {

    const mockCsvContents = `
"Transaction Date",Description,Category,Amount,Memo
09/01/2024,GEICO *AUTO,Bills & Utilities,-194.70, 
`;

    const listOfTransactions = parse(mockCsvContents, {
        columns: true,
        skip_empty_lines: true
    });
    let parser = new ChaseTransactionsParser(listOfTransactions, "09");
    const expenses = parser.extractExpenses()

    // Now validate that we've transformed the right fields and left the others
    expect(expenses[0].amount).toBe(194.70);
    expect(expenses[0].category).toBe("Insurance");
    expect(expenses[0].date).toBe("09/01/2024");
    expect(expenses[0].description).toBe("GEICO *AUTO");
});

test('ensure Netflix expense is categorized as News & Entertainment', () => {

    const mockCsvContents = `
"Transaction Date",Description,Category,Amount,Memo
09/01/2024,Netflix,Bills & Utilities,-16.86, 
09/02/2024,NETFLIX.COM,Bills & Utilities,-16.86, 
`;

    const listOfTransactions = parse(mockCsvContents, {
        columns: true,
        skip_empty_lines: true
    });
    let parser = new ChaseTransactionsParser(listOfTransactions, "09");
    const expenses = parser.extractExpenses()
    
    // Now validate that we've transformed the right fields and left the others
    expect(expenses[0].category).toBe("News & Entertainment");
    expect(expenses[1].category).toBe("News & Entertainment");
});