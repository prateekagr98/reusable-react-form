### Reusable React Form

This library includes some of the reusable form elements which would be used when creating a user form. The repo can be used as a npm package. Currently it exposes three components for usage:

- [Input](https://github.com/prateekagr98/reusable-react-form/blob/master/components/input/README.md)
- [Single Select](https://github.com/prateekagr98/reusable-react-form/blob/master/components/select/README.md)
- [Multi Select](https://github.com/prateekagr98/reusable-react-form/blob/master/components/select/README.md)

Documentation and usage guidelines can be found in the storybook.

#### Dependencies
- Node v8.9.4

#### Setup
- Clone the repo.
- Run `npm install`
- Run `npm storybook`
- This will open up a UI to view details on the components being exported along with their documentations.

#### Generate Build
- Include components in `components/build_entry.js` file (If created new ones).
- Run `npm run build`
- This will generate a build file in `dist/build.js` exporting all the components for usage.

The repo uses rollup for generating exportable components and storybook for creating a UI for references.

#### Code Structuring
- `styles`: The folder only includes the colour pallet and fonts being used.
- `components`: This includes every component created as a module along with it's own README file and story.