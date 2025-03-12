// // import { useState } from 'react';
// // import {
// //   Card,
// //   Stack,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Button,
// //   Container,
// //   Typography,
// //   TablePagination,
// // } from '@mui/material';
// // import { PiMicrosoftExcelLogo } from 'react-icons/pi';
// // import UserTableToolbar from '../user-table-toolbar';
// // // import { data } from './data';

// // const tabs = ['Рекомендации производства', 'Рекомендации отгрузок', 'Приоритет отгрузок'];
// // const marketplaces = ['Wildberries', 'Ozon', 'Yandex Market'];

// // // ----------------------------------------------------------------------

// // export default function RecomendView() {
// //   const [currentTab, setCurrentTab] = useState('Рекомендации производства');
// //   const [selectedMarketplace, setSelectedMarketplace] = useState('Wildberries');
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(5);
// //   const [selected, setSelected] = useState([]);
// //   const [filterName, setFilterName] = useState('');

// //   const handleFilterByName = (event) => {
// //     setPage(0);
// //     setFilterName(event.target.value);
// //   };

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const handleTabChange = (tab) => {
// //     setCurrentTab(tab);
// //   };

// //   const handleMarketplaceChange = (marketplace) => {
// //     setSelectedMarketplace(marketplace);
// //   };

// //   const currentData = data[currentTab][selectedMarketplace];
// //   const displayedData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

// //   return (
// //     <Container>
// //       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
// //         <Typography variant="h4">Рекомендации</Typography>

// //         <Stack direction="row" alignItems="center" className='gap-3'>
// //           <h1>Рекомендации на 100 дней</h1>
// //           <h1>Текущая дата</h1>
// //           <Button variant="contained" color="inherit">Подсчет</Button>
// //           <Button variant="contained" color="inherit">Настройки</Button>
// //           <Button variant="contained" color="inherit" startIcon={<PiMicrosoftExcelLogo />}>
// //             Экспорт в EXCEL
// //           </Button>
// //         </Stack>
// //       </Stack>

// //       <Card className="p-4 flex gap-4 mb-5">
// //         {tabs.map((tab) => (
// //           <Button key={tab} variant="contained" color="inherit" onClick={() => handleTabChange(tab)}>
// //             {tab}
// //           </Button>
// //         ))}
// //       </Card>

// //       {(currentTab === 'Рекомендации отгрузок' || currentTab === 'Приоритет отгрузок') && (
// //         <Card className="p-4 flex gap-4 mb-5">
// //           {marketplaces.map((marketplace) => (
// //             <Button key={marketplace} variant="contained" color="inherit" onClick={() => handleMarketplaceChange(marketplace)}>
// //               {marketplace}
// //             </Button>
// //           ))}
// //         </Card>
// //       )}

// //       <Card>
//         // <UserTableToolbar
//         //   numSelected={selected.length}
//         //   filterName={filterName}
//         //   onFilterName={handleFilterByName}
//         // />
// //         <TableContainer>
// //           <Table>
// //             <TableHead>
// //               <TableRow>
// //                 {currentTab === 'Рекомендации производства' && (
// //                   <>
// //                     <TableCell>Артикул</TableCell>
// //                     <TableCell>Рекомендация</TableCell>
// //                     <TableCell>Осталось дней</TableCell>
// //                     <TableCell>Заявка на производство</TableCell>
// //                   </>
// //                 )}
// //                 {currentTab === 'Рекомендации отгрузок' && (
// //                   <>
// //                     <TableCell>Артикул</TableCell>
// //                     <TableCell>Центральный ФО</TableCell>
// //                     <TableCell>Южный ФО</TableCell>
// //                     <TableCell>Уральский ФО</TableCell>
// //                     <TableCell>Северо-Западный ФО</TableCell>
// //                   </>
// //                 )}
// //                 {currentTab === 'Приоритет отгрузок' && (
// //                   <>
// //                     <TableCell>Регион</TableCell>
// //                     <TableCell>Время в пути, дн</TableCell>
// //                     <TableCell>Поступит через, дн</TableCell>
// //                     <TableCell>Продажи, шт</TableCell>
// //                     <TableCell>К отгрузке, шт</TableCell>
// //                     <TableCell>Доля продаж, %</TableCell>
// //                     <TableCell>Доля отгрузки, %</TableCell>
// //                     <TableCell>Приоритет отгрузки</TableCell>
// //                   </>
// //                 )}
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {displayedData.map((row) => (
// //                 <TableRow key={row.id}>
// //                   {currentTab === 'Рекомендации производства' && (
// //                     <>
// //                       <TableCell>{row.id}</TableCell>
// //                       <TableCell>{row.recommendation}</TableCell>
// //                       <TableCell>{row.daysLeft}</TableCell>
// //                       <TableCell>{row.productionOrder}</TableCell>
// //                     </>
// //                   )}
// //                   {currentTab === 'Рекомендации отгрузок' && (
// //                     <>
// //                       <TableCell>{row.id}</TableCell>
// //                       <TableCell>{row.central}</TableCell>
// //                       <TableCell>{row.south}</TableCell>
// //                       <TableCell>{row.ural}</TableCell>
// //                       <TableCell>{row.northWest}</TableCell>
// //                     </>
// //                   )}
// //                   {currentTab === 'Приоритет отгрузок' && (
// //                     <>
// //                       <TableCell>{row.region}</TableCell>
// //                       <TableCell>{row.travelTime}</TableCell>
// //                       <TableCell>{row.deliveryTime}</TableCell>
// //                       <TableCell>{row.sales}</TableCell>
// //                       <TableCell>{row.toShip}</TableCell>
// //                       <TableCell>{row.salesShare}</TableCell>
// //                       <TableCell>{row.shippingShare}</TableCell>
// //                       <TableCell>{row.priority}</TableCell>
// //                     </>
// //                   )}
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //         <TablePagination
// //           component="div"
// //           count={currentData.length}
// //           rowsPerPage={rowsPerPage}
// //           page={page}
// //           onPageChange={handleChangePage}
// //           onRowsPerPageChange={handleChangeRowsPerPage}
// //         />
// //       </Card>
// //     </Container>
// //   );
// // }

// // export const data = {
// //   'Рекомендации производства': {
// //     Wildberries: [
// //       { id: 'N245-1', recommendation: 10, daysLeft: 10, productionOrder: 10 },
// //       { id: 'N123-2', recommendation: 3, daysLeft: 3, productionOrder: 3 },
// //       { id: 'N123', recommendation: 3, daysLeft: 3, productionOrder: 3 },
// //       { id: 'Алена-Мишка', recommendation: 3, daysLeft: 3, productionOrder: 3 },
// //       { id: 'Анастасия Единорог', recommendation: 3, daysLeft: 3, productionOrder: 3 },
// //     ],
// //     Ozon: [
// //       { id: 'N245-1', recommendation: 8, daysLeft: 10, productionOrder: 8 },
// //       { id: 'N123-2', recommendation: 2, daysLeft: 3, productionOrder: 2 },
// //       { id: 'N123', recommendation: 3, daysLeft: 3, productionOrder: 3 },
// //       { id: 'Алена-Мишка', recommendation: 4, daysLeft: 3, productionOrder: 4 },
// //       { id: 'Анастасия Единорог', recommendation: 5, daysLeft: 3, productionOrder: 5 },
// //     ],
// //     'Yandex Market': [
// //       { id: 'N245-1', recommendation: 6, daysLeft: 10, productionOrder: 6 },
// //       { id: 'N123-2', recommendation: 3, daysLeft: 3, productionOrder: 3 },
// //       { id: 'N123', recommendation: 4, daysLeft: 3, productionOrder: 4 },
// //       { id: 'Алена-Мишка', recommendation: 3, daysLeft: 3, productionOrder: 3 },
// //       { id: 'Анастасия Единорог', recommendation: 3, daysLeft: 3, productionOrder: 3 },
// //     ],
// //   },
// //   'Рекомендации отгрузок': {
// //     Wildberries: [
// //       { id: 'N245-1', central: 3, south: 3, ural: 3, northWest: 3 },
// //       { id: 'N123-2', central: 3, south: 3, ural: 3, northWest: 3 },
// //       { id: 'N123', central: 3, south: 3, ural: 3, northWest: 3 },
// //       { id: 'Алена-Мишка', central: 3, south: 3, ural: 3, northWest: 3 },
// //       { id: 'Анастасия Единорог', central: 3, south: 3, ural: 3, northWest: 3 },
// //     ],
// //     Ozon: [
// //       { id: 'N245-1', central: 2, south: 2, ural: 2, northWest: 2 },
// //       { id: 'N123-2', central: 2, south: 2, ural: 2, northWest: 2 },
// //       { id: 'N123', central: 2, south: 2, ural: 2, northWest: 2 },
// //       { id: 'Алена-Мишка', central: 2, south: 2, ural: 2, northWest: 2 },
// //       { id: 'Анастасия Единорог', central: 2, south: 2, ural: 2, northWest: 2 },
// //     ],
// //     'Yandex Market': [
// //       { id: 'N245-1', central: 1, south: 1, ural: 1, northWest: 1 },
// //       { id: 'N123-2', central: 1, south: 1, ural: 1, northWest: 1 },
// //       { id: 'N123', central: 1, south: 1, ural: 1, northWest: 1 },
// //       { id: 'Алена-Мишка', central: 1, south: 1, ural: 1, northWest: 1 },
// //       { id: 'Анастасия Единорог', central: 1, south: 1, ural: 1, northWest: 1 },
// //     ],
// //   },
// //   'Приоритет отгрузок': {
// //     Wildberries: [
// //       { region: 'Центральный', travelTime: 2, deliveryTime: 2, sales: 10, toShip: 20, salesShare: 50, shippingShare: 50, priority: 1 },
// //       { region: 'Южный', travelTime: 3, deliveryTime: 3, sales: 15, toShip: 30, salesShare: 50, shippingShare: 50, priority: 2 },
// //       { region: 'Уральский', travelTime: 4, deliveryTime: 4, sales: 20, toShip: 40, salesShare: 50, shippingShare: 50, priority: 3 },
// //       { region: 'Северо-Западный', travelTime: 5, deliveryTime: 5, sales: 25, toShip: 50, salesShare: 50, shippingShare: 50, priority: 4 },
// //     ],
// //     Ozon: [
// //       { region: 'Центральный', travelTime: 2, deliveryTime: 2, sales: 8, toShip: 16, salesShare: 50, shippingShare: 50, priority: 1 },
// //       { region: 'Южный', travelTime: 3, deliveryTime: 3, sales: 12, toShip: 24, salesShare: 50, shippingShare: 50, priority: 2 },
// //       { region: 'Уральский', travelTime: 4, deliveryTime: 4, sales: 16, toShip: 32, salesShare: 50, shippingShare: 50, priority: 3 },
// //       { region: 'Северо-Западный', travelTime: 5, deliveryTime: 5, sales: 20, toShip: 40, salesShare: 50, shippingShare: 50, priority: 4 },
// //     ],
// //     'Yandex Market': [
// //       { region: 'Центральный', travelTime: 2, deliveryTime: 2, sales: 6, toShip: 12, salesShare: 50, shippingShare: 50, priority: 1 },
// //       { region: 'Южный', travelTime: 3, deliveryTime: 3, sales: 9, toShip: 18, salesShare: 50, shippingShare: 50, priority: 2 },
// //       { region: 'Уральский', travelTime: 4, deliveryTime: 4, sales: 12, toShip: 24, salesShare: 50, shippingShare: 50, priority: 3 },
// //       { region: 'Северо-Западный', travelTime: 5, deliveryTime: 5, sales: 15, toShip: 30, salesShare: 50, shippingShare: 50, priority: 4 },
// //     ],
// //   },
// // };

// // import { useState } from 'react';
// // import { Container, Tabs, Tab } from '@mui/material';
// // import ProductionRecommendations from '../ProductionRecommendations';
// // import ShippingRecommendations from '../ShippingRecommendations';
// // import ShippingPriority from '../ShippingPriority';

// // export default function RecomendView() {
// //   const [currentTab, setCurrentTab] = useState(0);

// //   const handleChange = (event, newValue) => {
// //     setCurrentTab(newValue);
// //   };

// //   return (
// //     <Container>
// //       <Tabs value={currentTab} onChange={handleChange}>
// //         <Tab label="Рекомендации производства" />
// //         <Tab label="Рекомендации отгрузок" />
// //         <Tab label="Приоритет отгрузок" />
// //       </Tabs>

// //       {currentTab === 0 && <ProductionRecommendations />}
// //       {currentTab === 1 && <ShippingRecommendations />}
// //       {currentTab === 2 && <ShippingPriority />}
// //     </Container>
// //   );
// // }

// import { useState } from 'react';
// import { Container, Tabs, Tab, CircularProgress, Typography } from '@mui/material';
// import React, { Suspense } from 'react';

// // Ленивое подключение компонентов
// const ProductionRecommendations = React.lazy(() => import('../ProductionRecommendations'));
// const ShippingRecommendations = React.lazy(() => import('../ShippingRecommendations'));
// const ShippingPriority = React.lazy(() => import('../ShippingPriority'));

// export default function RecomendView() {
//   const [currentTab, setCurrentTab] = useState(0);

//   const handleChange = (event, newValue) => {
//     setCurrentTab(newValue);
//   };

//   return (
//     <Container>

//      <Typography variant="h4">Рекомендации</Typography>

//       <Tabs value={currentTab} onChange={handleChange}>
//         <Tab label="Рекомендации производства" />
//         <Tab label="Рекомендации отгрузок" />
//         <Tab label="Приоритет отгрузок" />
//       </Tabs>

//       {/* Используем Suspense для отображения индикатора загрузки */}
//       {currentTab === 0 && (
//         <Suspense fallback={<CircularProgress />}>
//           <ProductionRecommendations />
//         </Suspense>
//       )}
//       {currentTab === 1 && (
//         <Suspense fallback={<CircularProgress />}>
//           <ShippingRecommendations />
//         </Suspense>
//       )}
//       {currentTab === 2 && (
//         <Suspense fallback={<CircularProgress />}>
//           <ShippingPriority />
//         </Suspense>
//       )}
//     </Container>
//   );
// }

import {
  Alert,
  Card,
  CircularProgress,
  Container,
  Snackbar,
  Tab,
  Tabs,
  Typography
} from '@mui/material'
import React, { Suspense, useState } from 'react'
import { axiosInstance } from 'src/api/api'

// Ленивое подключение компонентов
const ProductionRecommendations = React.lazy(() => import('../ProductionRecommendations'));
const ShippingRecommendations = React.lazy(() => import('../ShippingRecommendations'));
const ShippingPriority = React.lazy(() => import('../ShippingPriority'));

export default function RecomendView() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleCalculateClick = async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const url = `/companies/${idCompany}/calculate-recomand/`;

      console.log('Fetching data from URL:', url);
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Показать уведомление об успешном начале расчёта
      setAlertOpen(true);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Container>
      <div className="flex justify-between mb-10">
        <Typography variant="h4">Рекомендации</Typography>

        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleCalculateClick}
          disabled={isLoading} // Отключаем кнопку во время загрузки
        >
          {isLoading ? 'Подсчёт...' : 'Подсчёт'}
        </Button> */}
      </div>

      <Card className="p-3">
        <Tabs value={currentTab} onChange={handleChange}>
          <Tab label="Рекомендации производства" />
          <Tab label="Рекомендации отгрузок" />
          <Tab label="Приоритет отгрузок" />
        </Tabs>
      </Card>

      {/* Используем Suspense для отображения индикатора загрузки */}
      {currentTab === 0 && (
        <Suspense fallback={<CircularProgress />}>
          <ProductionRecommendations />
        </Suspense>
      )}
      {currentTab === 1 && (
        <Suspense fallback={<CircularProgress />}>
          <ShippingRecommendations />
        </Suspense>
      )}
      {currentTab === 2 && (
        <Suspense fallback={<CircularProgress />}>
          <ShippingPriority />
        </Suspense>
      )}

      {/* MUI Snackbar для показа уведомления */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000} // Уведомление будет закрыто через 6 секунд
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
          Подсчёт начался, результат будет доступен через 5 минут.
        </Alert>
      </Snackbar>
    </Container>
  );
}
