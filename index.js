let dataEntries = []; // Array to hold all form entries

function submitData() {
    // Get form values
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const email = document.getElementById("email").value;
    const age = parseInt(document.getElementById("age").value, 10);

    // Check if all fields are filled
    if (!name || !number || !email || !age) {
        alert("Please fill all fields.");
        return;
    }

    // Add form data to the dataEntries array
    dataEntries.push({ name, number, email, age });
    displayData(dataEntries); // Display all data entries

    cleardata();
}

function displayData(entries) {
    const tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Clear the table before displaying filtered data

    entries.forEach(entry => {
        const newRow = tableBody.insertRow();

        newRow.insertCell(0).textContent = entry.name;
        newRow.insertCell(1).textContent = entry.number;
        newRow.insertCell(2).textContent = entry.email;
        newRow.insertCell(3).textContent = entry.age;

        const actionsCell = newRow.insertCell(4);
        actionsCell.innerHTML = `
            <button onclick="editRow(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
        `;
    });
}

function filterBelow18() {
    const below18Entries = dataEntries.filter(entry => entry.age < 18);
    displayData(below18Entries);
}

function filterAbove18() {
    const above18Entries = dataEntries.filter(entry => entry.age >= 18);
    displayData(above18Entries);
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    const name = row.cells[0].textContent;

    dataEntries = dataEntries.filter(entry => entry.name !== name);
    displayData(dataEntries);
}

function editRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName("td");

    document.getElementById("name").value = cells[0].textContent;
    document.getElementById("number").value = cells[1].textContent;
    document.getElementById("email").value = cells[2].textContent;
    document.getElementById("age").value = cells[3].textContent;

    deleteRow(button); // Remove the row before editing
}

function cleardata() {
    document.getElementById("name").value = '';
    document.getElementById("number").value = '';
    document.getElementById("email").value = '';
    document.getElementById("age").value = '';
}
function filterTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const table = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
    const rows = table.getElementsByTagName("tr");

    for (let row of rows) {
        let rowContainsQuery = false;
        const cells = row.getElementsByTagName("td");

        // Loop through all cells in the current row
        for (let cell of cells) {
            if (cell) {
                const cellValue = cell.textContent || cell.innerText;
                if (cellValue.toLowerCase().includes(input)) {
                    rowContainsQuery = true;
                    break; // Stop checking other cells if a match is found
                }
            }
        }
        
        // Show the row if a match was found, otherwise hide it
        row.style.display = rowContainsQuery ? "" : "none";
    }
}

