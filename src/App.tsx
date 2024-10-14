import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme, GlobalStyles } from './theme';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import CardCountries from './pages/CardCountries';
import Country from './pages/Country';
import ErrorMessage from './components/ErrorMessage';
import ScrollMove from './components/ScrollMove';

const App: React.FC = () => {

	const [theme, setTheme] = useLocalStorage<string>('theme', 'light');
	const isDarkTheme = theme === 'dark';
	const toggleTheme = () => setTheme(isDarkTheme ? 'light' : 'dark');

	return (
		<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
			<GlobalStyles />
			<Header theme={theme} toggleTheme={toggleTheme} />
			<main>
				<Routes>
					<Route path="/" element={<CardCountries />} />
					<Route path="/:code" element={<Country />} />
					<Route path="/*" element={<ErrorMessage />} />
				</Routes>
			</main>
			<ScrollMove />
		</ThemeProvider>
	);
};

export default App;
