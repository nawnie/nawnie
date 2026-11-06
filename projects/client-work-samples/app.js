(function () {
  'use strict';
  const engine = window.PortfolioEngine;
  const $ = (id) => document.getElementById(id);
  const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const tabs = Array.from(document.querySelectorAll('[data-tab]'));
  const demoNames = ['staffing', 'property', 'rooms'];
  const roomLabels = { available: 'Available', occupied: 'Occupied', not_ready: 'Not ready', out_of_service: 'Out of service' };
  const defaultRooms = [
    { roomId: '101', pms: 'vacant', housekeeping: 'clean' },
    { roomId: '102', pms: 'vacant', housekeeping: 'dirty' },
    { roomId: '103', pms: 'occupied', housekeeping: 'clean' },
    { roomId: '104', pms: 'occupied', housekeeping: 'clean' },
    { roomId: '105', pms: 'vacant', housekeeping: 'out_of_service' },
    { roomId: '106', pms: 'vacant', housekeeping: 'clean' }
  ];
  function selectTab(name, focus) {
    demoNames.forEach((key) => {
      const selected = key === name;
      $('tab-' + key).setAttribute('aria-selected', String(selected));
      $('tab-' + key).tabIndex = selected ? 0 : -1;
      $('panel-' + key).hidden = !selected;
    });
    if (focus) $('tab-' + name).focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab.dataset.tab, false));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(tabs[next].dataset.tab, true); }
    });
  });
  document.querySelectorAll('[data-demo-link]').forEach((link) => {
    link.addEventListener('click', () => selectTab(link.dataset.demoLink, false));
  });
  function clearErrors(form, kind) {
    form.querySelectorAll('[aria-invalid]').forEach((input) => { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); });
    $(kind + '-error').hidden = true;
    $(kind + '-error').textContent = '';
  }
  function displayError(form, kind, message, input) {
    const error = $(kind + '-error');
    error.textContent = message;
    error.hidden = false;
    if (input) { input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', error.id); input.focus(); }
    $(kind + '-update').textContent = 'Inputs need attention. Results above are from the last valid scenario.';
  }
  function readNumbers(form) {
    const values = {};
    for (const input of form.querySelectorAll('input[type="number"]')) {
      if (input.value.trim() === '' || !input.validity.valid || !Number.isFinite(input.valueAsNumber)) {
        const label = input.closest('label').firstChild.textContent.trim();
        const min = input.getAttribute('min');
        const max = input.getAttribute('max');
        const whole = input.step === '1' ? 'whole number' : 'number';
        const error = new Error(label + ': enter a ' + whole + ' from ' + number.format(Number(min)) + ' to ' + number.format(Number(max)) + '.');
        error.input = input;
        throw error;
      }
      values[input.name] = input.valueAsNumber;
    }
    return values;
  }
  function renderStaffing(result, initial) {
    $('staff-result-count').textContent = number.format(result.staffRequired);
    $('staff-result-stayovers').textContent = number.format(result.stayovers);
    $('staff-result-base').textContent = number.format(result.baseMinutes) + ' min';
    $('staff-result-adjusted').textContent = number.format(result.adjustedMinutes) + ' min';
    $('staff-result-hours').textContent = number.format(result.laborHours) + ' hours';
    $('staffing-update').textContent = initial ? 'Default fictional scenario.' : 'Updated from the inputs shown. Calculated locally.';
  }
  function runStaffing(initial) {
    const form = $('staffing-form');
    clearErrors(form, 'staffing');
    try {
      const values = readNumbers(form);
      if (values.departures > values.occupiedRooms) {
        const error = new Error('Departures cannot exceed occupied rooms. Check those two room counts.');
        error.input = $('departures');
        throw error;
      }
      renderStaffing(engine.staffingPlan(values), initial);
    } catch (error) { displayError(form, 'staffing', error.message, error.input); }
  }
  const flagLabels = {
    negative_noi: 'Operating expenses exceed revenue; net operating income is negative.',
    no_debt_service: 'Debt service is zero; a coverage ratio is not applicable.',
    debt_service_exceeds_noi: 'Net operating income does not cover the annual debt service entered.',
    renovation_reserve_gap: 'Renovation budget exceeds the cash allocated.'
  };
  function runProperty(initial) {
    const form = $('property-form');
    clearErrors(form, 'property');
    try {
      const result = engine.propertyScreen(readNumbers(form));
      $('property-result-dscr').textContent = result.dscr === null ? 'N/A' : result.dscr.toFixed(2) + '×';
      $('property-result-noi').textContent = money.format(result.noi);
      $('property-result-gap').textContent = money.format(result.reserveGap);
      const flags = $('property-flags');
      flags.replaceChildren();
      const entries = result.flags.length ? result.flags.map((flag) => flagLabels[flag] || flag) : ['No flags under these limited rules; this is not approval or a complete assessment.'];
      entries.forEach((text) => { const li = document.createElement('li'); li.textContent = text; flags.appendChild(li); });
      $('property-update').textContent = initial ? 'Default fictional scenario.' : 'Updated from the inputs shown. Calculated locally.';
    } catch (error) { displayError(form, 'property', error.message, error.input); }
  }
  function makeRoomSelect(roomId, type, current, values) {
    const select = document.createElement('select');
    select.name = type + '-' + roomId;
    select.id = type + '-' + roomId;
    select.setAttribute('aria-label', 'Room ' + roomId + ' ' + (type === 'pms' ? 'PMS state' : 'housekeeping state'));
    values.forEach(([value, label]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      option.defaultSelected = value === current;
      select.appendChild(option);
    });
    select.addEventListener('change', () => { $('rooms-update').textContent = 'Inputs changed. Select Reconcile rooms to update the result.'; });
    return select;
  }
  defaultRooms.forEach((room) => {
    const tr = document.createElement('tr');
    const roomCell = document.createElement('td');
    roomCell.textContent = room.roomId;
    tr.appendChild(roomCell);
    const pmsCell = document.createElement('td');
    pmsCell.appendChild(makeRoomSelect(room.roomId, 'pms', room.pms, [['vacant', 'Vacant'], ['occupied', 'Occupied']]));
    tr.appendChild(pmsCell);
    const hkCell = document.createElement('td');
    hkCell.appendChild(makeRoomSelect(room.roomId, 'hk', room.housekeeping, [['clean', 'Clean'], ['dirty', 'Dirty'], ['out_of_service', 'Out of service']]));
    tr.appendChild(hkCell);
    const stateCell = document.createElement('td');
    const state = document.createElement('span');
    state.id = 'room-state-' + room.roomId;
    state.className = 'room-state';
    state.textContent = 'Not checked';
    stateCell.appendChild(state);
    tr.appendChild(stateCell);
    $('room-inputs').appendChild(tr);
  });
  function runRooms(initial) {
    const form = $('rooms-form');
    clearErrors(form, 'rooms');
    try {
      const rows = defaultRooms.map((room) => ({ roomId: room.roomId, pms: $('pms-' + room.roomId).value, housekeeping: $('hk-' + room.roomId).value }));
      const result = engine.auditRooms(rows);
      $('room-result-available').textContent = String(result.available);
      $('room-result-total').textContent = String(result.total);
      $('room-result-occupied').textContent = String(result.occupied);
      $('room-result-exceptions').textContent = String(result.exceptionCount);
      $('room-result-ids').textContent = result.availableRooms.length ? result.availableRooms.join(', ') : 'None';
      result.rooms.forEach((room) => { const badge = $('room-state-' + room.roomId); badge.textContent = roomLabels[room.status] || room.status; badge.className = 'room-state ' + room.status; });
      $('rooms-update').textContent = initial ? 'Default fictional scenario.' : 'Reconciled from the states shown. Calculated locally.';
    } catch (error) { displayError(form, 'rooms', error.message); }
  }
  if (!engine) {
    $('engine-error').hidden = false;
    document.querySelectorAll('form button[type="submit"]').forEach((button) => { button.disabled = true; });
    return;
  }
  [['staffing', runStaffing], ['property', runProperty], ['rooms', runRooms]].forEach(([name, calculate]) => {
    const form = $(name + '-form');
    form.addEventListener('submit', (event) => { event.preventDefault(); calculate(false); });
    form.addEventListener('reset', () => { window.setTimeout(() => calculate(true), 0); });
    form.querySelectorAll('input').forEach((input) => { input.addEventListener('input', () => { $(name + '-update').textContent = 'Inputs changed. Recalculate to update the result.'; }); });
    calculate(true);
  });
}());
