import chalk from "chalk";
import inquirer from "inquirer";
// Currency Converter API LINK
let apiLink = " https://v6.exchangerate-api.com/v6/3079033c4c53a906d9991823/latest/PKR";
// Fetching Data
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apiLink);
// Object to array
let countries = Object.keys(data);
// user input first country
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting From",
    choices: countries,
});
// first country money
let userMoney = await inquirer.prompt({
    type: "number",
    name: "rupee",
    message: `please enter the amount in ${chalk.greenBright.bold(firstCountry.name)}:`,
});
// convert country 
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting To",
    choices: countries,
});
// conversion rate 
let cnv = `https://v6.exchangerate-api.com/v6/3079033c4c53a906d9991823/pair/${firstCountry.name}/${secondCountry.name}`;
// fetching data for conversion rate
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
let conversionRate = await cnvData(cnv);
let converatedRate = userMoney.rupee * conversionRate;
console.log(`your ${chalk.bold.greenBright(firstCountry.name)}${chalk.bold.greenBright(userMoney.rupee)}in ${chalk.bold.greenBright(secondCountry.name)} is ${chalk.bold.greenBright(converatedRate)}`);
