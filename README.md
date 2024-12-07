# GIPHY-MONT

### Description

A react project for viewing and searching for trending GIFs using the Giphy API.

#### Technologies used

1. React created with Vite
2. Typescript
3. Tailwind CSS for styling
4. Vitest for unit tesing
5. Eslint for linting

## Functional requirements implemented

- ✅ Users can see the trending GIFs from [Giphy's Trending Endpoint](https://developers.giphy.com/docs/api/endpoint#trending) the when they first loads the app.
- ✅ Users can search for GIFs that are pulled from [Giphy's Search Endpoint](https://developers.giphy.com/docs/api/endpoint#search)
- ✅ GIFs categories are fetched and displayed in the header and users can filter GIFs by the category
- ✅ Users can also filter by MediaTypes which are GIFs, Stickers, and Texts.
- ✅ Pagination functionality was implemented to help the users see more by clicking the next and previous button to see the next and previous page respectively.
- ✅ Skeletons are shown when the app is trying to fetch the GIFs data for more interactiveness.
- ✅ Users can click on a GIF to view a single Gif's details and add it to favorites from there.
- ✅ Users can save and unsave GIfs to their Favorites list and this data persists even after refreshing or closing the app tab.
- ✅ There is an Animation on the like button when user likes the GIF to add it to their favorite list.

#### Running in dev mode

```
npm run dev
```

#### Running unit test

```
npm run test
```

### Other things that can be done to make this more production ready.

1. Integration of tools to help capture exceptions using tools like sentry.
2. Implement UI-automation tests using cypress that would run on the CI/CD pipelines. e.t.c
3. pre-commit hooks to run linting and prettier formatting before being able to commit the code.
4. Implement jobs to ensure 100% test coverage on new code on the CI/CD pipelines before they pass. (this should be required alongside two approvals from other team members after review before the developer is able to merge a feature to the main branch).