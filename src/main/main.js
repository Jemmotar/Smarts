import 'babel-polyfill';
import { app, BrowserWindow } from 'electron';

// When application is in production, install source maps.
// More on source maps in webpack.config.js
if (process.env.NODE_ENV === 'production') {
	require('source-map-support').install();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});

/**
 * This is an easy way to install DevTool extensions into Electron.
 * This is only used in development.
 * https://www.npmjs.com/package/electron-devtools-installer
 * https://github.com/electron/electron/blob/master/docs/tutorial/devtools-extension.md
 */
function installExtensions () {
	const installer = require('electron-devtools-installer');
	const extensions = [
		'REACT_DEVELOPER_TOOLS',
		'REDUX_DEVTOOLS'
	];

	return Promise
		.all(extensions.map(name => installer.default(installer[name])))
		.catch(console.log);
};

/**
 * Create new Electron main window configurted for this application.
 */
async function createWindow () {
	// If in development, inject DevTool extensions to help with debugging.
	if (process.env.NODE_ENV === 'development') {
		await installExtensions();
	}

	// Create the browser window.
	win = new BrowserWindow({
		width: 1280,
		height: 800
	});

	// Remove default navigation menu.
	win.setMenu(null);

	// Load entry file.
	win.loadURL(`file://${__dirname}/index.html`);

	// Open DevTools for debuggins if app is in development mode
	if (process.env.NODE_ENV === 'development') {
		win.openDevTools({
			mode: 'detach'
		});
	}

	// Emitted when the window is closed.
	// Clear global window reference.
	win.on('closed', () => {
		win = null;
	});
}
