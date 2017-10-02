export const sharedReducerDefaultState = {
  assetsAllocation: {
    name: '',
    mixes: [],
    elements: [],
    hasGrid: false,
  },
  isLoading: false,
};

export const assetsAllocation = {
  name: 'Test',
  mixes: [],
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
  ],
  hasGrid: false,
}