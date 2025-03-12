import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import React from 'react'
import { BsCheck2 } from 'react-icons/bs'

export default function SupplierTable({ data, regions, onSubmitProduction }) {
  return (
    <TableContainer style={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              rowSpan={2}
              style={{ position: 'sticky', left: 0, backgroundColor: '#fff', zIndex: 2 }}
            >
              Действия
            </TableCell>
            <TableCell
              rowSpan={2}
              style={{ position: 'sticky', left: 80, backgroundColor: '#fff', zIndex: 1 }}
            >
              Артикул
            </TableCell>
            {regions.map((region, index) => (
              <React.Fragment key={`header-${region}-${index}`}>
                <TableCell colSpan={2} align="center">
                  {region}
                </TableCell>
              </React.Fragment>
            ))}
          </TableRow>
          <TableRow>
            {regions.map((region, index) => (
              <React.Fragment key={`subheader-${region}-${index}`}>
                <TableCell align="center">Количество</TableCell>
                <TableCell align="center">Осталось дней</TableCell>
              </React.Fragment>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.product}>
              <TableCell
                style={{ position: 'sticky', left: 0, backgroundColor: '#fff', zIndex: 2 }}
              >
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => onSubmitProduction(row.id)}
                >
                  <BsCheck2 />
                </Button>
              </TableCell>
              <TableCell
                style={{ position: 'sticky', left: 80, backgroundColor: '#fff', zIndex: 1 }}
              >
                {row.product}
              </TableCell>
              {regions.map((region, index) => {
                const regionData = row.data.find((r) => r.warehouse__oblast_okrug_name === region);
                return (
                  <React.Fragment key={`${row.product}-${region}-${index}`}>
                    <TableCell align="center">{regionData ? regionData.quantity : ' '}</TableCell>
                    <TableCell align="center">{regionData ? regionData.days_left : ' '}</TableCell>
                  </React.Fragment>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
