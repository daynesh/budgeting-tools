export default class Expense {
    date: string;
    description: string;
    category: string;
    amount: Number;
    memo: string;

    constructor(date: string, description: string, category: string, amount: string, memo: string) {
        this.date = date;
        this.description = description;
        this.category = category;

        // All debits are listed as negative by Chase so we must negate before creating output
        this.amount = Number(amount) * -1;

        this.memo = memo;
    }

    // Update the listed category or description based on specific rules
    transform(): Expense {
        let dateAsDate = new Date(this.date);

        // Categorize Insurance related expenses
        if (this.description.includes("GEICO") ||
            this.description.includes("JEWELERS-MUTUAL")
        )
            this.category = "Insurance";

        // All Apple charges
        if (this.description == "APPLE.COM/BILL") {
            // AppleCare+ expenses should be categorized as Insurance
            if (this.amount == 5.43) {
                this.description += " - AppleCare+ for AppleWatch";
                this.category = "Insurance";
            }
            else if (this.amount == 14.38) {
                this.description += " - AppleCare+ for iPhone 15";
                this.category = "Insurance";
            }

            // Subscriptions managed by Apple
            if (dateAsDate.getDate() == 14) {
                this.category = "Utilities";
                this.description += " - Apple iCloud+ Storage";
            }
            else if (dateAsDate.getDate() == 18) {
                this.category = "News & Entertainment";
                this.description += " - Paramount+";
            }
            else if (dateAsDate.getDate() == 21) {
                this.category = "News & Entertainment";
                this.description += " - AppleTV+";
            }
        }
        
        // Categorize Auto Expenses
        if (this.category == "Gas" ||
            this.category == "Automotive" ||
            this.description.includes("TCP ") ||
            this.description.includes("E-Z*PASS")
        )
            this.category = "Auto Expenses";

        // Storage Unit should be listed as Utilities
        if (this.description.includes("STORAGE POST"))
            this.category = "Utilities";

        // Athletic Greens should be listed as Health & Wellness
        if (this.description == "ATHLETICGREENS")
            this.category = "Health & Wellness";

        // Categorize Takeout Food
        if (this.description == "PRIME ENERGY CAFE" ||
            this.description.includes("CIPOLLINA GOURMET")
        )
            this.category = "Takeout Food";

        // Categorize additional News & Entertainment expenses
        if (this.description == "Netflix" ||
            this.description.includes("YouTubePremium") ||
            this.description == "D J*WSJ"
        )
            this.category = "News & Entertainment";

        // Rename categories that Chase uses to those that we use
        switch(this.category) {
            case "Bills & Utilities": {
                this.category = "Utilities";
                break;
            }
            case "Entertainment": {
                this.category = "News & Entertainment";
                break;
            }
            case "Food & Drink": {
                this.category = "Takeout Food";
                break;
            }
            case "Gifts & Donations": {
                this.category = "Gifts";
                break;
            }
            case "Home": {
                this.category = "Home Products";
                break;
            }
            case "Shopping": {
                this.category = "Misc Shopping";
                break;
            }
        }

        return this;
    }

    print() {
        console.log("Here's a summary of this expense:");
        console.log("   ", this.date);
        console.log("   ", this.description);
        console.log("   ", this.category);
        console.log("   ", this.amount);
    }
}