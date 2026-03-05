import { TimePeriod } from "./components/types";
import HistoricalDates from "./components/HistoricalDates";

const mockData: TimePeriod[] = [
  {
    id: 1,
    startYear: 2015,
    endYear: 2016,
    events: [
      {
        id: 1,
        year: 2015,
        description:
          "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
      {
        id: 2,
        year: 2016,
        description:
          "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
      },
    ],
  },
  {
    id: 2,
    startYear: 2016,
    endYear: 2017,
    events: [
      {
        id: 3,
        year: 2016,
        description:
          "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
      },
      {
        id: 4,
        year: 2017,
        description: 'Запуск миссии NASA "Юнона" для изучения Юпитера',
      },
    ],
  },
  {
    id: 3,
    startYear: 2017,
    endYear: 2018,
    events: [
      {
        id: 5,
        year: 2017,
        description: "Открытие экзопланеты в обитаемой зоне звезды TRAPPIST-1",
      },
      {
        id: 6,
        year: 2018,
        description: "Запуск телескопа James Webb",
      },
    ],
  },
  {
    id: 4,
    startYear: 2018,
    endYear: 2019,
    events: [
      {
        id: 7,
        year: 2018,
        description: "Посадка марсохода InSight на Марс",
      },
      {
        id: 8,
        year: 2019,
        description: "Первое фото черной дыры",
      },
    ],
  },
  {
    id: 5,
    startYear: 2019,
    endYear: 2020,
    events: [
      {
        id: 9,
        year: 2019,
        description: "Запуск миссии Artemis для возвращения на Луну",
      },
      {
        id: 10,
        year: 2020,
        description: "Запуск марсохода Perseverance",
      },
    ],
  },
  {
    id: 6,
    startYear: 2020,
    endYear: 2021,
    events: [
      {
        id: 11,
        year: 2020,
        description: "Возвращение образцов с астероида Бенну",
      },
      {
        id: 12,
        year: 2021,
        description: "Первый полет Ingenuity на Марсе",
      },
    ],
  },
];

function App() {
  return (
    <div className="app">
      <HistoricalDates periods={mockData} />
    </div>
  );
}

export default App;
