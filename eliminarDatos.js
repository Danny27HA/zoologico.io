let updatedCsvData = '';

document.getElementById('csvFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const csvData = e.target.result;
        updatedCsvData = csvData; 
        updateTable(csvData);
        document.getElementById('downloadBtn').style.display = 'block';
    }
    reader.readAsText(file);
});

function updateTable(csvData) {
    const tableBody = document.querySelector('#csvTable tbody');
    tableBody.innerHTML = ''; 
    const rows = csvData.split('\n').filter(row => row.trim() !== '');
    rows.forEach((row, index) => {
        const columns = row.split(',');
        const tr = document.createElement('tr');
        columns.forEach(column => {
            const td = document.createElement('td');
            td.textContent = column;
            tr.appendChild(td);
        });
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', function() {
            deleteRow(index);
        });
        const td = document.createElement('td');
        td.appendChild(deleteBtn);
        tr.appendChild(td);
        tableBody.appendChild(tr);
    });
}

function deleteRow(index) {
    const rows = updatedCsvData.split('\n').filter(row => row.trim() !== '');
    rows.splice(index, 1); 
    updatedCsvData = rows.join('\n');
    updateTable(updatedCsvData);
}

document.getElementById('downloadBtn').addEventListener('click', function() {
    const csvFile = document.getElementById('csvFile').files[0];
    const blob = new Blob([updatedCsvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = csvFile ? csvFile.name : 'updated.csv';
    a.click();
    
    URL.revokeObjectURL(url);
});