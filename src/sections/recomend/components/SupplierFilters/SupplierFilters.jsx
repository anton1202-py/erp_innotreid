import { Button, MenuItem, Select, TextField } from '@mui/material'

export default function SupplierFilters({
  productCodeFilter,
  onProductCodeChange,
  regionFilter,
  onRegionFilterChange,
  clusters,
  serviceFilter,
  onServiceFilterChange,
  sort,
  onSortChange,
  onSearch,
}) {
  return (
    <div className="flex gap-8">
      {/* Выпадающий список для выбора региона из кластеров */}
      <Select
        value={regionFilter}
        onChange={(e) => onRegionFilterChange(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Фильтр по региону' }}
        sx={{ mb: 0, px: 2 }}
      >
        <MenuItem value="">Все регионы</MenuItem>
        {clusters
          .sort((a, b) => a.name.localeCompare(b.name, 'ru'))
          .map((cluster) => (
            <MenuItem key={cluster.id} value={cluster.id}>
              {cluster.name || 'Не указано'}
            </MenuItem>
          ))}
      </Select>

      <Select
        value={serviceFilter}
        onChange={(e) => onServiceFilterChange(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Фильтр по сервисам' }}
        sx={{ mb: 0, px: 2 }}
      >
        {['wildberries', 'ozon', 'yandexmarket'].map((service) => (
          <MenuItem key={service} value={service}>
            {service}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={sort}
        onChange={onSortChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Сортировка' }}
        sx={{ mb: 0, px: 2 }}
      >
        <MenuItem value="">Без сортировки</MenuItem>
        <MenuItem value="1">Больше</MenuItem>
        <MenuItem value="-1">Меньше</MenuItem>
      </Select>

      <TextField
        sx={{ mb: 0, p: 2 }}
        variant="outlined"
        placeholder="Поиск по артикулу"
        value={productCodeFilter}
        onChange={(e) => onProductCodeChange(e.target.value)}
        size="small"
      />

      <Button variant="contained" onClick={onSearch}>
        Поиск
      </Button>
    </div>
  );
}
