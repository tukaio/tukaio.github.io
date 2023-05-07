# Deploy app
Install the gh-pages npm package and designate it as a development dependency:
$ npm install gh-pages --save-dev
Add a homepage property in this format*: https://{username}.github.io/{repo-name}

* For a project site, that's the format. For a user site, the format is: https://{username}.github.io. You can read more about the homepage property in the "GitHub Pages" section of the create-react-app documentation.
{
  "name": "my-app",
  "version": "0.1.0",
+ "homepage": "https://gitname.github.io/react-gh-pages",
  "private": true,
}

Add a predeploy property and a deploy property to the scripts object:
"scripts": {
+   "predeploy": "npm run build",
+   "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
}

##Push the React app to the GitHub repository
$npm run deploy
$ npm run deploy -- -m "Deploy React app to GitHub Pages"

##Configure GitHub Pages
Navigate to the GitHub Pages settings page
In your web browser, navigate to the GitHub repository
Above the code browser, click on the tab labeled "Settings"
In the sidebar, in the "Code and automation" section, click on "Pages"
Configure the "Build and deployment" settings like this:
Source: Deploy from a branch
Branch:
Branch: gh-pages
Folder: / (root)
Click on the "Save" button