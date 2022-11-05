const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const debug = require("electron-debug")
const path = require("path")
const url = require("url")
const isDev = require("electron-is-dev")
const ipc = require("electron").ipcMain

require("update-electron-app")({
    repo: "huntercaron/view",
})
debug()

let mainWindow

const prodUrl = "https://bloom-view.vercel.app"
const devUrl = "http://localhost:3000"

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 500,
        frame: false,
        icon: "icon.png",
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: false,
        },
    })
    mainWindow.loadURL(isDev ? devUrl : `file://${path.join(__dirname, "../build/index.html")}`)
    mainWindow.on("closed", () => (mainWindow = null))
    // mainWindow.webContents.openDevTools()
    mainWindow.setBackgroundColor("#fff")

    const template = [
        {
            label: "Application",
            submenu: [
                {
                    role: "about",
                },
                { type: "separator" },
                {
                    role: "quit",
                },
            ],
        },
        // {
        //     label: "Edit",
        //     submenu: [
        //         { role: "undo" },
        //         { role: "redo" },
        //         { type: "separator" },
        //         { role: "cut" },
        //         { role: "copy" },
        //         { role: "paste" },
        //         { role: "pasteandmatchstyle" },
        //         { role: "delete" },
        //         { role: "selectall" },
        //     ],
        // },
        {
            label: "View",
            submenu: [{ role: "reload" }],
        },
        {
            role: "window",
            submenu: [
                {
                    label: "Keep on Top",
                    type: "checkbox",
                    checked: mainWindow.isAlwaysOnTop(),
                    click() {
                        mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop())
                    },
                },
                { type: "separator" },
                { role: "minimize" },
                { role: "close" },
            ],
        },
        {
            role: "help",
            submenu: [
                {
                    label: "Learn More",
                    click() {
                        require("electron").shell.openExternal("https://huntercaron.com")
                    },
                },
            ],
        },
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

ipc.on("asynchronous-message", function (event, arg) {
    event.sender.send("asynchronous-reply", "pong")
})

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow()
    }
})
