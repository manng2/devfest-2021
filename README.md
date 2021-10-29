# devfest-2021
Getting started

Make sure you install NodeJs, NPM, YARN, MongoDB, IPFS.

To install and run this project, you need clone this project
```
git clone https://github.com/mannguyenngoc/devfest-2021.git
```
Go to API folder and install packages needed.
```
cd api
npm install
```
Back to the root and go to NFT folder and install packages needed.
```
cd ..
cd nft
npm install
npm link
```
Back to the root and go to WEBAPP folder and install packages needed.
```
cd ..
cd webapp
yarn install
```
Usage

Before you start, you need to config your mongodb with api folder.

Then start it.
```
cd api
npm start
```
```
cd nft
npx hardhat compile
npx ipfs init
```
```
npx hardhat node
```
Create another terminal and run
```
npx ipfs daemon
```
```
cd webapp
yarn start
```

