/**
 * JT Position Finder
 * Accessible module position selector for Joomla administrator.
 *
 * @copyright (C) 2026 JoomTheme. All rights reserved.
 * @license   GNU General Public License version 2 or later
 */
(() => {
  'use strict';

  const optionKey = 'plg_system_jtpositionfinder';
  const options = window.Joomla && Joomla.getOptions ? Joomla.getOptions(optionKey, {}) : {};

  if (!options || !options.fieldId) {
    return;
  }

  const strings = options.strings || {};
  const text = (key, fallback) => strings[key] || fallback;

  const ready = (callback) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }

    callback();
  };

  const normalise = (value) => String(value || '').trim().toLowerCase();
  const uniqueId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

  ready(() => {
    const field = document.getElementById(options.fieldId);

    if (!field || field.dataset.jtPositionFinder === '1') {
      return;
    }

    field.dataset.jtPositionFinder = '1';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button-jt-position-finder btn btn-primary mt-2';

    const buttonIcon = document.createElement('span');
    buttonIcon.className = 'icon-search me-2';
    buttonIcon.setAttribute('aria-hidden', 'true');

    const buttonText = document.createTextNode(text('button', 'Find position'));
    button.append(buttonIcon, buttonText);
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-expanded', 'false');

    const controls = field.closest('.controls') || field.parentElement;

    if (!controls) {
      return;
    }

    controls.appendChild(document.createTextNode(' '));
    controls.appendChild(button);

    const state = {
      modal: null,
      backdrop: null,
      search: null,
      list: null,
      status: null,
      customInput: null,
      lastFocused: null,
      isOpen: false,
      bodyHadModalOpen: false,
    };

    button.addEventListener('click', () => openDialog(field, button, state));
  });

  function openDialog(field, opener, state) {
    if (state.isOpen) {
      return;
    }

    if (!state.modal) {
      createDialog(field, state);
    }

    state.lastFocused = document.activeElement;
    state.isOpen = true;
    state.bodyHadModalOpen = document.body.classList.contains('modal-open');
    state.backdrop = document.createElement('div');
    state.backdrop.className = 'modal-backdrop fade show';
    state.backdrop.addEventListener('click', () => closeDialog(state));

    document.body.appendChild(state.backdrop);
    document.body.classList.add('modal-open');

    state.modal.hidden = false;
    state.modal.style.display = 'block';
    state.modal.classList.add('show');
    state.modal.removeAttribute('aria-hidden');

    opener.setAttribute('aria-expanded', 'true');
    state.modal.dataset.openerId = opener.id || (opener.id = uniqueId('jtpf-opener'));

    state.search.value = '';
    state.customInput.value = '';
    renderList(field, state, '');

    window.setTimeout(() => {
      const current = state.list.querySelector('button[aria-current="true"]');

      if (current) {
        current.scrollIntoView({ block: 'nearest' });
      }

      state.search.focus();
      state.search.select();
    }, 0);
  }

  function closeDialog(state) {
    if (!state.isOpen || !state.modal) {
      return;
    }

    const opener = state.modal.dataset.openerId ? document.getElementById(state.modal.dataset.openerId) : null;

    state.isOpen = false;
    state.modal.classList.remove('show');
    state.modal.setAttribute('aria-hidden', 'true');
    state.modal.hidden = true;
    state.modal.style.display = 'none';

    if (!state.bodyHadModalOpen && !document.querySelector('.modal.show')) {
      document.body.classList.remove('modal-open');
    }

    state.bodyHadModalOpen = false;

    if (state.backdrop) {
      state.backdrop.remove();
      state.backdrop = null;
    }

    if (opener) {
      opener.setAttribute('aria-expanded', 'false');
    }

    const focusTarget = state.lastFocused && document.contains(state.lastFocused)
      ? state.lastFocused
      : opener;

    if (focusTarget && typeof focusTarget.focus === 'function') {
      focusTarget.focus();
    }
  }

  function createDialog(field, state) {
    const modalId = uniqueId('jtpf-modal');
    const titleId = uniqueId('jtpf-title');
    const descId = uniqueId('jtpf-desc');
    const searchId = uniqueId('jtpf-search');
    const statusId = uniqueId('jtpf-status');
    const listId = uniqueId('jtpf-list');
    const customId = uniqueId('jtpf-custom');

    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal fade';
    modal.tabIndex = -1;
    modal.hidden = true;
    modal.style.display = 'none';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', titleId);
    modal.setAttribute('aria-describedby', `${descId} ${statusId}`);
    modal.setAttribute('aria-hidden', 'true');

    const dialog = document.createElement('div');
    dialog.className = 'modal-dialog modal-lg modal-dialog-scrollable';

    const content = document.createElement('div');
    content.className = 'modal-content';

    const header = document.createElement('div');
    header.className = 'modal-header';

    const title = document.createElement('h3');
    title.id = titleId;
    title.className = 'modal-title fs-5';
    title.textContent = text('modalTitle', 'Select a module position');

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close';
    closeButton.setAttribute('aria-label', text('close', 'Close'));
    closeButton.addEventListener('click', () => closeDialog(state));

    header.append(title, closeButton);

    const body = document.createElement('div');
    body.className = 'modal-body';

    const bodyInner = document.createElement('div');
    bodyInner.className = 'p-3';

    const searchPanel = document.createElement('div');
    searchPanel.className = 'pb-3 mb-3 border-bottom';

    const description = document.createElement('p');
    description.id = descId;
    description.className = 'text-muted mb-3';
    description.textContent = text(
      'modalDescription',
      'Search positions grouped by template. Choose a position to fill the module position field.'
    );

    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'mb-0';

    const searchLabel = document.createElement('label');
    searchLabel.className = 'form-label';
    searchLabel.setAttribute('for', searchId);
    searchLabel.textContent = text('searchLabel', 'Search positions');

    const search = document.createElement('input');
    search.type = 'search';
    search.id = searchId;
    search.className = 'form-control';
    search.autocomplete = 'off';
    search.placeholder = text('searchPlaceholder', 'Type a template or position name');
    search.setAttribute('aria-controls', listId);
    search.setAttribute('aria-describedby', `${descId} ${statusId}`);

    const status = document.createElement('div');
    status.id = statusId;
    status.className = 'visually-hidden';
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');

    searchWrapper.append(searchLabel, search, status);
    searchPanel.append(description, searchWrapper);

    const list = document.createElement('div');
    list.id = listId;
    list.setAttribute('aria-label', text('modalTitle', 'Select a module position'));

    bodyInner.append(searchPanel, list);
    body.append(bodyInner);

    const footer = document.createElement('div');
    footer.className = 'modal-footer d-block';

    const customLabel = document.createElement('label');
    customLabel.className = 'form-label';
    customLabel.setAttribute('for', customId);
    customLabel.textContent = text('customLabel', 'Custom position');

    const customGroup = document.createElement('div');
    customGroup.className = 'input-group';

    const customInput = document.createElement('input');
    customInput.type = 'text';
    customInput.id = customId;
    customInput.className = 'form-control';
    customInput.placeholder = text('customPlaceholder', 'Example: sidebar-right');

    const customButton = document.createElement('button');
    customButton.type = 'button';
    customButton.className = 'btn btn-primary';
    customButton.textContent = text('useCustom', 'Use this value');

    const chooseCustom = () => {
      const value = customInput.value.trim();

      if (!value) {
        customInput.focus();
        return;
      }

      choosePosition(field, value, value, state);
    };

    customButton.addEventListener('click', chooseCustom);
    customInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        chooseCustom();
      }
    });

    customGroup.append(customInput, customButton);
    footer.append(customLabel, customGroup);

    content.append(header, body, footer);
    dialog.append(content);
    modal.append(dialog);
    document.body.append(modal);

    search.addEventListener('input', () => renderList(field, state, search.value));
    search.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        const first = getResultButtons(state)[0];

        if (first) {
          event.preventDefault();
          focusResult(first);
        }
      }
    });

    modal.addEventListener('keydown', (event) => handleDialogKeydown(event, state));

    state.modal = modal;
    state.search = search;
    state.list = list;
    state.status = status;
    state.customInput = customInput;
  }

  function renderList(field, state, searchTerm) {
    const query = normalise(searchTerm);
    const currentValue = getFieldValue(field);
    let count = 0;

    state.list.replaceChildren();

    (options.templates || []).forEach((template) => {
      const matchesTemplate = normalise(`${template.name} ${template.title}`).includes(query);
      const positions = (template.positions || []).filter((position) => {
        if (!query || matchesTemplate) {
          return true;
        }

        return normalise(`${position.value} ${position.label}`).includes(query);
      });

      if (!positions.length) {
        return;
      }

      const section = document.createElement('section');
      section.className = 'mb-4';

      const heading = document.createElement('h4');
      heading.className = 'h5 d-flex align-items-center gap-2 mb-2';
      heading.textContent = template.title || template.name;

      if (template.isDefault) {
        const badge = document.createElement('span');
        badge.className = 'badge bg-primary text-white';
        badge.textContent = text('defaultTemplate', 'Default');
        heading.appendChild(badge);
      }

      const group = document.createElement('div');
      group.className = 'list-group';
      group.setAttribute('role', 'group');
      group.setAttribute('aria-label', heading.textContent || template.name);

      positions.forEach((position) => {
        group.appendChild(createPositionButton(field, state, position, template, currentValue));
        count += 1;
      });

      section.append(heading, group);
      state.list.appendChild(section);
    });

    const customPositions = (options.customPositions || []).filter((position) => {
      if (!query) {
        return true;
      }

      return normalise(`${position.value} ${position.label}`).includes(query);
    });

    if (customPositions.length) {
      const section = document.createElement('section');
      section.className = 'mb-4';

      const heading = document.createElement('h4');
      heading.className = 'h5 mb-2';
      heading.textContent = text('customGroup', 'Used / custom positions');

      const group = document.createElement('div');
      group.className = 'list-group';
      group.setAttribute('role', 'group');
      group.setAttribute('aria-label', heading.textContent);

      customPositions.forEach((position) => {
        group.appendChild(createPositionButton(field, state, position, null, currentValue));
        count += 1;
      });

      section.append(heading, group);
      state.list.appendChild(section);
    }

    if (!count) {
      const empty = document.createElement('p');
      empty.className = 'alert alert-info mb-0';
      empty.textContent = text('noResults', 'No positions found.');
      state.list.appendChild(empty);
    }

    state.status.textContent = count === 1
      ? text('resultSingular', '1 result found')
      : text('resultPlural', '%s results found').replace('%s', String(count));
  }

  function createPositionButton(field, state, position, template, currentValue) {
    const value = String(position.value || '');
    const label = String(position.label || value);
    const used = Number(position.used || 0);
    const isCurrent = currentValue === value;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center gap-3';
    button.dataset.position = value;

    if (isCurrent) {
      button.classList.add('active');
      button.setAttribute('aria-current', 'true');
    }

    const labelWrapper = document.createElement('span');
    labelWrapper.className = 'text-start';

    const strong = document.createElement('strong');
    strong.textContent = value;
    labelWrapper.appendChild(strong);

    if (label !== value || template) {
      const meta = document.createElement('small');
      meta.className = isCurrent ? 'd-block text-white-50' : 'd-block text-muted';
      meta.textContent = template ? `${template.name}` : label;
      labelWrapper.appendChild(meta);
    }

    const badges = document.createElement('span');
    badges.className = 'd-inline-flex align-items-center gap-2 flex-shrink-0';

    if (isCurrent) {
      const currentBadge = document.createElement('span');
      currentBadge.className = 'badge bg-light text-dark';
      currentBadge.textContent = text('selected', 'Selected');
      badges.appendChild(currentBadge);
    }

    const usageBadge = document.createElement('span');
    usageBadge.className = used > 0 ? 'badge bg-success' : 'badge bg-secondary';
    usageBadge.textContent = getUsageText(used);
    badges.appendChild(usageBadge);

    button.append(labelWrapper, badges);

    const ariaParts = [
      text('ariaChoose', 'Choose position'),
      value,
    ];

    if (template) {
      ariaParts.push(template.title || template.name);
    }

    if (used > 0) {
      ariaParts.push(getUsageText(used));
    } else {
      ariaParts.push(text('unused', 'Unused'));
    }

    if (isCurrent) {
      ariaParts.push(text('currentValue', 'current value'));
    }

    button.setAttribute('aria-label', ariaParts.filter(Boolean).join(', '));

    button.addEventListener('click', () => choosePosition(field, value, value, state));
    button.addEventListener('keydown', (event) => handleResultKeydown(event, state));

    return button;
  }

  function getUsageText(used) {
    if (used <= 0) {
      return text('unused', 'Unused');
    }

    if (used === 1) {
      return text('usedBySingular', text('usedBy', '%s modules')).replace('%s', String(used));
    }

    return text('usedByPlural', text('usedBy', '%s modules')).replace('%s', String(used));
  }

  function choosePosition(field, value, label, state) {
    setFieldValue(field, value, label);
    closeDialog(state);
  }

  function getFieldValue(field) {
    return String(field.value || '').trim();
  }

  function setFieldValue(field, value, label) {
    const fancy = field.closest('joomla-field-fancy-select');
    let createdOption = false;

    if (field.tagName === 'SELECT') {
      let option = Array.from(field.options).find((item) => item.value === value);

      if (!option) {
        option = new Option(label || value, value, true, true);
        field.add(option);
        createdOption = true;
      }

      field.value = value;
    } else {
      field.value = value;
    }

    if (fancy && fancy.choicesInstance) {
      try {
        const choices = fancy.choicesInstance;

        if (createdOption && typeof choices.setChoices === 'function') {
          choices.setChoices([{ value, label: label || value, selected: false }], 'value', 'label', false);
        }

        if (typeof choices.removeActiveItems === 'function') {
          choices.removeActiveItems();
        }

        if (typeof choices.setChoiceByValue === 'function') {
          choices.setChoiceByValue(value);
        }
      } catch (error) {
        // The native field value is already updated. Ignore Choices integration errors.
      }
    }

    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function handleDialogKeydown(event, state) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDialog(state);
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusables = getFocusableElements(state.modal);

    if (!focusables.length) {
      event.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleResultKeydown(event, state) {
    const buttons = getResultButtons(state);
    const index = buttons.indexOf(event.currentTarget);

    if (index === -1) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusResult(buttons[(index + 1) % buttons.length]);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusResult(buttons[(index - 1 + buttons.length) % buttons.length]);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusResult(buttons[0]);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusResult(buttons[buttons.length - 1]);
      return;
    }

    if (event.key === 'Backspace' && event.currentTarget === buttons[0]) {
      state.search.focus();
    }
  }

  function focusResult(button) {
    if (!button) {
      return;
    }

    button.focus();
    button.scrollIntoView({ block: 'nearest' });
  }

  function getResultButtons(state) {
    return Array.from(state.list.querySelectorAll('button[data-position]'));
  }

  function getFocusableElements(root) {
    if (!root) {
      return [];
    }

    return Array.from(
      root.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => element.offsetParent !== null || element === document.activeElement);
  }
})();
