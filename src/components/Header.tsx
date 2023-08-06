import { useState } from 'react';

export const Header = () => {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);

  return (
    <div className="m-3 grid items-center grid-rows-2 grid-cols-2">
      <div className="row-start-1 row-end-1 w-48 mt-3 grid gap-2 grid-cols-[50px_minmax(0,_1fr)] justify-between items-center">
        <label htmlFor="rows">Rows</label>
        <input
          className="p-1 border rounded-lg border-gray-300"
          type="number"
          max={100}
          min={10}
          id="rows"
          value={rows}
          onChange={(e) => setRows(+e.target.value)}
        />
      </div>
      <div className="row-start-2 row-end-2 w-48 mt-3 grid gap-2 grid-cols-[50px_minmax(0,_1fr)] justify-between items-center">
        <label htmlFor="cols">Cols</label>
        <input
          className="p-1 border rounded-lg border-gray-300"
          type="number"
          max={100}
          min={10}
          id="cols"
          value={cols}
          onChange={(e) => setCols(+e.target.value)}
        />
      </div>
      <button className="row-span-2 h-10 justify-self-end bg-sky-500 hover:bg-sky-600 rounded-xl text-white w-20">
        Start
      </button>
    </div>
  );
};
