import { format } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { axiosInstance } from 'src/api/api'

// Массив табов можно импортировать или определить здесь
const tabs = [
  { label: 'Общие', service: '' },
  { label: 'Wildberries', service: 'wildberries' },
  { label: 'Ozon', service: 'ozon' },
  { label: 'Yandex Market', service: 'yandexmarket' },
];

export function useProducts({
  currentTab,
  page,
  rowsPerPage,
  filterName,
  startDate,
  endDate,
  sort,
}) {
  const [roles, setRoles] = useState({});
  const [dates, setDates] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoles = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const selectedTab = tabs.find((tab) => tab.label === currentTab);
      const serviceParam = selectedTab?.service ? `&service=${selectedTab.service}` : '';

      let url = `/companies/${idCompany}/stocks/?page_size=${rowsPerPage}&page=${
        page + 1
      }${serviceParam}`;
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

      setTotalProducts(response.data.product_count || 0);
      setRoles(response.data.data);

      const allDates = Object.values(response.data.data)
        .flatMap((item) => Object.keys(item))
        .filter((key) => key !== 'id');
      setDates(Array.from(new Set(allDates)).sort((a, b) => new Date(b) - new Date(a)));
    } catch (error) {
      console.error('Failed to fetch roles', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentTab, page, rowsPerPage, filterName, startDate, endDate, sort]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return { roles, dates, totalProducts, isLoading, fetchRoles };
}
