Feature: Pagination
Scenario: Default number of products in a page
Given user is on this category page
Then "10" products should be displayed


Scenario: Number of products in a page modified
Given user is on this category page 
When the user changes ‘Rows per page:’ to "25" 
Then "25" products should be displayed


Scenario:Quantity of products with out of stock
Given user is on this category page 
When the user changes ‘Rows per page:’ to "25" 
When user checks Show Out of Stock 
Then at least one product should show "OUT OF STOCK"


Scenario: Sort products low to high
Given user is on this category page
When the user selects Sort By "Price Low to High"
Then "10" products should be displayed
Then products should be in order of price low to high

