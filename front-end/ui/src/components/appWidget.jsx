import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {CheckCircleOutline, WarningAmber} from '@mui/icons-material';

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, onClick, ...other }) {
  const handleClick = () => {
    console.log('Card clicked!');
  };
  
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        cursor: 'pointer',
        textAlign: 'center',
        ...sx,
      }}
      {...other}
      onClick={onClick || handleClick}
    >
      <Box sx={{ width: 64, height: 64 }}>
        {total === 0 ? <CheckCircleOutline color="success"/> : <WarningAmber color="warning"/>}
      </Box>

      <Stack spacing={0.5}>
        <Typography variant="h4">{total}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  onClick: PropTypes.func,
};
