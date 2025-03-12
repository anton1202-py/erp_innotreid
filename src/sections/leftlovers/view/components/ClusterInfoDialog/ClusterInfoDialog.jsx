import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material'

function ClusterInfoDialog({ open, popupData, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">Детальная информация</DialogTitle>
      <DialogContent dividers>
        {popupData ? (
          <List>
            {Object.entries(popupData).map(([region, value]) => (
              <ListItem key={region}>
                <ListItemText primary={`${region}: ${value}`} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>Нет данных</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClusterInfoDialog;
