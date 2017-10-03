import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isDescendant } from 'react-sortable-tree';
import Constants from '../../services/constants';
import { connect } from 'react-redux';
import { toggleNodeAtPath } from '../../actions';

class TreeNodeRenderer extends Component {

  toggleNodeOnGrid = event => {
    const { node, path } = this.props;
    this.props.toggleNodeAtPath({ ...node, showOnGrid: event.target.checked }, path);
  };

  renderCheckbox = () => {
    return this.props.treeIndex !== 0 ? <input type="checkbox" onChange={this.toggleNodeOnGrid}/> : null;
  };

  render() { 
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      title,
      subtitle,
      draggedNode,
      path,
      treeIndex,
      isSearchMatch,
      isSearchFocus,
      buttons,
      className,
      style,
      didDrop,
      isOver, // Not needed, but preserved for other renderers
      parentNode, // Needed for dndManager
      toggleNodeAtPath,
      ...otherProps
    } = this.props;
    
    delete otherProps.startDrag;
    delete otherProps.endDrag;

    const nodeTitle = title || node.title;
    const nodeSubtitle = subtitle || node.subtitle;

    let handle;
    if (canDrag) {
      if (typeof node.children === 'function' && node.expanded) {
        // Show a loading symbol on the handle when the children are expanded
        //  and yet still defined by a function (a callback to fetch the children)
        handle = (
          <div className="loadingHandle">
            <div className="loadingCircle">
              <div className="loadingCirclePoint" />
              <div className="loadingCirclePoint" />
              <div className="loadingCirclePoint" />
              <div className="loadingCirclePoint" />
              <div className="loadingCirclePoint" />
              <div className="loadingCirclePoint" />
              <div className="loadingCirclePoint" />
              <div className="loadingCirclePoint" />
              <div className="loadingCirclePoint" />
              <div className="loadingCirclePoint" />
              <div className="loadingCirclePoint" />
              <div className="loadingCirclePoint" />
            </div>
          </div>
        );
      } else {
        // Show the handle used to initiate a drag-and-drop
        handle = connectDragSource(<div className="moveHandle" />, {
          dropEffect: 'copy',
        });
      }
    }

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;

    return (
      <div style={{ height: '100%' }} {...otherProps}>
        {toggleChildrenVisibility &&
        node.children &&
        node.children.length > 0 &&
        <div>
          <button
            type="button"
            aria-label={node.expanded ? 'Collapse' : 'Expand'}
            className={
                node.expanded ? 'collapseButton' : 'expandButton'
              }
            style={{ left: -0.5 * scaffoldBlockPxWidth }}
            onClick={() =>
                toggleChildrenVisibility({
                  node,
                  path,
                  treeIndex,
                })}
          />

          {node.expanded &&
          !isDragging &&
          <div
            style={{ width: scaffoldBlockPxWidth }}
            className="lineChildren"
          />}
        </div>}

        <div className="rowWrapper">
          {/* Set the row preview to be used during drag and drop */}
          {connectDragPreview(
            <div
              className={
                'row ' +
                (isLandingPadActive ? 'rowLandingPad ' : '') +
                (isLandingPadActive && !canDrop
                  ? 'rowCancelPad '
                  : '') +
                (isSearchMatch ? 'rowSearchMatch ' : '') +
                (isSearchFocus ? 'rowSearchFocus ' : '') +
                (className ? ` ${className}` : '')
              }
              style={{
                opacity: isDraggedDescendant ? 0.5 : 1,
                ...style,
              }}
            >
              {handle}

              <div
                className={
                  'rowContents ' +
                  (!canDrag ? 'rowContentsDragDisabled' : '')
                }
              >
                <div className="rowLabel">
                  {this.renderCheckbox()}
                  <span
                    className={
                      'rowTitle ' +
                      (node.subtitle ? 'rowTitleWithSubtitle' : '')
                    }
                    style={{ color: node.colorAssignment || Constants.DEFAULT_COLOR_ASSIGNMENT }}
                  >
                    {typeof nodeTitle === 'function'
                      ? nodeTitle({
                      node,
                      path,
                      treeIndex,
                    })
                      : nodeTitle}
                  </span>

                  {nodeSubtitle &&
                  <span className="rowSubtitle">
                      {typeof nodeSubtitle === 'function'
                        ? nodeSubtitle({
                        node,
                        path,
                        treeIndex,
                      })
                        : nodeSubtitle}
                    </span>}
                </div>

                <div className="rowToolbar">
                  {buttons.map((btn, index) =>
                    <div
                      key={index} // eslint-disable-line react/no-array-index-key
                      className="toolbarButton"
                    >
                      {btn}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

TreeNodeRenderer.defaultProps = {
  isSearchMatch: false,
  isSearchFocus: false,
  canDrag: false,
  toggleChildrenVisibility: null,
  buttons: [],
  className: '',
  style: {},
  parentNode: null,
  draggedNode: null,
  canDrop: false,
  title: null,
  subtitle: null,
};

TreeNodeRenderer.propTypes = {
  node: PropTypes.shape({}).isRequired,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  subtitle: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  treeIndex: PropTypes.number.isRequired,
  isSearchMatch: PropTypes.bool,
  isSearchFocus: PropTypes.bool,
  canDrag: PropTypes.bool,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  toggleChildrenVisibility: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
  style: PropTypes.shape({}),

  // Drag and drop API functions
  // Drag source
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  parentNode: PropTypes.shape({}), // Needed for dndManager
  isDragging: PropTypes.bool.isRequired,
  didDrop: PropTypes.bool.isRequired,
  draggedNode: PropTypes.shape({}),
  // Drop target
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,
};

export default connect( null, { toggleNodeAtPath, } )(TreeNodeRenderer);

