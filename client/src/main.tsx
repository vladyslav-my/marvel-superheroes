import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/app/App";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import { MantineProvider } from "./app/providers/MantineProvider/MantineProvider";
import { StoreProvider } from "./app/providers/StoreProvider";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import '@mantine/notifications/styles.css';

import "@/shared/scss/layout/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ErrorBoundary>
		<BrowserRouter>
			<StoreProvider>
				<MantineProvider>
					<App />
				</MantineProvider>
			</StoreProvider>
		</BrowserRouter>
	</ErrorBoundary>,
);
