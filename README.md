# Simplifiya - Question Manager

## Features

 - [x] Reusable Components
 - [x] Redux to handle application state
 - [x] Use of life cycle with redux store
 - [x] Search functionality
 - [x] **Partial Support** - Add question functionality without question groups
 - [x] Complete theme with layout - down to the last green dot :)
 - [x] React Routing
 - [x] Pop Over views
 - [x] Pagination
 - [x] **Partial Support** - Sorting for each column except question group and license
 
## Extras
 
 - [x] Backend api with express and nodeJs
 
## Development

A complete development environment is setup using babel, webpack and typescript that allows for

 - Type checking with TypeScript
 - Latest javascript features and proposals using Babel transforms
 - Hot Module Replacement - make changes and see them instantly on your web page without reloading
 - Mock Api with tiny, single file express server, at `src/server.ts`
 

 1. Clone this repository
 2. In the root directory, run `npm install`
 3. In two separate console windows, run `npm run serve:client` and `npm run serve:server`

**Note: Tested only on Linux on latest versions of Firefox and Chrome**

## Style Guide

`.tsx` files follow the following structure

 1. Types - appear first in the file as knowing the structure of the data allows for better understanding the rest of the code
 2. Function Components - types are followed by the largest, most important function components first, descending along the component hierarchy into smaller atomic components
 3. CSS-in-JS styles - styles are the least important to understanding the code, they are only a graphical concern so they appear last
 
Redux

 Types, Actions, Action Creators, Reducers and Side-Effects are ordered in that order in a single file according to the pattern known as [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux). Similar to `.tsx` files, this order is based on ease of understanding the code by reading top to bottom    


## Production

Production configuration is still being worked on.
