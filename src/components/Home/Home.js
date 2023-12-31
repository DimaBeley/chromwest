import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Box, ImageListItem, ImageList, Typography, Modal, ButtonGroup, Button } from '@mui/material'
import { allImages } from './galleryImages'
import { IMAGE_TYPES } from '../../constants/imageTypes'
import styles from './Home.module.scss'

// TODO uninstall swiper
export const Home = () => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: 750,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: '4px 4px 0 4px',
    overflow: 'hidden',
    outline: 'none'
  }

  const [open, setOpen] = useState(null)
  const [filter, setFilter] = useState(null)
  const handleOpen = (id) => setOpen(id)
  const handleClose = () => setOpen(null)
  const filtredImageList = (arr, filterType) => {
    return filterType ? arr.filter(item => item.type === filterType) : arr
  }

  const { t } = useTranslation()
  return (
    <Container>
      <Box sx={{ marginTop: '25px' }}>
        <Typography variant={'h1'}
                    gutterBottom
                    sx={{ fontSize: '38px', textAlign: 'center', fontWeight: 'bold' }}

        >{t('gallery')}</Typography>
      </Box>
      <Box sx={{ marginTop: '15px', textAlign: 'center' }}>
        <ButtonGroup variant="text" aria-label="Image Filter">
          <Button className={filter === null ? styles.activeButton : ''}
                  onClick={() => setFilter(null)}
          >
            {t('all')}
          </Button>
          <Button onClick={() => setFilter(IMAGE_TYPES.chrome)}
                  className={filter === IMAGE_TYPES.chrome ? styles.activeButton : ''}
          >
            {t('chrome')}
          </Button>
          <Button onClick={() => setFilter(IMAGE_TYPES.copper)}
                  className={filter === IMAGE_TYPES.copper ? styles.activeButton : ''}
          >
            {t('copper')}
          </Button>
          <Button onClick={() => setFilter(IMAGE_TYPES.nickel)}
                  className={filter === IMAGE_TYPES.nickel ? styles.activeButton : ''}
          >
            {t('nickel')}
          </Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ width: '100%', alignItems: 'center' }}>
        <ImageList variant="masonry" cols={4} gap={8}>
          {filtredImageList(allImages, filter).map((item) => (
              <>
                <ImageListItem key={item.img} onClick={() => handleOpen(item.img)} sx={{ overflow: 'hidden' }}>
                  <img
                      srcSet={`${item.img}`}
                      src={`${item.img}`}
                      alt={item.title}
                      loading="lazy"
                  />
                </ImageListItem>
                <Modal
                    open={open === item.img}
                    onClose={handleClose}
                    key={`${item.img} ${item.type}`}

                >
                  <Box sx={modalStyle}>
                    <img src={item.img}
                         alt={item.title}
                         loading="lazy"
                         style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                         onClick={handleClose}
                    />
                  </Box>
                </Modal>
              </>
          ))}
        </ImageList>
      </Box>
    </Container>
  )
}
