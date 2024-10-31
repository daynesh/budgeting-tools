export default class Expense {
    date: string;
    description: string;
    category: string;
    amount: Number;

    constructor(date: string, description: string, category: string, amount: string) {
        this.date = date;
        this.description = description;
        this.category = category;

        // All debits are listed as negative by Chase so we must negate before creating output
        this.amount = Number(amount) * -1;
    }

    // Update the listed category or description based on specific rules
    transform(): Expense {
        let dateAsDate = new Date(this.date);

        // Geico Auto Insurance should be categorized as Insurance
        if (this.description.includes("GEICO")) {
            this.category = "Insurance";
        }

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
        
        // All gas and Automotive expenses should be categorized as Auto Expenses
        if ((this.category == "Gas") || (this.category == "Automotive")) {
            this.category = "Auto Expenses";
        }

        // EZ Pass expenses should also be listed as Auto Expenses
        if (this.description.includes("E-Z*PASS")) {
            this.category = "Auto Expenses";
        }

        // Parking Garage expenses should be listed as Auto Expenses
        if (this.description.includes("TCP ")) {
            this.category = "Auto Expenses";
        }

        // Storage Unit should be listed as Utilities
        if (this.description.includes("STORAGE POST"))
            this.category = "Utilities";

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
            case "Home": {
                this.category = "Home Products";
                break;
            }
            case "Shopping": {
                this.category = "Misc Shopping";
                break;
            }
        }

        // // Any generic Shopping expense should be listed as Misc Shopping
        // if (this.category == "Shopping")
        //     this.category = "Misc Shopping";

        // // Food & Drink should be listed as Takeout Food
        // if (this.category == "Food & Drink")
        //     this.category = "Takeout Food";

        // // Entertainment should be listed as News & Entertainment
        // if (this.category == "Entertainment")
        //     this.category = "News & Entertainment";

        // // Home should be listed as Home Products
        // if (this.category == "Home") {
        //     this.category = "Home Products";
        // }

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