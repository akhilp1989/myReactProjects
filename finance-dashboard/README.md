# Setup
1.unzip the repo and go to `finance-dashboard/src`
2. Run `yarn install` 
3. Once that is done, run `yarn start`
This will start the client on `localhost:3000`
For server: Go to `finance-dashboard/src/server` and run `yarn start`


## Development Details:

	- I have tried to complete the project with two options. One is where both the components are class based and other is where both are functional components
	- I have also used a central redux store to share the state between the two components. For `class` components, i have used `mapDispatchToProps` and `mapStateToProps` where as for functional components i have used `useDispatch` and `useSelector` hooks

## Assumptions/CSS:
 - I wasnt sure about the mockup of how the UI should look, so i am displaying the two components side by side
 - I have also used basic bootstrap styling in table and buttons
 - I can also use `useReducer` hook but I wanted to display the redux store integration with the components


