import { useEffect, useState } from 'react'
import { axiosInstance } from 'src/api/api'

export function useClusters(serviceFilter) {
  const [clusters, setClusters] = useState([]);
  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const response = await axiosInstance.get(`cluster/${serviceFilter || 'wildberries'}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setClusters(response.data);
      } catch (error) {
        console.error('Ошибка при получении cluster данных:', error.message);
      }
    };
    fetchClusters();
  }, [serviceFilter]);
  return clusters;
}
