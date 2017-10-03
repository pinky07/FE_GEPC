export const columns = [
  {
    field: 'accountgroupname',
    headerName: 'Node Name',
    width: 350,
  },
  {
    field: 'assetCat',
    headerName: 'Asset Category',
    width: 150,
  },
  {
    field: 'alias',
    headerName: 'Asset Class Alias',
    width: 150,
  },
  {
    field: 'aamb',
    headerName: 'AAMB',
    width: 150,
  },
  {
    field: 'policy_value',
    headerName: 'Policy',
    width: 150,
  },
  {
    field: 'actual_mv',
    headerName: 'Value',
    width: 150,
  },
  {
    field: 'mixA',
    headerName: 'Mix A',
    width: 150,
    editable: true,
  },
  {
    field: 'mixB',
    headerName: 'Mix B',
    width: 150,
    editable: true,
  },
  {
    field: 'mixC',
    headerName: 'Mix C',
    width: 150,
    editable: true,
  }
];

const nodeNameComparator = (name1, name2) => {
  return -1;
}