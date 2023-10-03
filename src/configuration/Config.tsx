import { ThemingProps } from '@chakra-ui/react'
import { polygon} from '@wagmi/chains'

export const SITE_NAME = 'mint-it.click'
export const SITE_DESCRIPTION =  'mint-it.click 🔐 Web3Domain Dasbord 🌐 © elfilo.org'
export const SITE_URL = 'https://mint-it.click'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = { initialColorMode: THEME_INITIAL_COLOR }

export const SOCIAL_MEDIUM = '@elfilo.org'
export const SOCIAL_TWITTER = 'elfilobolvia'
export const SOCIAL_GITHUB = 'el-filo'
export const SOCIAL_LINKEDIN = 'el-filo-92b273281'
export const SOCIAL_DISCORD = 'boom.elfilo'

export const NETWORKS = [polygon]; //polygon, filecoin, polygonMumbai
export const NETWORK_ERROR = "Unsuppoted Blockchain Network or Domain Name !" //Change network name as required

export const DOMAIN_TLD = 'elfilo' //primary domain name without dot (.)
export const DOMAIN_PRICE_ETH = '0.1' //price should be equal to contract or higher 
export const DOMAIN_IMAGE_URL = 'https://ipfs.io/ipfs/QmP62VWBCK36KNs6PtfpcQ2cR9Pyhu3oH3aRYs8dEL7Kxn' //Image path starts with ipfs:// or https://
export const DOMAIN_NETWORK_CHAIN = 137 //137 for polygon, 314 for filecoin, 80001 form mumbai
export const DOMAIN_DESCRIPTION = '© elfilo.org'
export const DOMAIN_TYPE = "W3D" //W3D for polygon, FVM for Filecoin net
export const DOMAIN_TITLE = "Web3 Domain Search" //Title above the search input field. 
export const DOMAIN_PLACEHOLDER = "Search for a new name" //Placeholder for search input field 

export const ADMIN_WALLET = "0x30424960e05bf688A5e17d5296cfF65f3006e272" //ETH wallet address 

export const NOTICE_TITLE = "Bulletin board"
export const NOTICE_NON_MEMBER = "Only the .elfilo domain holder can view bulletin board."