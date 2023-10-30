import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import CategoryPage from "../../../PageObjects/CategoryPage.js"
const CategPage=new CategoryPage()

//Launches abrasive page. BaseURL is added in cypress.config.js
Given('user is on this category page', () => {
cy.visit('/shop/abrasives/cutting/c/090901')
})



//The method calls function to set up number of products in page
//rows argument is passed from feature file. rows describes the
//number of rows of products to be displayed in a page
When("the user changes ‘Rows per page:’ to {string}", (rows) => {
   
        CategPage.setupNoOfItemsInPage(rows)
})



//The function calls method to verify if number of products 
//displayed is same as the 'rows' passed in the argument
//rows argument is passed from feature file
Then('{string} products should be displayed', (rows) => {
    CategPage.verifyNoOfItemsInPage(rows)
})



//The function calls method to check 'show unavailable' checkbox
When('user checks Show Out of Stock',() => {
    CategPage.checksShowUnavailable()
})


//The function calls method to verify if right stock message is displayed
//stock_message is argument from feature file. 
//values- OUT OF STOCK, IN STOCK
Then("at least one product should show {string}",(stock_message)=>{
    CategPage.verifyAtleastOneStockMessage(stock_message)
})



//The function calls method to choose sort by
//SortBy is argument from feature file. 
//values- Most Popular,Product Title A-Z,Product Title Z-A
//Price Low to High,Price High to Low
When("the user selects Sort By {string}",(SortBy)=>{
    CategPage.selectSortBy(SortBy)
})



//The function calls method to verify if products are sorted 
//low to high
Then('products should be in order of price low to high',() =>{
    CategPage.VerifyLowToHighSort()
})