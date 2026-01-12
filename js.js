function displaySpots() {
    let parkingSpots = JSON.parse(localStorage.getItem('parkingSpots')) || [];
    const spotsCon = document.querySelector('#spots-con');
    spotsCon.innerHTML = "";
    parkingSpots.slice(0, 8).forEach(element => {
        if (element.occupied == false) {
            spotsCon.insertAdjacentHTML(
                "beforeend",
                `<button 
     class="spot free show-modal"
     data-number="${element.number}"
     data-occupied="${element.occupied}"
   >
     <p>A${element.number}</p>
   </button>`
            );

        } else {
            spotsCon.insertAdjacentHTML(
                "beforeend",
                `<button 
     class="spot occupied show-modal"
     data-number="${element.number}"
     data-occupied="${element.occupied}"
   >
     <p>A${element.number}</p>
   </button>`
            );

        }
    });
}

const vehicle = parkedVehicles.push({
        spotNumber: spotNumber++,
        plateNumber: plate,
        type: type,
        exitTime: null,
        entryTime: now.getTime(),
        enterTime: now.toLocaleTimeString(),
        spotNumber: freeSpot.number
    });

/////////////////////////////////////////////////
    retardTable.innerHTML = "";

    if (retardTest.length === 0) {
        retardTable.innerHTML = `
    <tr>
      <td colspan="4" class="text-center text-muted py-3">
        Aucun retard enregistré
      </td>
    </tr>
  `;
    } else {
        retardTest.slice(-3).forEach(r => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
      <td class="ps-4 fw-bold">${new Date().toLocaleDateString("fr-FR")}</td>
      <td>
        <span class="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill">
          Retard
        </span>
      </td>
      <td>${r.arrivalTime}</td>
      <td>${r.motive || "-"}</td>
    `;

            retardTable.appendChild(tr);
        });
    }
