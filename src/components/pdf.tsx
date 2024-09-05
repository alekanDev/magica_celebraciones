import { Document, Text, Page, StyleSheet, Image } from "@react-pdf/renderer";


const styles = StyleSheet.create({

})

import React from 'react'

const PDF = (images) => {
  const image1 = images[0].image
  console.log(image1)
  return (
    <Document>
      <Page>
        <Text>
          Hello World!
        </Text>
        {/* <Image
          src={images[0].image} /> */}
      </Page>
    </Document>
  )
}

export default PDF