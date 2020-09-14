import React from 'react';
import DraggableBox from './DraggableBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, index) => (
        <DraggableBox
          index={index}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => removeColor(color.name)}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;