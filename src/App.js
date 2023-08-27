import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

function App() {
  const defaultMaterialTheme = createTheme();

  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          title="Character Data from Ice and Fire API"
          columns={[
            { title: "Name", field: "name" },
            { title: "Gender", field: "gender" },
            { title: "Culture", field: "culture" },
            { title: "Born", field: "born" },
            { title: "Died", field: "died" },
          ]}
          data={(query) =>
            new Promise((resolve, reject) => {
              console.log("query", query);
              let url = "https://www.anapioficeandfire.com/api/characters?";
              url += "pageSize=" + query.pageSize;
              url += "&page=" + (query.page + 1);
              if (query.search) {
                url += "&name=" + query.search;
              }

              for (let i = 0; i < query.filters.length; i++) {
                const row = query.filters[i];
                url += `&${row.column.field}=${row.value}`;
              }

              fetch(url)
                .then((response) => response.json())
                .then((result) => {
                  console.log("result", result, query.pageSize, query.page);
                  resolve({
                    data: result,
                    page: query.page,
                    totalCount: 214,
                  });
                });
            })
          }
          options={{
            pageSize: 10,
            pageSizeOptions: [10],
            filtering: true,
            debounceInterval: 3000,
          }}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
