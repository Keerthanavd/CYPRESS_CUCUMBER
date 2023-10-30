class CategoryPage{
//All the products displayed in page
productsInPage='div[data-testid="ProductCard"]'

//Rows per page dropdown upper
TablePaginationUp='[data-testid="pagination"]:nth-of-type(2) .MuiTablePagination-select'

//show Unavailable checkbox
Show_Unavailable='[data-testid="filterCheckbox-Show Unavailable"]'

//Availability of stock
Stock_Message = '[data-testid="stockMessage"] .MuiBox-root'

//Show Unavailable tag
tagShowUnavailable = '[data-testid="filtersChip-Show Unavailable"]'

//sortByDropdown
DropdownSortBy='[data-testid="menuSortBy"]'

//all the pricelabels of the visible products
priceLabel='[data-testid="priceLabel"]'


//Method to set up Rows per page dropdown
setupNoOfItemsInPage(RowsPrPage){

    let RowsPerPageEl='[data-value="'+RowsPrPage+'"]'
    cy.get(this.TablePaginationUp).click()
    cy.get(RowsPerPageEl).click()
    cy.get(this.TablePaginationUp).should(($p)=>{
        expect($p).to.contain(RowsPrPage)
    })
    
}


//Method to check show unavailable
checksShowUnavailable(){
    cy.get(this.Show_Unavailable).check().should('be.checked')
    cy.get(this.tagShowUnavailable).should('be.visible')
}

//Method to Verify number of products in a page
verifyNoOfItemsInPage(RowsPrPage){
    const DefaultRows=10
    if(RowsPrPage=== undefined){
        cy.get(this.productsInPage).should('have.length',DefaultRows)
    }
    else{
        cy.get(this.productsInPage).should('have.length',RowsPrPage)
    }
}

//Generic Method to Verify at least one product has stock message passed
//in the argument
verifyAtleastOneStockMessage(stockMessage){
    cy.get(this.Stock_Message).should('contain',stockMessage)
}

//Generic Method to select 'sort by' dropdown. 
//Value passed through argument 
selectSortBy(SortBy){
cy.get(this.DropdownSortBy).click()
cy.intercept({
    url:"**/search",
    method:"POST"
}).as("load")
cy.contains(SortBy).click()
cy.get(this.DropdownSortBy).should('contain',SortBy)
cy.wait('@load')
}


//To verify if products are displayed low to high
VerifyLowToHighSort(){
cy.get(this.productsInPage)
    // use the "have.length.gt" assertion to retry
    // until there are items on the page
    .should('have.length.gt', 1)
    .then((items) => {
      // confirm the numbers of elements are equal
      cy.get(this.priceLabel).should('have.length', items.length)
    })

    cy.get(this.priceLabel).then(($prices) => {
        const innerText = (el) => el.innerText
        const firstWord = (text) => text.split(' ')[0]
        const justDigits = (str) => str.replace(/[^0-9.]/g, '')
        const prices = Cypress._.map($prices, (el) =>
          parseFloat(justDigits(firstWord(innerText(el)))),
        )
        // confirm the "prices" array is already sorted
        const sorted = Cypress._.sortBy(prices)
        expect(sorted).to.deep.equal(prices)
        //return prices
      })


}
}
export default CategoryPage