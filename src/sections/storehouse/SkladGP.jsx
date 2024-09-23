// import React, { useEffect, useState } from 'react';
// import { axiosInstance } from 'src/api/api';

// const SkladGP = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;        const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании из localStorage
//         const response = await axiosInstance.get(`companies/${idCompany}/finished-products/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Склад ГП</h2>
//       {/* Отображение данных */}
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default SkladGP;


import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { format, subDays } from 'date-fns';
import { axiosInstance } from 'src/api/api';

const SkladGP = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Формируем последние 6 дат
  const getLastDates = () => {
    const dates = [];
    for (let i = 0; i < 6; i++) {
      dates.push(format(subDays(new Date(), i), 'yyyy-MM-dd')); // Форматируем дату в 'yyyy-MM-dd'
    }
    return dates;
  };

  const lastDates = getLastDates();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании из localStorage
        const response = await axiosInstance.get(`companies/${idCompany}/finished-products/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.results); // Сохраняем массив `results`
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Склад ГП</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Продукт</TableCell>
              <TableCell>Полка</TableCell>
              {lastDates.map((date) => (
                <TableCell key={date}>{date}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Проходим по каждому продукту */}
            {data.map((productItem) => (
              Object.entries(productItem.data).map(([shelfName, dateData]) => (
                <TableRow key={`${productItem.product}-${shelfName}`}>
                  <TableCell>{productItem.product}</TableCell>
                  <TableCell>{shelfName}</TableCell>
                  {lastDates.map((date) => (
                    <TableCell key={date}>{dateData[date] !== undefined ? dateData[date] : '-'}</TableCell>
                  ))}
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SkladGP;