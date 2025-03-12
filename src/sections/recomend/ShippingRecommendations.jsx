import { Button, CircularProgress, Paper, TablePagination } from '@mui/material'
import { format } from 'date-fns'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { useState } from 'react'
import { PiMicrosoftExcelLogo } from 'react-icons/pi'
import { axiosInstance } from 'src/api/api'
import SupplierFilters from './components/SupplierFilters/SupplierFilters'
import SupplierTable from './components/SupplierTable/SupplierTable'
import { useClusters } from './hooks/useClusters'
import { useSupplierData } from './hooks/useSupplierData'

export default function ShippingRecommendations() {
  // Состояния для фильтров и действий
  const [productCodeFilter, setProductCodeFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('wildberries');
  const [sort, setSort] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Хук для supplier-данных
  const { data, totalProducts, regions, services, loading, fetchData } = useSupplierData({
    rowsPerPage,
    page,
    regionFilter,
    serviceFilter,
    productCodeFilter,
    sort,
  });

  // Хук для кластеров
  const clusters = useClusters(serviceFilter);

  const handleSearch = () => {
    fetchData();
  };

  const handleSubmitProduction = async (productId) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const response = await axiosInstance.post(
        `companies/${idCompany}/shipment/`,
        { recomamandation_supplier_ids: [productId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Успешная отправка:', response.data);
    } catch (err) {
      console.error('Ошибка при отправке данных:', err.message);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExportToExcel = async () => {
    setIsExporting(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const allData = [];
      const totalPages = Math.ceil(totalProducts / rowsPerPage);
      for (let i = 0; i < totalPages; i++) {
        const response = await axiosInstance.get(
          `companies/${idCompany}/supplier/?page_size=${rowsPerPage}&page=${i + 1}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        allData.push(...response.data.results);
      }
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Рекомендации по отгрузке');

      worksheet.columns = [
        { header: 'Артикул', key: 'product', width: 20 },
        ...regions.flatMap((region) => [
          { header: `${region} - Количество`, key: `${region}-quantity`, width: 15 },
          { header: `${region} - Осталось дней`, key: `${region}-days_left`, width: 15 },
        ]),
      ];

      allData.forEach((row) => {
        const rowData = { product: row.product };
        regions.forEach((region) => {
          const regionData = row.data.find((r) => r.cluster__name === region);
          rowData[`${region}-quantity`] = regionData ? regionData.quantity : 0;
          rowData[`${region}-days_left`] = regionData ? regionData.days_left : 0;
        });
        worksheet.addRow(rowData);
      });

      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const fileName = `Рекомендации_по_отгрузке_${format(new Date(), 'dd-MM-yyyy')}.xlsx`;
      saveAs(new Blob([buffer]), fileName);
    } catch (error) {
      console.error('Ошибка при экспорте в Excel:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSortChange = (event) => setSort(event.target.value);

  const handleSubmitAllProducts = async () => {
    setIsSubmitting(true);
    try {
      const submitPromises = data.map((product) => handleSubmitProduction(product.id));
      await Promise.all(submitPromises);
      console.log('Все данные успешно отправлены');
    } catch (error) {
      console.error('Ошибка при отправке всех данных:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalculateClick = async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const url = `/companies/${idCompany}/calculate-supplier/`;
      console.log('Fetching data from URL:', url);
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Расчёт начался, данные получены:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <Paper>
      <div className="mx-3">
        {/* Действия сверху */}
        <div className="actions flex justify-start items-center gap-3">
          <Button
            variant="contained"
            color="inherit"
            startIcon={isExporting ? <CircularProgress size={20} /> : <PiMicrosoftExcelLogo />}
            onClick={handleExportToExcel}
            disabled={isExporting}
          >
            {isExporting ? 'Загрузка...' : 'Экспорт в Excel'}
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitAllProducts}
            disabled={isSubmitting}
            style={{ margin: '16px' }}
          >
            {isSubmitting ? <CircularProgress size={20} /> : 'Отправить все данные'}
          </Button>

          <Button variant="contained" onClick={handleCalculateClick} disabled={isLoading}>
            {isLoading ? 'Подсчёт...' : 'Подсчёт'}
          </Button>
        </div>

        {/* Панель фильтров */}
        <SupplierFilters
          productCodeFilter={productCodeFilter}
          onProductCodeChange={setProductCodeFilter}
          regionFilter={regionFilter}
          onRegionFilterChange={setRegionFilter}
          clusters={clusters}
          serviceFilter={serviceFilter}
          onServiceFilterChange={setServiceFilter}
          sort={sort}
          onSortChange={handleSortChange}
          onSearch={handleSearch}
        />

        {/* Таблица данных */}
        <SupplierTable data={data} regions={regions} onSubmitProduction={handleSubmitProduction} />

        <TablePagination
          rowsPerPageOptions={[100, 500, 1000]}
          component="div"
          count={totalProducts}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  );
}
