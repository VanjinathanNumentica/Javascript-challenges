// The data is the available inventory in the store. In the store you have various products with their price and available quantity.
// Based on this data, write a function to generate the total bill of a grocery list given by an user
// getTotalAmount([
//     { item: 'Jam - Apricot', quantity: 2 },
//     { item: 'Creamers - 10%', quantity:1 },
//   ]); // The result would be (94.11 * 2) + (1 * 49.54)
// Please note if the user wants an quantity above what the store has. You should account for the quantity the store has. For example if the user wants 4 quantity but the store has only 2, then your calculation should only account for 2

const storeItems = [
  { item: 'Jam-Apricot', price: 94.11, quantity: 5 },
  { item: 'Creamers-10%', price: 49.54, quantity: 5 },
  { item: 'Wheat-Bread', print: 43, quantity: 8 },
  { item: 'Milk-500ML', price: 16, quantity: 7 },
]
const userListItems = [
  { item: 'Jam-Apricot', quantity: 2 },
  { item: 'Creamers-10%', quantity: 1 }
]
let updatedStore = [];

function billing(itemsInStore, userList) {
  let bill = {};
  let totalBillValue = 0;

  for (let i = 0; i < userList.length; i++) {
    let totalPrice = 0;
    let userItem = userList[i];

    if (userItem.quantity <= 0) {
      console.error("Invalid quantity of" + userItem.item + "Check your input quantity!!.");
      continue;
    }
    let pricePerUnit = 0;
    for (let j = 0; j < itemsInStore.length; j++) {

      if (userItem.item.toLowerCase() === itemsInStore[j].item.toLowerCase()) {

        // Check if stock is for the product
        if (itemsInStore[j].quantity === 0) {
          console.error(userItem.item + "is out of stock!!.");
          continue;
        }

        //if minimum stock is available mention it 
        if (itemsInStore[j].quantity < userItem.quantity) {
          userItem.quantity = itemsInStore[j].quantity;
          console.log("\nonly " + itemsInStore[j].quantity + " unit is available for " + userItem.item);
        }

        if (itemsInStore[j].quantity >= userItem.quantity) {
          itemsInStore[j].quantity = itemsInStore[j].quantity - userItem.quantity;

          pricePerUnit = (itemsInStore[j].price);
          totalPrice = pricePerUnit * userItem.quantity;
          totalBillValue += totalPrice;
          bill[userItem.item] = { quantity: userItem.quantity, pricePerUnit: pricePerUnit, totalPrice }
          break;
        }
      }
    }
  }

  //check that all items from user list in bill
  if (userList.length === Object.keys(bill).length) {  
    console.log("Your bill:", bill, "\nyour total bill value =", totalBillValue);
  }
}
billing(storeItems, userListItems);