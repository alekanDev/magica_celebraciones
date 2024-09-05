'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import logo from '@/images/logo_2.jpeg'
import Webcam from 'react-webcam'
import { PDFDownloadLink } from '@react-pdf/renderer'

import PDF from '../components/pdf'


const Home = () => {
  const [images, setImages] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [viewImageList, setViewImageList] = useState(false);
  const webcamRef = useRef(null)

  const handdleDevices = useCallback((mediaDevices) => {
    setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput'))
  })

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handdleDevices)
  }, [])

  useEffect(() => {
    console.log(images)
  }, [images])

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot({ width: 1920, height: 1080 })
    if (images.length > 3) {
      console.log('limite superado!')
    } else {
      setImages([...images, {
        image: imageSrc
      }])
    }

  }

  const TirillaFilm = () => {
    return (
      <div className={styles.tirilla_container}>
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
      </div>
    )
  }


  const ViewImages = () => {

    return (
      <div className={viewImageList ? styles.view_images_container : styles.hidden} >
        {
          images && (
            images.map((image, index) => (
              <Image
                key={index}
                className={styles.imageCapured}
                src={image.image}
                alt='foto capture'
                width={1920}
                height={1080}
              />
            ))
          )
        }
      </div>
    )
  }

  return (
    <div className={styles.home_container}>
      <TirillaFilm />
      <div className={styles.photo_space}>
        <Webcam
          className={styles.camera_component}
          audio={false}
          screenshotFormat='image/jpeg'
          ref={webcamRef}
          videoConstraints={{
            height: 1080,
            width: 1920,
            deviceId: selectedDevice
          }}

        />
        <div className={styles.banner_bottons}>
          <button
            className={styles.btn_capture}
            onClick={() => { capture() }}
          >
            Tomar Foto
          </button>
          {
            devices.length > 0 && (
              <select
                className={styles.btn_capture}
                onChange={(e) => setSelectedDevice(e.target.value)}
              >
                {
                  devices.map((device, index) => (
                    <option key={index} value={device.deviceId}>
                      {
                        device.label || `Camera ${index + 1}`
                      }
                    </option>
                  ))
                }
              </select>
            )
          }
          <button
            className={`${styles.btn_capture} ${styles.btn_delete}`}
            onClick={() => {
              setImages([])
              setViewImageList(false)
            }}
          >
            Eliminar
          </button>
          {
            images && (
              <button
                className={styles.btn_capture}
                onClick={() => setViewImageList(true)}
              >
                ViewImages
              </button>
            )
          }
          <div className={styles.btn_capture}>
            <PDFDownloadLink document={<PDF images={images} />} fileName='myfirstPDF.pdf'>
              {
                ({ loading, url, error, blob }) => loading ? (<button className={styles.btn_capture}> Loading Document </button>) : (<button className={styles.btn_capture}>Download now!</button>)
              }
            </PDFDownloadLink>
          </div>

        </div>
        {/* {
          imageSrc && (
            <Image
              className={styles.imageCapured}
              src={imageSrc}
              alt='foto capture'

              width={1920}
              height={1080}
            />
          )
        } */}

        <ViewImages />

        <Image
          className={styles.logo_image}
          src={logo}
          alt="logo"
        />
      </div>
      <TirillaFilm />
    </div>
  )
}

export default Home
