let updatedCsvData = '';

document.getElementById('addForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const habitat = document.getElementById('habitat').value;
    const animal = document.getElementById('animal').value;
    const cantidad = document.getElementById('cantidad').value;
    
    const newRow = `${habitat},${animal},${cantidad}\n`;

    if (!updatedCsvData) {
        alert("Por favor, selecciona un archivo CSV para añadir datos.");
        return;
    }
    
    updatedCsvData = updatedCsvData.trim() + '\n' + newRow; 
    updateTable(updatedCsvData);
});

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
        tableBody.appendChild(tr);
    });
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