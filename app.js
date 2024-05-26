function parseCSV(csvData){
    const rows = csvData.split("\n");
    const tableBody=document.querySelector('#csvTable');
    rows.forEach( row =>{
        const colums = row.split(',');
        const tr = document.createElement('tr');
        colums.forEach(column=>{
            const td = document.createElement('td');
            td.textContent=column;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}


function  readCSV(file){
    const reader = new FileReader();
    reader.onload= function(e){
        const csvData = e.target.result;
        parseCSV(csvData);
    }
    reader.readAsText(file);
}

document.querySelector('input[type="file"]').addEventListener('change', function(e){
    const file = e.target.files[0];
    readCSV(file);
});