import { Settings, GeneratingMethod, Stats } from './types';
import { getNewStats, getReRoll, calculateTotalModifier } from './stats';

const settings: Settings = {
  method: GeneratingMethod.FourD6DropLowest
};

let stats: Stats = {
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,
  totalModifier: 0
};

registerEventHandlers();
registerServiceWorker();

function registerEventHandlers() {
  const generateStatsButton = document.getElementById(
    'give_stats_button'
  ) as HTMLButtonElement;
  generateStatsButton?.addEventListener('click', statButtonClickHandler);

  const changeGeneratorMethodSelector = document.getElementById(
    'method_select'
  ) as HTMLSelectElement;
  changeGeneratorMethodSelector?.addEventListener(
    'change',
    methodChangeHandler
  );
}

function statButtonClickHandler() {
  stats = getNewStats(settings);

  updateElementWithValue('str', stats.str.toString());
  updateElementWithValue('dex', stats.dex.toString());
  updateElementWithValue('con', stats.con.toString());
  updateElementWithValue('int', stats.int.toString());
  updateElementWithValue('wis', stats.wis.toString());
  updateElementWithValue('cha', stats.cha.toString());
  updateElementWithValue('total_mod', stats.totalModifier.toString());

  makeRerollVisible();
}

function updateElementWithValue(
  identifier: string,
  value: string,
  append: boolean = false
) {
  const element = document.getElementById(identifier);

  if (!element) {
    return;
  }

  element.innerText = append ? `${element.innerText}${value}` : value;
}

function makeRerollVisible() {
  const reRollButtonList = Array.from(
    document.querySelectorAll('.re_roll_button')
  ) as HTMLButtonElement[];

  reRollButtonList.forEach(button => {
    toggleElementVisibility(button, true);
    button.addEventListener(
      'click',
      reRollClickHandler.bind(null, reRollButtonList)
    );
  });
}

function reRollClickHandler(buttonList: HTMLButtonElement[], event: Event) {
  buttonList.forEach(button => {
    toggleElementVisibility(button, false);
  });

  const currentTarget = event.currentTarget as HTMLButtonElement;

  const reRoll = getReRoll(settings);

  const reRolledStatName = currentTarget?.dataset?.stat as string;

  const newStats = { ...stats, [reRolledStatName]: reRoll };

  newStats.totalModifier = calculateTotalModifier(newStats);

  updateElementWithValue(
    reRolledStatName,
    `${stats[reRolledStatName]} / ${newStats[reRolledStatName]}`
  );

  updateElementWithValue(
    'total_mod',
    `  ${stats.totalModifier} / ${newStats.totalModifier}`
  );
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

function methodChangeHandler(event: Event) {
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

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      await navigator.serviceWorker.register('./service_worker.ts');
    });
  }
}
