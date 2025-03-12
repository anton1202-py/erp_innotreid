import {
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { useState } from 'react'
import { PiMicrosoftExcelLogo } from 'react-icons/pi'
import { axiosInstance } from 'src/api/api'
import UserTableToolbar from '../user-table-toolbar'
import ClusterInfoDialog from './components/ClusterInfoDialog/ClusterInfoDialog'
import ProductsTable from './components/ProductsTable/ProductsTable'
import { useProducts } from './hooks/useProducts'

const tabsData = [
  { label: 'Общие', service: '' },
  { label: 'Wildberries', service: 'wildberries' },
  { label: 'Ozon', service: 'ozon' },
  { label: 'Yandex Market', service: 'yandexmarket' },
];

export default function ProductsView() {
  const [currentTab, setCurrentTab] = useState('Общие');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [filterName, setFilterName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sort, setSort] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // Popup state
  const [openPopup, setOpenPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const { roles, dates, totalProducts, isLoading, fetchRoles } = useProducts({
    currentTab,
    page,
    rowsPerPage,
    filterName,
    startDate,
    endDate,
    sort,
  });

  // Преобразуем объект roles в массив для отображения
  const displayedData =
    Object.entries(roles).map(([key, value]) => ({
      id: key,
      ...value,
    })) || [];

  const handleCellClick = (clusterInfo) => {
    setPopupData(clusterInfo);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setPopupData(null);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (event, newTab) => {
    setCurrentTab(newTab);
    setPage(0);
  };

  const handleSearch = () => {
    fetchRoles();
  };

  const handleExportToExcel = async () => {
    setIsExporting(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const selectedTab = tabsData.find((tab) => tab.label === currentTab);
      const serviceParam = selectedTab?.service ? `&service=${selectedTab.service}` : '';
      let url = `/companies/${idCompany}/stocks/?page_size=${totalProducts}${serviceParam}`;

      if (startDate && endDate) {
        const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
        const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');
        url += `&date_from=${formattedStartDate}&date_to=${formattedEndDate}`;
      }
      if (filterName) {
        url += `&article=${filterName}`;
      }
      if (sort) {
        url += `&sort=${sort}`;
      }

      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allData = response.data.data;
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sales Data');
      worksheet.addRow(['Артикул', ...dates]);
      Object.entries(allData).forEach(([key, value]) => {
        worksheet.addRow([key, ...dates.map((date) => value[date]?.common || 0)]);
      });
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), 'sales_data.xlsx');
    } catch (error) {
      console.error('Failed to export to Excel', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Остатки</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={isExporting ? <CircularProgress size={20} /> : <PiMicrosoftExcelLogo />}
          onClick={handleExportToExcel}
          disabled={isExporting}
        >
          {isExporting ? 'Загрузка...' : 'Экспорт в Excel'}
        </Button>
      </Stack>
      <Card className="px-6 my-4 py-3">
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {tabsData.map((tab) => (
            <Tab key={tab.label} label={tab.label} value={tab.label} />
          ))}
        </Tabs>
      </Card>
      {isLoading ? (
        <Typography variant="h6" align="center">
          Загрузка данных...
        </Typography>
      ) : (
        <Card>
          <UserTableToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onSearch={handleSearch}
            isLoading={isLoading}
            sort={sort}
            setSort={setSort}
          />
          <ProductsTable
            displayedData={displayedData}
            dates={dates}
            totalProducts={totalProducts}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onCellClick={handleCellClick}
          />
        </Card>
      )}
      <ClusterInfoDialog open={openPopup} popupData={popupData} onClose={handleClosePopup} />
    </Container>
  );
}
