import React from 'react';
import { ContextMenu, Item } from 'react-contexify';

const NodeMenu = ({ addAbove, addSibling, addBelow, deleteNode, deleteBelow }) => (
  <ContextMenu id='menu_id'>
    <Item  onClick={addAbove}>
      Add Above
    </Item>
    <Item  onClick={addSibling}>
      Add Sibling
    </Item>
    <Item onClick={addBelow}>
      Add Below
    </Item>
    <Item onClick={deleteNode}>
      Delete Node
    </Item>
    <Item onClick={deleteBelow}>
      Delete Below
    </Item>
  </ContextMenu>
);

export default NodeMenu;