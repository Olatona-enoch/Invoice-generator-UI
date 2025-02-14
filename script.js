let mainForm = document.forms.mainForm;
let myDate = new Date();
let change = myDate.toLocaleDateString();
console.log(change);
function submitForm(event) {
    //prevent page from refreshing
    event.preventDefault();
}
mainForm.addEventListener("submit",submitForm);
// declaring the variable to get the add item button and the formbody
let addItem = document.getElementById("add-item");
let formBody = document.getElementById("formBody");
// function to add another task
function newItem() {
    const newDiv = document.createElement("div");
    newDiv.classList.add("item-box");
    newDiv.innerHTML = `
                        <div class="input-group">
                            <label for="itemName">Item:</label>
                            <input type="text" name="itemName" id="">
                        </div>
                        <div class="input-group">
                            <label for="price">Price: </label>
                            <input type="number" name="price" id="">
                        </div>
                        <div class="input-group">
                            <label for="quantity">Quantity: </label>
                            <input type="number" name="quantity" id="">
                        </div>`

    formBody.appendChild(newDiv)
}
let customerName = mainForm.customerName;
//to save the task
// function saveInvoice() {
   
    // let InvoiceName = document.getElementById("customerInfo");
    // let customerNumber = mainForm.customerNumber.value;
    // let address = mainForm.address.value;
    // let itemName = mainForm.itemName.value;
    // let price = mainForm.price.value;
    // let quantity = mainForm.quantity.value;
    
    // InvoiceName.innerHTML = customerName +"<br>"+ customerNumber +"<br>"+ address;
// }
// const mainTable = document.getElementById("mainTable");
let invoiceID = 3373737;
// for (let i = 0; i < Infinity; i++) {
//     invoiceID += i;
    
// }
mainForm.addEventListener("change",function makeInvoice() {
    let InvoiceName = document.getElementById("customerInfo");
    let customerName = mainForm.customerName.value;
    let customerNumber = mainForm.customerNumber.value;
    let address = mainForm.address.value;
    // to change the customerdetails in the invoice
    InvoiceName.innerHTML = `${customerName} <br> ${customerNumber} <br> ${address}`;

    let idAndDate = document.getElementById("idAndDate");
    idAndDate.innerHTML = `
          Invoice No. ${invoiceID} <br> Date: ${change}`;

    let mainTable = document.getElementById("mainTable");
    mainTable.innerHTML = `<tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Total</th>
    </tr>`;  

    //declaring itembox array
    const itemBox = document.querySelectorAll(".item-box");
    // declaring subtotal variable; 
    let subtotal =0;
    itemBox.forEach(itemBox => {
        let itemName = itemBox.querySelector("input[name='itemName']").value;
        let price = parseFloat(itemBox.querySelector("input[name='price']").value);
        let quantity = parseInt(itemBox.querySelector("input[name='quantity']").value);

        if (itemName && quantity > 0 && price > 0) {
            // set total price of item
            let total = price * quantity;
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${itemName}</td>
                <td>${quantity} </td>
                <td>$${price.toFixed(2)}</td>
                <td>$${total.toFixed(2)}</td>`;

            mainTable.appendChild(newRow);
            // the sum of all the totals
            subtotal += total

        }
        
   });
console.log(subtotal, 'new total');
let calcTable = document.getElementsByClassName("calculations")[0];
let tax = subtotal * 0.13;
let fullTotal = subtotal + tax;
calcTable.innerHTML = `
    <tr>
        <td>Subtotal</td>
        <td>$${subtotal.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Tax(13%)</td>
        <td>$${tax.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Total</td>
        <td> $${fullTotal.toFixed(2)}</td>
    </tr>`;

}) 
const invoiceSection = document.querySelector(".invoice-section"); 
const toPDF = function (invoiceSection) {
    const html_code = ` 
    <link rel="stylesheet" href="invoice.css">
    <div class="invoice-section">${invoiceSection.innerHTML}<div>`;
    const new_window = window.open();
    new_window.document.write(html_code);

    setTimeout(() => {
        new_window.print();
    }, 200);
}
const printer = document.querySelector("#print");
// print.addEventListener("click", function()){}
printer.onclick = () =>{
    toPDF(invoiceSection)
}

