import { Settings, GeneratingMethod } from './types';
import { getNewStats, getReRoll } from './stats';

const settings: Settings = {
  method: GeneratingMethod.FourD6DropLowest
};

registerEventHandlers();
registerServiceWorker();

function registerEventHandlers() {
  const generateStatsButton = document.getElementById(
    'give_stats_button'
  ) as HTMLButtonElement;
  generateStatsButton?.addEventListener('click', generateStatsButtonHandler);

  const changeGeneratorMethodSelector = document.getElementById(
    'method_select'
  ) as HTMLSelectElement;
  changeGeneratorMethodSelector?.addEventListener('change', handleMethodChange);
}

function generateStatsButtonHandler() {
  const stats = getNewStats(settings);

  updateElementWithValue('str', stats.str.toString());
  updateElementWithValue('dex', stats.dex.toString());
  updateElementWithValue('con', stats.con.toString());
  updateElementWithValue('int', stats.int.toString());
  updateElementWithValue('wis', stats.wis.toString());
  updateElementWithValue('cha', stats.cha.toString());
  updateElementWithValue('total_mod', stats.totalModifier.toString());

  makeRerollVisible();
}

function updateElementWithValue(identifier: string, value: string) {
  const element = document.getElementById(identifier);

  if (!element) {
    return;
  }

  element.innerText = value;
}

function makeRerollVisible() {
  const rerollSectionElement = document.querySelector(
    'section.re_roll'
  ) as HTMLElement;

  if (!rerollSectionElement) {
    return;
  }

  const reRollButton = rerollSectionElement.querySelector(
    '#re_roll_button'
  ) as HTMLButtonElement;

  if (!reRollButton || !reRollButton.parentElement) {
    return;
  }

  reRollButton.addEventListener('click', handleRerollClick);

  const reRollElement = document.getElementById('re_roll') as HTMLSpanElement;

  toggleElementVisibility(reRollButton, true);
  toggleElementVisibility(reRollElement.parentElement, false);
}

function handleMethodChange(event: Event) {
  const currentTarget = event.currentTarget as HTMLSelectElement;

  switch (currentTarget?.value) {
    case '4D6DropLowest': {
      settings.method = GeneratingMethod.FourD6DropLowest;
      return;
    }

    case '4D6DropHighest': {
      settings.method = GeneratingMethod.FourD6DropHighest;
      return;
    }

    case 'D20': {
      settings.method = GeneratingMethod.D20;
      return;
    }

    default:
      return;
  }
}

function handleRerollClick(event: Event) {
  const currentTarget = event.currentTarget as HTMLButtonElement;

  toggleElementVisibility(currentTarget, false);

  const reRollElement = document.getElementById('re_roll') as HTMLSpanElement;

  if (!reRollElement) {
    return;
  }

  const reRoll = getReRoll(settings);

  reRollElement.innerText = reRoll.toString();
  toggleElementVisibility(reRollElement.parentElement, true);
}

function toggleElementVisibility(
  element: HTMLElement | null,
  visible: boolean
) {
  if (!element) {
    return;
  }

  if (visible) {
    element.style.visibility = 'visible';
  } else {
    element.style.visibility = 'hidden';
  }
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      await navigator.serviceWorker.register('./service_worker.ts');
    });
  }
}
