import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>

        <video autoPlay loop muted  style={{
            "height": "100%",
            "width": "auto",
            "float": "left",
            "bottom": "-40%",
            "position": "fixed",
            "zIndex": "-1"
        }}>
            <source src="/static/background.mp4" type='video/mp4' />
        </video>
    </ThemeProvider>
  );
}
export default App;
