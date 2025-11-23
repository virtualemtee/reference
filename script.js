function nextTab(step) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('step' + step).classList.add('active');

  if (step === 6) {
    // Gather all inputs
    const setAnode = parseInt(document.getElementById('setAnodeInput').value);
    const setDate = document.getElementById('setDateInput').value;
    const setShift = document.querySelector("input[name='setShift']:checked")?.value;

    const refAnode = parseInt(document.getElementById('refAnodeInput').value);
    const refGauge = parseFloat(document.getElementById('refGaugeInput').value);
    const refDate = document.getElementById('refDateInput').value;
    const refShift = document.querySelector("input[name='refShift']:checked")?.value;

    if (setAnode < 1 || setAnode > 18 || refAnode < 1 || refAnode > 18 || isNaN(setAnode) || isNaN(refAnode)) {
    alert("Error: Set Anode and Reference Anode must be numbers between 1 and 18.");
    return;
}

    
    // Contour groups
    const contours = [
      [1,2,3,4],
      [5,6,7,8],
      [9,10,11,12],
      [13,14,15,16],
      [17,18]
    ];

    function getContour(anode) {
      for (let i = 0; i < contours.length; i++) {
        if (contours[i].includes(anode)) return i;
      }
      return 0;
    }

    // Contour offset
    const contourOffset = getContour(setAnode) - getContour(refAnode);

    // Shift offset
    const shifts = ['Grave','Day','Swing'];
    const dateDiff = Math.round((new Date(setDate) - new Date(refDate)) / (1000*60*60*24));

    let shiftOffset = 0;
    if (dateDiff === 0) {
      // same day
      let refIndex = shifts.indexOf(refShift);
      let setIndex = shifts.indexOf(setShift);
      shiftOffset = setIndex - refIndex;
      if (shiftOffset < 0) shiftOffset += shifts.length;
    } else if (dateDiff > 0) {
      // forward in time
      let refIndex = shifts.indexOf(refShift);
      let setIndex = shifts.indexOf(setShift);
      shiftOffset = dateDiff * 3 + (setIndex - refIndex);
    }

    // Total value to add to reference gauge
    const totalOffset = contourOffset + shiftOffset;
    const finalGauge = refGauge + totalOffset;

    // Show all results
    document.getElementById('resultAnode').textContent = setAnode;
    document.getElementById('setInfo').textContent = `${setDate} (${setShift})`;
    document.getElementById('refAnodeLabel').textContent = refAnode;
    document.getElementById('refInfo').textContent = `${refDate} (${refShift})`;
    document.getElementById('gaugeInfo').textContent = `${refGauge}`;
   document.getElementById('markResult').textContent = totalOffset;
    document.getElementById('calcResult').textContent = finalGauge;
  }
}

function prevTab(step) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('step' + step).classList.add('active');
}

function restart() {
  window.location.reload();
}
