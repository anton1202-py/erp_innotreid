import { useEffect, useState } from 'react'
import { axiosInstance } from 'src/api/api'

export function useSupplierData({
  rowsPerPage,
  page,
  regionFilter,
  serviceFilter,
  productCodeFilter,
  sort,
}) {
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [regions, setRegions] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const queryParams = new URLSearchParams({
        page_size: rowsPerPage,
        page: page + 1,
        warehouse__oblast_okrug_name: regionFilter || '',
        service: serviceFilter || 'wildberries',
        article: productCodeFilter || '',
        sort: sort || '',
      }).toString();

      const response = await axiosInstance.get(`companies/${idCompany}/supplier/?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(response.data.results || []);
      setTotalProducts(response.data.product_count || 0);

      const uniqueRegions = [
        ...new Set(
          response.data.results.flatMap((row) =>
            row.data.map((region) => region.warehouse__oblast_okrug_name)
          )
        ),
      ];
      setRegions(uniqueRegions);
      setServices(['wildberries', 'ozon', 'yandexmarket']);
    } catch (error) {
      console.error('Ошибка при получении данных:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, page, regionFilter, serviceFilter, productCodeFilter, sort]);

  return { data, totalProducts, regions, services, loading, fetchData };
}
