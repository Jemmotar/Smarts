import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
	// Create the browser window.
	win = new BrowserWindow({
		width: 1300,
		height: 600
	});

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, '../renderer/pages/app.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Remove default navigation menu
	win.setMenu(null);

	win.openDevTools({ mode: 'detach' });

	// Emitted when the window is closed.
	win.on('closed', () => {
		win = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
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