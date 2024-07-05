import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import "../App.css";

interface Posts {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Datatable: React.FC = () => {
  const [todos, setTodos] = useState<Posts[]>([]);
  useEffect(() => {
    axios
      .get<Posts[]>("https://jsonplaceholder.typicode.com/todos")
      .then((response) => setTodos(response.data));
  }, []);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userId",
      headerName: "User_iD",
      width: 90,
    },
    {
      field: "title",
      headerName: "Title",
      width: 900,
    },
    {
      field: "completed",
      headerName: "Completed",
      width: 100,
    },
  ];

  const rows = todos.map((row) => ({
    id: row.id,
    userId: row.userId,
    title: row.title,
    completed: row.completed,
  }));
  return (
    
      <div className="data-grid-container">
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </div>
    
  );
};

export default Datatable;
