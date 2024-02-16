const { app, BrowserWindow, Menu, ipcMain} = require('electron');
const path = require('path');
const { shell } = require('electron');
//Hilink API
const huaweiLteApi = require('huawei-lte-api');

//plmn --> https://github.com/pbakondy/mcc-mnc-list
const mcc_mnc_list = require('mcc-mnc-list');


//Connection
const connection = new huaweiLteApi.Connection('http://admin:AAz369369@192.168.1.1/');
//plmn filter -->
let records = mcc_mnc_list.all();
let statusCodes = mcc_mnc_list.statusCodes();

console.log(mcc_mnc_list.filter({ mccmnc: '42001' }));



//=========================================| Handler |=============================================//
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}
//=================================================================================================//

let mainWindow;


//=======================================| Start Windows |=========================================//
const createWindow = () => {
  // Create the browser window.
    mainWindow = new BrowserWindow({
    height:720,
    width:1280,
    webPreferences: {
      preload: path.join(__dirname, '/js/preload/preload.js'), 
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '/views/index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', () => {
    moniter();

    

    /*
    const device = new huaweiLteApi.Monitoring(connection);
    device.status().then(function(result) {
        console.log(result);
        mainWindow.webContents.send('status', result);
    }).catch(function(error) {
        console.log(error);
    });*/
    /*
    const device = new huaweiLteApi.Device(connection);
    device.information().then(function(result) {
        console.log(result);
        mainWindow.webContents.send('deviceInfo', result);
    }).catch(function(error) {
        console.log(error);
    });*/
  })

  


  // Hilink
  ipcMain.on('item:add', function(e, item){
    const device = new huaweiLteApi.Device(connection);

  });
  
};

function moniter(){
  setTimeout(() => {
    /*
    const monit = new huaweiLteApi.Monitoring(connection);
    monit.trafficStatistics().then(function(result) {
        //console.log(result);
        mainWindow.webContents.send('traffic', result);
        moniter();
    }).catch(function(error) {
        console.log(error);
    });*/
    const device = new huaweiLteApi.Device(connection);
    device.signal().then(function(result) {
        console.log(result);
        mainWindow.webContents.send('signal', result);
        moniter();
    }).catch(function(error) {
        console.log(error);
    });
    
  }, 5000);
}

//==========================================| Menu |===============================================//
const menuItems = [
  {
    label: "Login",
    submenu: [
      {
        label: "Login",
        click: async () =>{
          const wn_login = new BrowserWindow({
            parent: mainWindow,
            height:200,
            width:400,
            autoHideMenuBar : true,
            fullscreenable: false,
            focusable:true,
            skipTaskbar: true,
            fullscreen: false,
            maximizable:false,
            minimizable: false,
            alwaysOnTop: true,
            modal: true
          });


          wn_login.loadFile(path.join(__dirname, '/views/login.html'))
        }
      }
    ]
  },
  {
    label: "Setting",
    submenu: [
      {
        label: "About",
        click: async () => {
          await shell.openExternal('https://electronjs.org')
        }
      },
      {
        type: "separator"
      },
      {
        label: "Exit",
        click: () => app.quit(),
      }
    ]
  },
]
const menu = Menu.buildFromTemplate(menuItems);

Menu.setApplicationMenu(menu);
//=================================================================================================//


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
