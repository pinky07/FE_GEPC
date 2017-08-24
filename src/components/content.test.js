import React from 'react';
import { shallow  } from 'enzyme';
import Content from './content';

describe('content component', () => {
  let content = shallow (<Content/>);

  it ('renders the allocation tree', () => {
    expect(content.find('Connect(AllocationTree)').exists()).toBe(true);
  });

  it ('renders the allocation grid', () => {
    expect(content.find('Connect(AllocationGrid)').exists()).toBe(true);
  });
});