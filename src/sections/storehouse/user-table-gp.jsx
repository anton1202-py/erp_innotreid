// // import PropTypes from 'prop-types';
// // import React from 'react';
// // import Toolbar from '@mui/material/Toolbar';
// // import Typography from '@mui/material/Typography';
// // import IconButton from '@mui/material/IconButton';
// // import OutlinedInput from '@mui/material/OutlinedInput';
// // import InputAdornment from '@mui/material/InputAdornment';
// // import Tooltip from '@mui/material/Tooltip';
// // import Iconify from 'src/components/iconify';
// // import { Button } from '@mui/material';
// // import { BsCheck2All } from 'react-icons/bs';

// // export default function UserTableSort({
// //   numSelected,
// //   filterName,
// //   onFilterName,
// //   onSubmitAllProduction,
// //   onSearch, // Новый пропс для обработки поиска
// // }) {
// //   return (
// //     <Toolbar
// //       sx={{
// //         height: 96,
// //         display: 'flex',
// //         justifyContent: 'space-between',
// //         p: (theme) => theme.spacing(0, 1, 0, 3),
// //         ...(numSelected > 0 && {
// //           color: 'primary.main',
// //           bgcolor: 'primary.lighter',
// //         }),
// //       }}
// //     >
// //       <div>

// //           <>
// //             <OutlinedInput
// //               value={filterName}
// //               onChange={onFilterName}
// //               placeholder="Поиск"
// //               startAdornment={
// //                 <InputAdornment position="start">
// //                   <Iconify
// //                     icon="eva:search-fill"
// //                     sx={{ color: 'text.disabled', width: 20, height: 20 }}
// //                   />
// //                 </InputAdornment>
// //               }
// //             />

// //           </>
// //       </div>
// //     </Toolbar>
// //   );
// // }

// // UserTableSort.propTypes = {
// //   numSelected: PropTypes.number,
// //   filterName: PropTypes.string,
// //   onFilterName: PropTypes.func,
// //   onSubmitAllProduction: PropTypes.func.isRequired,
// //   onSearch: PropTypes.func.isRequired, // Обязательный пропс для кнопки поиска
// // };

// import PropTypes from 'prop-types';
// import React from 'react';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';
// import Iconify from 'src/components/iconify';

// export default function UserTableGp({
//   filterName,
//   onFilterName,
// }) {
//   return (
//     <Toolbar
//       sx={{
//         height: 96,
//         display: 'flex',
//         justifyContent: 'space-between',
//         p: (theme) => theme.spacing(0, 1, 0, 3),
//       }}
//     >
//       <div>
//         <OutlinedInput
//           value={filterName}
//           onChange={onFilterName}
//           placeholder="Поиск"
//           startAdornment={
//             <InputAdornment position="start">
//               <Iconify
//                 icon="eva:search-fill"
//                 sx={{ color: 'text.disabled', width: 20, height: 20 }}
//               />
//             </InputAdornment>
//           }
//         />
//       </div>

//     </Toolbar>
//   );
// }

// UserTableGp.propTypes = {
//   filterName: PropTypes.string,
//   onFilterName: PropTypes.func.isRequired,
// };

import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';

export default function UserTableGp({
  filterName,
  onFilterName,
  onExportExcel, // Add the export function as a prop
}) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
      <div className='flex gap-2'>
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Поиск"
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
        <Button
          variant="contained"
          color="inherit"
          onClick={onExportExcel}
          startIcon={<PiMicrosoftExcelLogo />}
          sx={{ padding: '15px 26px' }}
        >
          Экспорт в Excel
        </Button>
      </div>

      {/* <Button variant="contained" onClick={onExportExcel}>
        Export to Excel
      </Button> */}
    </Toolbar>
  );
}

UserTableGp.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func.isRequired,
  onExportExcel: PropTypes.func.isRequired, // Define the export function prop
};
