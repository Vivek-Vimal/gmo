import { DataGrid } from "@mui/x-data-grid";

const TableMaster = (props: any) => {
  const { tableData } = props;

  const columns: any = [
    { field: "id", headerName: "S. No.", width: "100" },
    { field: "title", headerName: "Title", width: "180" },
    { field: "body", headerName: "Description", width: "300" },
  ];

  const rows = tableData?.data;

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[5]}
    />
  );
};

export default TableMaster;
