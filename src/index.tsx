import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ScrollTop from 'src/hooks/useScrollTop';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import web3connectors from 'src/util/web3connectors'
import {PrismicProvider} from "@prismicio/react";
import {client} from "./prismicio"
import {DAppProvider} from "@usedapp/core";


ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
        <BrowserRouter>
            <ScrollTop />
            <PrismicProvider client={client}>
                <DAppProvider config={web3connectors}>
                    <App />
                </DAppProvider>
            </PrismicProvider>
        </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
