export const convertRegionEnum = (region) => {
    const regionEnum = {
        1: "USA",
        2: "Europe",
        3: "Japan",
        4: "Other"
    }
    return regionEnum[region];
}

export const convertConditionEnum = (condition) => {
    const conditionEnum = {
        1: "Sealed",
        2: "Complete In Box",
        3: "Loose"
    }
    return conditionEnum[condition];
}

export const convertStockEnum = (stock) => {
    const stockEnum = {
        1: "In Stock",
        2: "Out of Stock",
        3: "On Loan"
    }
    return stockEnum[stock];
}

export const convertTransactionEnum = (transaction) => {
    const transactionEnum = {
        1: "Buy",
        2: "Sold",
        3: "Loan"
    }

    return transactionEnum[transaction];
}