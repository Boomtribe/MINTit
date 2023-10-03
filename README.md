# Web3Domain Studio
## _Become a Web3Domain provider_

[![N|Solid](https://web3domain.org/studio/wp-content/uploads/banner.jpg)](https://web3domain.org/studio/)


Your own website by selling subdomains. We will integrate the domain into our ecosystem, providing every domain user access to all of the features that Web3Domain offers.

## Features

* It is best option to earn for membership by letting user to obtain subdomain of your web3 primary domain.
* You earn as soon as domain minted.
* You can set the price, image, description for your subdomain yourself.
* You can also restrict not to be minted by public. Only you can mint it and transfer. Hence you can save commission fees too.
* All Web3Domains are NFTs. Which you can sell at opensea.io

## Installation

It requires [Node.js](https://nodejs.org/) to run.

Fork repository and make required changes before deployment

**Specify Environment variable. If local development , crate a file .env.local Make variable blank if not required but do not delete or remove any key**

```sh
NEXT_PUBLIC_MATIC = "https://polygon-mainnet.g.alchemy.com/v2/......j4zryx"
NEXT_PUBLIC_ETH =  "https://eth-mainnet.g.alchemy.com/v2/......0bmp297MG7BjOKl"
NEXT_PUBLIC_FILECOIN = "https://api.node.glif.io/rpc/v1"
NEXT_PUBLIC_INFURA_KEY= 3ff237d4c.......71251407
NEXT_PUBLIC_ALCHEMY_KEY= wdUDrk...........fO1InE7
NEXT_PUBLIC_PASSWORD= Usa //Password for admin functions. Do not revel to anyone. 
```

**Modify Web3Domain studio configuration file**
>Edit the file src\configuration\Config.tsx
>Change all the values as to your requirement. 
>Make variable blank if not required. But do not delete any keys. 

**Modify Web3.tsx configuration file**
>Switch between Alchemy or Infura provider.
>Comment out the unused import 
>Use or replace alchemyProvider / infuraProvider as required. Default is Alchemy 

**Update header menu links**
>Modify the file /src/components/layout/Header.tsx
>Change Label , SubLabel , Link as required.


```sh
import { ThemingProps } from '@chakra-ui/react'
import { polygon} from '@wagmi/chains'

export const SITE_NAME = 'Web3Domain Studio'
export const SITE_DESCRIPTION = 'Web3 Domain Provider'
export const SITE_URL = 'https://web3domain.org'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = { initialColorMode: THEME_INITIAL_COLOR }

export const SOCIAL_MEDIUM = '' //Leave it blank if no values
export const SOCIAL_TWITTER = 'web3yak'
export const SOCIAL_GITHUB = 'web3yak'
export const SOCIAL_LINKEDIN = ''
export const SOCIAL_DISCORD = ''


export const NETWORKS = [polygon]; //polygon, filecoin, polygonMumbai
export const NETWORK_ERROR = "Unsuppoted Blockchain Network or Domain Name !" //Change network name as required

export const DOMAIN_TLD = 'yak' //primary domain name without dot (.)
export const DOMAIN_PRICE_ETH = '0.1' //price should be equal to contract or higher 
export const DOMAIN_IMAGE_URL = 'https://w3d.name/api/nft/yak.jpg' //Image path starts with ipfs:// or https://
export const DOMAIN_NETWORK_CHAIN = 137 //137 for polygon, 314 for filecoin, 80001 form mumbai
export const DOMAIN_DESCRIPTION = 'My Domain description goes here....'
export const DOMAIN_TYPE = "W3D" //W3D for polygon, FVM for Filecoin net
export const DOMAIN_TITLE = "Web3 Domain Search" //Title above the search input field. 
export const DOMAIN_PLACEHOLDER = "Search for a name" //Placeholder for search input field 

export const ADMIN_WALLET = "0x8D714B10B719c65B878F2Ed1436A964E11fA3271" //ETH wallet address 

export const NOTICE_TITLE = "Bulletin board"
export const NOTICE_NON_MEMBER = "Only the .yak domain holder can view bulletin board."


```

**Change Logo**

* Overwrite the file logo.png & favicon.ico under `/public/` folder

**Deploy to your server**

```
npm i
```

## License
MIT
**Free Software**