export const allocationTree = {
  name: "Bose Tree",
  elements: [
    {
      "clientname": "Bose",
      "planname": "Bose Corporation Employees’ Retirement Plan",
      "accountgrouptype": "G",
      "accountgroupid": "733094AB-70F2-48FC-B026-4A580704466E",
      "accountgroupname": "Composite",
      "accountgroupshortname": "RBCCOMP",
      "accountgroupperformanceenddate": null,
      "level": 2,
      "id": 2,
      "parent_object_id": "2728654E-489C-406E-90F6-6D1458449A6A",
      "as_of": "6/30/17",
      "policy_value": 100,
      "aa_model_benchmark": null,
      "actual_mv": null
    },
    {
      "clientname": "Bose",
      "planname": "Bose Corporation Employees’ Retirement Plan",
      "accountgrouptype": "G",
      "accountgroupid": "A254D892-4EB7-4B51-A103-25EFBD0A9FDB",
      "accountgroupname": "Total Equity",
      "accountgroupshortname": "RBC0102",
      "accountgroupperformanceenddate": null,
      "level": 3,
      "id": 3,
      "parent_object_id": "733094AB-70F2-48FC-B026-4A580704466E",
      "as_of": "6/30/17",
      "policy_value": 43,
      "aa_model_benchmark": null,
      "actual_mv": null
    },
  ]
};

export const selectedNode = {
  node: {
    clientname: 'Bose',
    planname: 'Bose Corporation Employees’ Retirement Plan',
    accountgrouptype: 'G',
    accountgroupid: '733094AB-70F2-48FC-B026-4A580704466E',
    accountgroupname: 'Composite',
    accountgroupshortname: 'RBCCOMP',
    accountgroupperformanceenddate: null,
    level: 2,
    id: 2,
    parent_object_id: '2728654E-489C-406E-90F6-6D1458449A6A',
    as_of: '6/30/17',
    policy_value: 100,
    aa_model_benchmark: null,
    actual_mv: null,
    title: 'Composite'
  },
  maxDepth: 1,
  treeIndex: 0,
  path: [0]
};

export const treeModel = {
  name: 'tree test',
  data: [
    {
      clientname: 'Bose',
      planname: 'Bose Corporation Employees’ Retirement Plan',
      accountgrouptype: 'G',
      accountgroupid: '733094AB-70F2-48FC-B026-4A580704466E',
      accountgroupname: 'Composite',
      accountgroupshortname: 'RBCCOMP',
      accountgroupperformanceenddate: null,
      level: 2,
      id: 2,
      parent_object_id: '2728654E-489C-406E-90F6-6D1458449A6A',
      as_of: '6/30/17',
      policy_value: 100,
      aa_model_benchmark: null,
      actual_mv: null,
      title: 'Composite',
      children: [],
    }
  ]
};

export const colorPickerInitialState = {
  displayColorPicker: false,
  selectedColor: '#002060',
  presetColors: [
    '#a0ac1b',
    '#4d4e54',
    '#eeece1',
    '#d0d68f',
    '#a0bdc0',
    '#993300',
    '#cc9900',
    '#557d81',
    '#da7d00',
    '#fce7b2',
    '#666635',
    '#feae0e',
    '#640000',
    '#002060',
  ],
};