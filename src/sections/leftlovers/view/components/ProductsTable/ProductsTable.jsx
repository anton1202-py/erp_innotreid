import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'

function ProductsTable({
  displayedData,
  dates,
  totalProducts,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
  onCellClick,
}) {
  // Обработчик для активации клика с клавиатуры
  const handleCellKeyDown = (event, clusterInfo, isClickable) => {
    if (isClickable && (event.key === 'Enter' || event.key === ' ')) {
      onCellClick(clusterInfo);
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Артикул</TableCell>
              {dates.map((date) => (
                <TableCell align="center" key={date}>
                  {date}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell align="center">{row.id}</TableCell>
                {dates.map((date) => {
                  const cellData = row[date] || {};
                  const commonValue = cellData.common === 0 ? '' : cellData.common;
                  const isClickable = !!commonValue;
                  return (
                    <TableCell
                      align="center"
                      key={date}
                      role={isClickable ? 'button' : undefined}
                      tabIndex={isClickable ? 0 : -1}
                      onClick={isClickable ? () => onCellClick(cellData.cluster_info) : undefined}
                      onKeyDown={(event) =>
                        handleCellKeyDown(event, cellData.cluster_info, isClickable)
                      }
                      style={{
                        cursor: isClickable ? 'pointer' : 'default',
                        backgroundColor: isClickable ? '#f0f0f0' : 'inherit',
                        textDecoration: isClickable ? 'underline' : 'none',
                      }}
                    >
                      {commonValue}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[100, 500, 1000]}
        component="div"
        count={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
}

export default ProductsTable;
