import { Box, Flex, Text, Button, LinkBox } from '@chakra-ui/react'
import Image from "next/image"
import Link from "next/link"
import Property from '../components/Property'
import { baseUrl, fetchApi } from '../utils/fetchApi'


const Banner = ({ purpose, title1, title2, buttonText, linkName, desc1, desc2, imageUrl}) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image src={imageUrl} width={500} height={300} alt='banner' />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium' >{purpose}</Text>
      <Text fontSize='3x1' fontWeight='bold' >{title1}<br />{title2}</Text>
      <Text color='gray.700' fontSize='1g' paddingTop='3' paddingBottom='3' fontWeight='medium' >{desc1}<br />{desc2}</Text>
      <Button fontSize='x1'>
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({propertyForSale, propertyForRent}) {
  return (
    <Box>
      <Banner
        purpose='RENT A HOME'
        title1='Rental Homes for'
        title2='Everyone'
        desc1='Explore apartments, villas, homes'
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap='wrap' >
        {propertyForRent.map(property => <Property property={property} key={property.id}/>)}
      </Flex>
      <Banner
        purpose='BUY A HOME'
        title1={'Find, Buy & Own Your'}
        title2='Dream Home'
        desc1='Explore apartments, villas, homes'
        desc2='and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap='wrap' >
       {propertyForSale.map(property => <Property property={property} key={property.id}/>)}
       </Flex>
    </Box>
  )
}

export async function getStaticProps(){
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=5`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=5`)
  return {
    props:{
      propertyForRent: propertyForRent?.hits,
      propertyForSale: propertyForSale?.hits
    }
  }
}