module.exports = {
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "dongrentianyu",
          name: "my-electron-app",
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
};
