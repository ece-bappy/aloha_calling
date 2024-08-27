document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip header row
            rows.forEach(row => {
                const columns = row.split(',');

                if (columns.length === 4) {
                    const newRow = dataTable.insertRow();

                    const branchCell = newRow.insertCell(0);
                    branchCell.textContent = columns[0];

                    const coordinatorCell = newRow.insertCell(1);
                    coordinatorCell.textContent = columns[1];

                    const phoneCell = newRow.insertCell(2);
                    const phoneLink = document.createElement('a');
                    phoneLink.href = `tel:${columns[2].trim()}`;
                    
                    // Text and icon for phone
                    phoneLink.innerHTML = `
                        <span class="phone-text">${columns[2]}</span>
                        <i class="bi bi-telephone-outbound phone-icon"></i>
                    `;
                    phoneCell.appendChild(phoneLink);

                    const emailCell = newRow.insertCell(3);
                    const emailLink = document.createElement('a');
                    emailLink.href = `mailto:${columns[3].trim()}`;
                    
                    // Text and icon for email
                    emailLink.innerHTML = `
                        <span class="email-text">${columns[3]}</span>
                        <i class="bi bi-envelope-at email-icon"></i>
                    `;
                    emailCell.appendChild(emailLink);

                    const whatsappCell = newRow.insertCell(4);
                    const whatsappLink = document.createElement('a');
                    whatsappLink.href = `https://wa.me/${columns[2].trim()}`;
                    
                    // WhatsApp icon
                    whatsappLink.innerHTML = `<i class="bi bi-whatsapp whatsapp-icon"></i>`;
                    whatsappCell.appendChild(whatsappLink);
                }
            });
        });

    searchInput.addEventListener('keyup', function () {
        const filter = searchInput.value.toLowerCase();
        const rows = dataTable.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const branchName = rows[i].getElementsByTagName('td')[0].textContent.toLowerCase();
            if (branchName.indexOf(filter) > -1) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    });
});
