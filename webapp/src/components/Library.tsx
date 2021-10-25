import React, { useState } from 'react';
import '../styles/Library.scss';
import BlockLibrary from './BlockInLibrary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'

const Library: React.FunctionComponent<any> = props => {
  const [isShow, setIsShow] = useState(true);

  const library = [
    {
      type: 'basic',
      name: 'Basic Blocks',
      blocks: [
        {
          type: 'text',
          name: 'Text',
          image: 'https://d1fmnevnt6737i.cloudfront.net/library-icons/block-text.svg',
          isRelease: true
        },
        {
          type: 'image',
          name: 'Image',
          image: 'https://d1fmnevnt6737i.cloudfront.net/library-icons/block-image.svg',
          isRelease: false
        },
        {
          type: 'audio',
          name: 'Audio',
          image: 'https://d1fmnevnt6737i.cloudfront.net/library-icons/block-audio.svg',
          isRelease: false
        },
        {
          type: 'video',
          name: 'Video',
          image: 'https://d1fmnevnt6737i.cloudfront.net/library-icons/block-video.svg',
          isRelease: false
        }
      ]
    },
    {
      type: 'action',
      name: 'Action Blocks',
      blocks: [
        {
          type: 'alarm',
          name: 'Alarm',
          image: 'https://d1fmnevnt6737i.cloudfront.net/library-icons/block-otn.svg',
          isRelease: false
        }
      ]
    },
    {
      type: 'none',
      name: 'Other',
      blocks: [
        {
          type: 'space',
          name: 'Space',
          image: 'https://d1fmnevnt6737i.cloudfront.net/library-icons/block-module.svg',
          isRelease: true
        },
        {
          type: 'addZone',
          name: 'Zone',
          image: 'https://res.cloudinary.com/kittyholic/image/upload/v1632284169/zone_z7wew8.svg',
          isRelease: true
        }
      ]
    }
  ]

  const handleStateLibrary = () => {
    setIsShow(!isShow)
  }

  const statusOptions = [
    {
      id: 0,
      name: 'Nothing...'
    },
    {
      id: 1,
      name: '☕ Coffee'
    },
    {
      id: 2,
      name: '💤 Sleepy'
    },
    {
      id: 3,
      name: '🍪 Snack'
    },
    {
      id: 4,
      name: '😁 Happy'
    },
    {
      id: 5,
      name: '💅 Beauty'
    },
    {
      id: 6,
      name: '🎧 Listening'
    },
    {
      id: 7,
      name: '🚽 Toilet'
    },
    {
      id: 8,
      name: '🚬 Smoking'
    }
  ]

  const handleChangeStatus = (e) => {
    localStorage.setItem('status', e.target.value);
  }

  return (
    <>
      {
        isShow ? (
          <div className='Library position-relative'>
            <div className='block-container p-2'>
              {
                library.map((kind, idx) => {
                  return (
                    <div className='mb-3'>
                      <div className='kind-name text-align-left p-2'>{kind.name}</div>
                      <div className='mt-3'>
                      {
                        kind.blocks.map((block, idx) => {
                          return (
                            <BlockLibrary block={block} className='' key={idx}></BlockLibrary>
                          )
                        })
                      }
                      </div>
                    </div>

                  )
                })
              }
              <div className='mb-3'>
                <div className='kind-name text-align-left p-2 mb-3'>Status</div>
                <select className='status-input' placeholder='Update your status' onChange={handleChangeStatus}>
                  {
                    statusOptions.map(status => {
                      return (
                        <option value={status.name}>{status.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div className='btn-close icon kt-icon' onClick={handleStateLibrary} style={{fontSize: '1.5rem'}}>
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </div>
          </div>
        ) : <div className='Library position-relative hide-library'>
          <div className='icon kt-icon' onClick={handleStateLibrary}>
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          </div>
        </div>
      }
    </>

  )
}

export default Library;
