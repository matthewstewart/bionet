import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import shortid from 'shortid';
import './GridSmall.scss';


class Grid extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.$('[data-toggle="tooltip"]').tooltip();
  }  
  
  componentDidUpdate() {
    window.$('[data-toggle="tooltip"]').tooltip();
  }


  render() {
    const newItemLocations = this.props.newItemLocations || [];
    const record = this.props.record || null;
    const gridContainerStyles = {
      'gridTemplateColumns': record ? `repeat(${record.columns}, 1fr)` : '1fr',
      'gridTemplateRows': record ? `repeat(${record.rows}, 1fr)` : '1fr',
    };
    let gridContainerChildren = [];
    let positionCounter = 1;

    if (this.props.selectLocations === false) {
      for(let rowNo = 1; rowNo <= record.rows; rowNo++){
        for(let colNo = 1; colNo <= record.columns; colNo++){
          let emptyChildStyles = {
            'display': 'grid',
            'alignSelf': 'stretch',
            'justifySelf': 'stretch',
            'gridTemplateColumns': '1fr',
            'gridTemplateRows': '1fr'
          };
          //let isSelectedNewLocation = this.props.mode === 'new' && rowNo === Number(this.props.newItemY) && colNo === Number(this.props.newItemX);
          gridContainerChildren.push(
            <div 
              key={shortid.generate()}
              className={'empty grid-item'}
              style={emptyChildStyles}
              row={rowNo}
              col={colNo}
              pos={positionCounter}
              data-toggle="tooltip"
              data-placement="top"
              title={`${this.props.recordType} ${rowNo}, ${colNo} (Empty)`}
              //onDragOver={this.props.onCellDragOver}
              //onDrop={!this.props.parentVisible ? this.props.onCellDrop : null}
              //draggable={false}
              //onClick={this.props.mode === 'new' ? this.props.handleSetNewLocation : null }
            ></div> 
          );
          positionCounter++;
        }  
      }
    } else if (this.props.selectLocations) {
      for(let rowNo = 1; rowNo <= record.rows; rowNo++){
        for(let colNo = 1; colNo <= record.columns; colNo++){
          let cellIsSelected = false;
          for(let i = 0; i < newItemLocations.length; i++){
            let newItemLocation = newItemLocations[i];
            if (colNo === newItemLocation[0] && rowNo === newItemLocation[1]) {
              cellIsSelected = true;
            }          
          }
          let emptyChildStyles = {
            'display': 'grid',
            'alignSelf': 'stretch',
            'justifySelf': 'stretch',
            'gridTemplateColumns': '1fr',
            'gridTemplateRows': '1fr'
          };
          //let isSelectedNewLocation = this.props.mode === 'new' && rowNo === Number(this.props.newItemY) && colNo === Number(this.props.newItemX);
          gridContainerChildren.push(
            <div 
              key={shortid.generate()}
              className={cellIsSelected ? 'selected empty grid-item' : 'empty grid-item'}
              isselected={cellIsSelected ? 'true' : 'false'}
              style={emptyChildStyles}
              row={rowNo}
              col={colNo}
              pos={positionCounter}
              //onDragOver={this.props.onCellDragOver}
              //onDrop={!this.props.parentVisible ? this.props.onCellDrop : null}
              //draggable={false}
              onClick={this.selectCell}
            ></div> 
          );
          positionCounter++;  
        }  
      }      
    }
    console.log('small grid children', gridContainerChildren);
    return (
      <div className="GridSmall" style={gridContainerStyles}>
        {gridContainerChildren}
      </div>
    );
  }
}

export default Grid;
