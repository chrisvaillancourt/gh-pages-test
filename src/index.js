'use strict';
import './styles/normalize.css';
import './styles/style.css';
require([
  'esri/Map',
  'esri/views/MapView',
  'esri/layers/VectorTileLayer',
  'esri/Basemap',
  'esri/layers/FeatureLayer',
  'esri/widgets/Legend',
  'esri/widgets/Home',
  'esri/widgets/Expand',
  'esri/widgets/Search',
], function (
  Map,
  MapView,
  VectorTileLayer,
  Basemap,
  FeatureLayer,
  Legend,
  Home,
  Expand,
  Search
) {
  const vectorBaseLayer = new VectorTileLayer({
    url: `https://www.arcgis.com/sharing/rest/content/items/2afe5b807fa74006be6363fd243ffb30/resources/styles/root.json`,
  });
  const vectorBaseReference = new VectorTileLayer({
    url: `https://www.arcgis.com/sharing/rest/content/items/ba52238d338745b1a355407ec9df6768/resources/styles/root.json`,
    opacity: 0.7,
  });
  const vectorDetailLayer = new VectorTileLayer({
    url: `https://www.arcgis.com/sharing/rest/content/items/97fa1365da1e43eabb90d0364326bc2d/resources/styles/root.json`,
    opacity: 0.35,
  });

  const basemap = new Basemap({
    baseLayers: [vectorBaseLayer, vectorDetailLayer],
    referenceLayers: [vectorBaseReference],
  });

  const covidRenderer = {
    type: 'simple',
    symbol: {
      type: 'simple-fill',
      outline: {
        color: [145, 145, 145, 0.15],
        width: '0.5px',
      },
    },
    label: 'Census Tract',
    visualVariables: [
      {
        type: 'color',
        field: 'Covid_19_Vulnerability_Index',
        legendOptions: {
          title: 'COVID-19 Vulnerability Index',
        },
        stops: [
          {
            value: '24',
            color: '#411b6d',
            label: '24 (low)',
          },
          {
            value: '43',
            color: '#fffee6',
            label: '43 (avg)',
          },
          {
            value: '62',
            color: '#990b0b',
            label: '62 (high)',
          },
        ],
      },
    ],
  };
  const cityCovidRenderer = {
    type: 'simple',
    symbol: {
      type: 'simple-marker',
      outline: {
        color: [255, 255, 255, 0.25],
        width: '0.5px',
      },
    },
    label: 'City',
    visualVariables: [
      {
        type: 'color',
        field: 'USER_Covid_19_Vulnerability_Ind',
        legendOptions: {
          title: 'COVID-19 Vulnerability Index',
        },
        stops: [
          {
            value: '31',
            color: '#411b6d',
            label: '31 (low)',
          },
          {
            value: '42.5',
            color: '#fffee6',
            label: '43 (avg)',
          },
          {
            value: '54',
            color: '#990b0b',
            label: '54 (high)',
          },
        ],
      },
      {
        type: 'size',
        field: 'USER_Total_Population',
        minDataValue: 42513,
        maxDataValue: 1000000,
        minSize: {
          type: 'size',
          valueExpression: '$view.scale',
          stops: [
            {
              value: 2311162,
              size: 8,
            },
            {
              value: 4622324,
              size: 8,
            },
            {
              value: 9244648,
              size: 6,
            },
            {
              value: 18489297,
              size: 4,
            },
          ],
        },
        maxSize: {
          type: 'size',
          valueExpression: '$view.scale',
          stops: [
            {
              value: 2311162,
              size: 80,
            },
            {
              value: 4622324,
              size: 70,
            },
            {
              value: 9244648,
              size: 60,
            },
            {
              value: 18489297,
              size: 40,
            },
          ],
        },
      },
    ],
  };

  const infrastructureRenderer = {
    type: 'simple',
    symbol: {
      type: 'simple-fill',
      outline: {
        color: [145, 145, 145, 0.15],
        width: '0.5px',
      },
    },
    label: 'Census Tract',
    visualVariables: [
      {
        type: 'color',
        field: 'Health_Infrastructure',
        stops: [
          {
            value: '30',
            color: '#411b6d',
            label: '30 (low)',
          },
          {
            value: '50',
            color: '#fffee6',
            label: '50 (avg)',
          },
          {
            value: '71',
            color: '#990b0b',
            label: '71 (high)',
          },
        ],
      },
    ],
  };
  const cityInfrastructureRenderer = {
    type: 'simple',
    symbol: {
      type: 'simple-marker',
      outline: {
        color: [255, 255, 255, 0.25],
        width: '0.5px',
      },
    },
    label: 'City',
    visualVariables: [
      {
        type: 'color',
        field: 'USER_Health_Infrastruture_Vulne',
        stops: [
          {
            value: '37',
            color: '#411b6d',
            label: '37 (low)',
          },
          {
            value: '54.9',
            color: '#fffee6',
            label: '55 (avg)',
          },
          {
            value: '73',
            color: '#990b0b',
            label: '73 (high)',
          },
        ],
      },
      {
        type: 'size',
        field: 'USER_Total_Population',
        minDataValue: 42513,
        maxDataValue: 1000000,
        minSize: {
          type: 'size',
          valueExpression: '$view.scale',
          stops: [
            {
              value: 2311162,
              size: 8,
            },
            {
              value: 4622324,
              size: 8,
            },
            {
              value: 9244648,
              size: 6,
            },
            {
              value: 18489297,
              size: 4,
            },
          ],
        },
        maxSize: {
          type: 'size',
          valueExpression: '$view.scale',
          stops: [
            {
              value: 2311162,
              size: 80,
            },
            {
              value: 4622324,
              size: 70,
            },
            {
              value: 9244648,
              size: 60,
            },
            {
              value: 18489297,
              size: 40,
            },
          ],
        },
      },
    ],
  };

  const demographicsRenderer = {
    type: 'simple',
    symbol: {
      type: 'simple-fill',
      outline: {
        color: [145, 145, 145, 0.15],
        width: '0.5px',
      },
    },
    label: 'Census Tract',
    visualVariables: [
      {
        type: 'color',
        field: 'Population_Demographics',
        stops: [
          {
            value: '12',
            color: '#411b6d',
            label: '12 (low)',
          },
          {
            value: '30.5',
            color: '#fffee6',
            label: '30.5 (avg)',
          },
          {
            value: '48',
            color: '#990b0b',
            label: '48 (high)',
          },
        ],
      },
    ],
  };

  const cityDemographicsRenderer = {
    type: 'simple',
    symbol: {
      type: 'simple-marker',
      outline: {
        color: [255, 255, 255, 0.25],
        width: '0.5px',
      },
    },
    label: 'City',
    visualVariables: [
      {
        type: 'color',
        field: 'USER_Population_Demographics_Vu',
        stops: [
          {
            value: '23',
            color: '#411b6d',
            label: '23 (low)',
          },
          {
            value: '31.2',
            color: '#fffee6',
            label: '31 (avg)',
          },
          {
            value: '39',
            color: '#990b0b',
            label: '39 (high)',
          },
        ],
      },
      {
        type: 'size',
        field: 'USER_Total_Population',
        minDataValue: 42513,
        maxDataValue: 1000000,
        minSize: {
          type: 'size',
          valueExpression: '$view.scale',
          stops: [
            {
              value: 2311162,
              size: 8,
            },
            {
              value: 4622324,
              size: 8,
            },
            {
              value: 9244648,
              size: 6,
            },
            {
              value: 18489297,
              size: 4,
            },
          ],
        },
        maxSize: {
          type: 'size',
          valueExpression: '$view.scale',
          stops: [
            {
              value: 2311162,
              size: 80,
            },
            {
              value: 4622324,
              size: 70,
            },
            {
              value: 9244648,
              size: 60,
            },
            {
              value: 18489297,
              size: 40,
            },
          ],
        },
      },
    ],
  };

  const issuesRenderer = {
    type: 'simple',
    symbol: {
      type: 'simple-fill',
      outline: {
        color: [145, 145, 145, 0.15],
        width: '0.5px',
      },
    },
    label: 'Census Tract',
    visualVariables: [
      {
        type: 'color',
        field: 'Underlying_Health_Issues',
        stops: [
          {
            value: '22',
            color: '#411b6d',
            label: '22 (low)',
          },
          {
            value: '41.5',
            color: '#fffee6',
            label: '41.5 (avg)',
          },
          {
            value: '61',
            color: '#990b0b',
            label: '61 (high)',
          },
        ],
      },
    ],
  };

  const cityIssuesRenderer = {
    type: 'simple',
    symbol: {
      type: 'simple-marker',
      outline: {
        color: [255, 255, 255, 0.25],
        width: '0.5px',
      },
    },
    label: 'City',
    visualVariables: [
      {
        type: 'color',
        field: 'USER_Underlying_Health_Vulnerab',
        stops: [
          {
            value: '28',
            color: '#411b6d',
            label: '28 (low)',
          },
          {
            value: '40.2',
            color: '#fffee6',
            label: '40 (avg)',
          },
          {
            value: '52',
            color: '#990b0b',
            label: '52 (high)',
          },
        ],
      },
      {
        type: 'size',
        field: 'USER_Total_Population',
        minDataValue: 42513,
        maxDataValue: 1000000,
        minSize: {
          type: 'size',
          valueExpression: '$view.scale',
          stops: [
            {
              value: 2311162,
              size: 8,
            },
            {
              value: 4622324,
              size: 8,
            },
            {
              value: 9244648,
              size: 6,
            },
            {
              value: 18489297,
              size: 4,
            },
          ],
        },
        maxSize: {
          type: 'size',
          valueExpression: '$view.scale',
          stops: [
            {
              value: 2311162,
              size: 80,
            },
            {
              value: 4622324,
              size: 70,
            },
            {
              value: 9244648,
              size: 60,
            },
            {
              value: 18489297,
              size: 40,
            },
          ],
        },
      },
    ],
  };

  const covidPopupTemplate = {
    title: '{name}: Tract {FIPS_text}',
    content: `
      <p>The COVID-19 vulnerability index for this area is <strong>{Covid_19_Vulnerability_Index}</strong>.</p>
      <p>Indicators impacting this value include:</p>
      <ul>
        <li>Population Demographics Index: <strong>{Population_Demographics}</strong></li>
        <li>Underlying Health Issues Index: <strong>{Underlying_Health_Issues}</strong></li>
        <li>Health infrastructure Index: <strong>{Health_Infrastructure}</strong></li>
      </ul>
      `,
    fieldInfos: [
      {
        fieldName: 'Covid_19_Vulnerability_Index',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Population_Demographics',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Underlying_Health_Issues',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Health_Infrastructure',
        format: {
          places: 0,
        },
      },
    ],
  };

  const cityCovidPopupTemplate = {
    title: '{Match_addr}',
    content: `
      <p>The aggregate COVID-19 vulnerability index for this city's {USER_Total_Population} residents is <strong>{USER_Covid_19_Vulnerability_Ind}</strong>.</p>
      <p>Other aggregate indicators impacting this value include:</p>
      <ul>
        <li>Population Demographics Index: <strong>{USER_Population_Demographics_Vu}</strong></li>
        <li>Underlying Health Issues Index: <strong>{USER_Underlying_Health_Vulnerab}</strong></li>
        <li>Health infrastructure Index: <strong>{USER_Health_Infrastruture_Vulne}</strong></li>
      </ul>
      `,
    fieldInfos: [
      {
        fieldName: 'USER_Covid_19_Vulnerability_Ind',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'USER_Population_Demographics_Vu',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'USER_Underlying_Health_Vulnerab',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'USER_Health_Infrastruture_Vulne',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'USER_Total_Population',
        format: {
          places: 0,
          digitSeparator: true,
        },
      },
    ],
  };

  const infrastructurePopupTemplate = {
    title: '{name}: Tract {FIPS_text}',
    content: `
      <p>The health infrastructure vulnerability index for this area is <strong>{Health_Infrastructure}</strong>.</p>
      <p>Indicators impacting this value include:</p>
      <ul>
        <li>Pop. 18-64 with no health insurance: <strong>{Percentage_of_pop__18_64_with_n}%</strong></li>
        <li>Hospital beds per 1,000 pop. within 25km radius: <strong>{Number_of_hospital_beds_per_1_0}</strong></li>
        <li>Urgent care facilities per 1,000 pop. within 25km radius: <strong>{Number_of_urgent_care_facilitie}</strong></li>
        <li>Ratio of the population to primary care physicians: <strong>{Ratio_of_the_population_to_prim}</strong></li>
      </ul>
      `,
    fieldInfos: [
      {
        fieldName: 'Health_Infrastructure',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Percentage_of_pop__18_64_with_n',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Number_of_hospital_beds_per_1_0',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Number_of_urgent_care_facilitie',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Ratio_of_the_population_to_prim',
        format: {
          places: 0,
        },
      },
    ],
  };

  const cityInfrastructurePopupTemplate = {
    title: '{Match_addr}',
    content: `
      <p>The health infrastructure vulnerability index for this this city's {USER_Total_Population} residents is <strong>{USER_Health_Infrastruture_Vulne}</strong>.</p>
      `,
    fieldInfos: [
      {
        fieldName: 'USER_Health_Infrastruture_Vulne',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'USER_Total_Population',
        format: {
          places: 0,
          digitSeparator: true,
        },
      },
    ],
  };

  const demographicsPopupTemplate = {
    title: '{name}: Tract {FIPS_text}',
    content: `
      <p>The population demographics vulnerability index for this area is <strong>{Population_Demographics}</strong>.</p>
      <p>Indicators impacting this value include:</p>
      <ul>
        <li>Population aged 80+: <strong>{Population_aged_80___percentage}%</strong></li>
        <li>Population aged 70-79: <strong>{Population_aged_70_79__percenta}%</strong></li>
        <li>Population aged 60-69: <strong>{pop_aged_60_69_p}%</strong></li>
        <li>Population density per 10,000: <strong>{Population_density_per_10_000}</strong></li>
        <li>Nursing home population per 1,000: <strong>{Nursing_home_population_per_1_0}</strong></li>
        <li>Prison population per 1,000: <strong>{Prison_population_per_1_000}</strong></li>
      </ul>
      `,
    fieldInfos: [
      {
        fieldName: 'Population_Demographics',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Population_aged_80___percentage',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Population_aged_70_79__percenta',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'pop_aged_60_69_p',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Population_density_per_10_000',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Nursing_home_population_per_1_0',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Prison_population_per_1_000',
        format: {
          places: 0,
        },
      },
    ],
  };

  const cityDemographicsPopupTemplate = {
    title: '{Match_addr}',
    content: `
      <p>The population demographics vulnerability index for this this city's {USER_Total_Population} residents is <strong>{USER_Population_Demographics_Vu}</strong>.</p>
      `,
    fieldInfos: [
      {
        fieldName: 'USER_Population_Demographics_Vu',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'USER_Total_Population',
        format: {
          places: 0,
          digitSeparator: true,
        },
      },
    ],
  };

  const issuesPopupTemplate = {
    title: '{name}: Tract {FIPS_text}',
    content: `<p>The underlying health issues vulnerability index for this area is <strong>{Underlying_Health_Issues}</strong>.</p>
      <p>Indicators impacting this value include:</p>
      <ul>
        <li>Adult high blood pressure prevalence: <strong>{High_blood_pressure_prevalence_}</strong></li>
        <li>Adult cancer prevalence: <strong>{Cancer_prevalence_in_adults_18_}</strong></li>
        <li>Adult asthma prevalence: <strong>{Asthma_prevalence_among_adults_}</strong></li>
        <li>Adult coronary heart disease prevalence: <strong>{Coronary_heart_disease_prevalen}</strong></li>
        <li>Adult COPD prevalence: <strong>{COPD_prevalence_among_adults_18}</strong></li>
        <li>Adult active smoking: <strong>{Active_smoking_in_adults_18_}</strong></li>
        <li>Adult diabetes prevalence: <strong>{Diabetes_prevalence_in_adults_1}</strong></li>
      </ul>`,
    fieldInfos: [
      {
        fieldName: 'Underlying_Health_Issues',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'High_blood_pressure_prevalence_',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Cancer_prevalence_in_adults_18_',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Asthma_prevalence_among_adults_',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Coronary_heart_disease_prevalen',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'COPD_prevalence_among_adults_18',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Active_smoking_in_adults_18_',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'Diabetes_prevalence_in_adults_1',
        format: {
          places: 0,
        },
      },
    ],
  };

  const cityIssuesPopupTemplate = {
    title: '{Match_addr}',
    content: `
      <p>The underlying health issues vulnerability index for this this city's {USER_Total_Population} residents is <strong>{USER_Underlying_Health_Vulnerab}</strong>.</p>
      `,
    fieldInfos: [
      {
        fieldName: 'USER_Underlying_Health_Vulnerab',
        format: {
          places: 0,
        },
      },
      {
        fieldName: 'USER_Total_Population',
        format: {
          places: 0,
          digitSeparator: true,
        },
      },
    ],
  };

  const tracts = new FeatureLayer({
    url:
      'https://services7.arcgis.com/Fnhc04BJL93uqCjd/ArcGIS/rest/services/covid_vulnerability_v3/FeatureServer/0',
    renderer: covidRenderer,
    popupEnabled: true,
    popupTemplate: covidPopupTemplate,
    title: 'Census Tract',
    maxScale: 0,
    minScale: 1161488,
  });

  const cities = new FeatureLayer({
    url:
      'https://services7.arcgis.com/Fnhc04BJL93uqCjd/ArcGIS/rest/services/covid_19_vulnerability_index_city_aggregate_v1/FeatureServer/0',
    renderer: cityCovidRenderer,
    popupEnabled: true,
    popupTemplate: cityCovidPopupTemplate,
    title: 'City',
    maxScale: 2261586,
    minScale: 0,
  });

  const map = new Map({
    basemap,
    layers: [cities, tracts],
  });
  const view = new MapView({
    container: 'viewDiv',
    map,
    center: [-99.74405, 38.1374],
    zoom: 3,
  });
  view.when(() => {
    const homeWidget = new Home({
      view,
    });
    const legend = new Legend({
      view,
      container: document.createElement('div'),
    });

    const expandLegend = new Expand({
      view,
      content: legend,
      expanded: true,
      expandIconClass: 'esri-icon-key',
    });
    const search = new Search({
      view,
    });

    const inputOptions = [
      {
        id: 'covid-index',
        label: 'COVID-19 Vulnerability Index',
        value: 'covid',
      },
      {
        id: 'health-infrastructure',
        label: 'Health Infrastructure Index',
        value: 'infrastructure',
      },
      {
        id: 'population-demographics',
        label: 'Population Demographics Index',
        value: 'demographics',
      },
      {
        id: 'health-issues',
        label: 'Underlying Health Issues Index',
        value: 'issues',
      },
    ];

    const optionsFrag = createInput(inputOptions);
    const div = document.createElement('div');
    div.classList.add('esri-widget', 'option');

    div.appendChild(optionsFrag);
    view.ui.add(div, 'top-right');
    view.ui.add([homeWidget, expandLegend], 'top-left');
    view.ui.add(search, 'bottom-right');
  });

  function changeSelection(e) {
    if (e.target.name != 'options') return;
    const {
      target: { value }, // value comes from HTML value
    } = e;
    switch (value) {
      case 'covid':
        tracts.renderer = covidRenderer;
        cities.renderer = cityCovidRenderer;
        tracts.popupTemplate = covidPopupTemplate;
        cities.popupTemplate = cityCovidPopupTemplate;

        break;
      case 'infrastructure':
        tracts.renderer = infrastructureRenderer;
        cities.renderer = cityInfrastructureRenderer;
        tracts.popupTemplate = infrastructurePopupTemplate;
        cities.popupTemplate = cityInfrastructurePopupTemplate;

        break;
      case 'demographics':
        tracts.renderer = demographicsRenderer;
        cities.renderer = cityDemographicsRenderer;
        tracts.popupTemplate = demographicsPopupTemplate;
        cities.popupTemplate = cityDemographicsPopupTemplate;

        break;
      case 'issues':
        tracts.renderer = issuesRenderer;
        cities.renderer = cityIssuesRenderer;
        tracts.popupTemplate = issuesPopupTemplate;
        cities.popupTemplate = cityIssuesPopupTemplate;
        break;
      default:
        tracts.renderer = covidRenderer;
        cities.renderer = cityCovidRenderer;
        tracts.popupTemplate = covidPopupTemplate;
        cities.popupTemplate = cityCovidPopupTemplate;
    }
  }
  document.addEventListener('change', changeSelection, false);

  function createInput(options) {
    const frag = document.createDocumentFragment();
    const p = document.createElement('p');
    p.textContent = 'Select Map Category';
    p.classList.add('p');
    frag.appendChild(p);
    options.forEach((option) => {
      const { id, label, value } = option;
      const div = document.createElement('div');
      const inputLabel = document.createElement('label');
      const input = document.createElement('input');
      inputLabel.classList.add('label');
      inputLabel.setAttribute('for', id);
      inputLabel.textContent = label;
      input.setAttribute('type', 'radio');
      input.setAttribute('name', 'options');
      input.setAttribute('id', id);
      input.setAttribute('value', value);
      if (value == 'covid') {
        input.setAttribute('checked', '');
      }
      div.appendChild(input);
      div.appendChild(inputLabel);
      frag.appendChild(div);
    });
    return frag;
  }
});
