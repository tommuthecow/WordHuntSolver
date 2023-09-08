import React from 'react';

function Grid(props) {
  const { whArr, onInputChange } = props;

  return (
    <table>
       <tbody> 
              {
                [0,1,2,3,4].map((row, rIndex) => {
                  return <tr key={rIndex}>
                    {[0,1,2,3,4].map((col, cIndex) => {
                      return <td key={rIndex + cIndex}>
                        <input 
                          onChange={(e) => onInputChange(e, row, col)}
                          value={/^[a-zA-Z]+$/.test(whArr[row][col]) ? whArr[row][col] : ''}
                          maxLength={1}
                          className="cellInput"
                        />
                      </td>
                    })}
                  </tr>
                })
              }
            </tbody>
    </table>
  );
}

export default Grid;