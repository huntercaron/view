module.exports = {
    packagerConfig: {
        // dir: "public",
        // appDir: "public",
        // icon: "./assets/icon",
        // ignore: [
        //     "src",
        //     "assets",
        //     "webpack",
        //     "pages",
        //     "lib",
        //     "app",
        //     "dist",
        //     "public",
        //     "README.md",
        // ],
    },
    makers: [
        {
            name: "@electron-forge/maker-zip",
        },
        {
            name: "@electron-forge/maker-dmg",
            config: {
                // background: "./assets/dmg-background.png",
                format: "ULFO",
            },
        },
    ],

    publishers: [
        {
            name: "@electron-forge/publisher-github",
            config: {
                repository: {
                    owner: "huntercaron",
                    name: "view",
                },
                prerelease: true,
            },
        },
    ],
    packagerConfig: {
        osxSign: {
            optionsForFile: filePath => {
                return {
                    entitlements: "entitlements.plist",
                }
            },
        },
    },
    osxNotarize: {
        tool: "notarytool",
        appleId: process.env.APPLE_ID,
        appleIdPassword: process.env.APPLE_PASSWORD,
        teamId: process.env.APPLE_TEAM_ID,
    },
}
