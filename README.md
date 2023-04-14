# Atriba Code Challenge

- [Link](https://marishkazachariah.github.io/adtriba-code-challenge/) to Dashboard
- [Link to Demo](https://drive.google.com/file/d/1LDxr1rUFZgR35DGKZN9Qr2X2gPTYRN45/view?usp=sharing)
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Packages used

- [uuid](https://github.com/uuidjs/uuid) for troubleshooting unique ids for the Sample Data table
- [emotion](https://emotion.sh/docs/styled) + [mui](https://mui.com/material-ui/) for styling, components and theme
- [nivo](https://nivo.rocks/) for displaying charts

## Method

Based on the time given and a pretty open interpretation of how the data can be displayed, I decided to go with two different graphs that can be interactable and changeable to compare and contrast data through different variations of dynamic manipulation and interactivity/filtering
The bar graph represents data spans across all the dates provided and totaling the `attributed_conversions`, `attributed_revenue` and `spends`
The pie chart can be categorized between the many different types of advertising sources, optimisation target, and type, toting up all the `attributed_conversions`, `attributed_revenue` and `spends` from all 6 months.
Both these graphs can be viewed and interacted with in greater detail when clicking on the graphs on the sidebar. Otherwise, the dashboard shows an overarching feature with a couple stats highlighting to the user any averages and comparisons in a wider view.

## Challenges

- Figuring out how to best display the data given the amount of fields and data. I decided to split it between qualitative and quantitative data, with one being manipulated by the dates, and other by the various qualitative types

- Time spent on both figuring out [nivo](<(https://nivo.rocks/)>) to build charts from the data

- I had trouble with mui's date picker and didn’t want to fuss on it, putting more focus on dynamic interactability

## Nice to haves

- Would add tests for components and functions

- Would setup the project with TypeScript

- Sort out components better so they are broken down without need of functions. Break it down for better reusability and readability

- Display loader before rendering chart components (especially for Bar Graph)

- improved readability of dates - either set a limit on the graph or adjust the font/styling

- working on backend implementation for generating the `.csv` file into a proper database

- Adding a couple more charts to showcase the fields further, like a radial graph

- Work on keeping the colors with each value consistent to each chart, as it currenly updates when you alter any values on the chart `onChange`

## React App Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
