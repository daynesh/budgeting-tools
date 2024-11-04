export default class Expense {
    date: string;
    description: string;
    category: string;
    amount: Number;
    memo: string;

    constructor(date: string, description: string, category: string, amount: Number, memo: string) {
        this.date = date;
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.memo = memo;
    }

    print() {
        console.log("Here's a summary of this expense:");
        console.log("   ", this.date);
        console.log("   ", this.description);
        console.log("   ", this.category);
        console.log("   ", this.amount);
    }
}