# Github Stats for NPM
### A [Chrome extension](https://chrome.google.com/webstore/detail/github-stats-for-npm/ppbaoiomidkieeknglglgkpbbfjcbjop) that adds a dialog with github stats to the package's npmjs page

#### To run the extension locally in dev mode:

1. Start the server locally with `npm run serve` of `yarn serve`

2. Serve the built extension using `npm run dev` or `yarn dev`.

3. In `chrome://extensions`,  load the unpacked extension from the build's output directory: `extension/dist`

#### To run a production built version of the extension locally:

1. Build the extension using `npm run build` or `yarn build`.

2. In `chrome://extensions`, load the unpacked extension from the build's output directory: `extension/dist`



### Additional Notes:
- When running the server locally it is recommended to `export` a github [client id and client secret](https://auth0.com/docs/connections/social/github) as environment variables (`GH_CLIENT_ID` and `GH_CLIENT_SECRET`) in order to not be limited in the amount of requests the server which can be made to github's api.  

- When serving the extension in dev mode - it will programmatically load and update the extension in `chrome://extensions` and refresh the page on which the extension is running on, on every update and save - thanks to [webpack-chrome-extension-reloader](https://github.com/rubenspgcavalcante/webpack-chrome-extension-reloader).


