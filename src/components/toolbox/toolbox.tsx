import * as React from 'react'
import style from './styles.less'
import { IconButton } from '@material-ui/core'
import { DeleteRounded } from '@material-ui/icons'
import { browser } from 'webextension-polyfill-ts'
import { useEffect } from 'react'
import $ from 'jquery'
import { extractIdFromActionUrl } from '../../utils/extract'
import { addDeleteIds } from '../../stor'
import { listNodeHandler } from '../../map'

export default function Toolbox() {

  useEffect(() => {
    $('.hf-toolbox-button-delete').on('click', e => {
      deleteItem(e)
      e.preventDefault()
      e.stopPropagation()
    })
  }, [])

  const deleteItem = (e) => {
    const cardItem = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode
    const info = JSON.parse(cardItem.dataset.hfData)
    const id = extractIdFromActionUrl(info?.actionUrl)
    addDeleteIds(id).then(() => {
      listNodeHandler()
    })
  }

  return <div className='hf-toolbox'>
    <div className={style.toolbox}>
      <div className={style.toolboxcontent}>
        <IconButton
          className='hf-toolbox-button-delete'
          color='secondary'
          size='small'
        >
          <DeleteRounded/>
        </IconButton>
      </div>
    </div>
  </div>
}