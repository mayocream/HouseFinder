import * as React from 'react'
import style from './styles.less'
import { IconButton } from '@material-ui/core'
import { DeleteRounded } from '@material-ui/icons'
import { browser } from 'webextension-polyfill-ts'

export default function Toolbox() {

  const deleteItem = (e: React.MouseEvent) => {
    console.log(e.currentTarget)
  }

  const preventClick = (e) => {
    e.stopPropagation()
  }

  return <div onClickCapture={preventClick} onClick={preventClick} className='hf-toolbox'>
    <div className={style.toolbox}>
      <div className={style.toolboxcontent}>
        <IconButton
          onClickCapture={deleteItem}
          onClick={deleteItem}
          className={style.toolboxbutton}
          color='secondary'
          size='small'
        >
          <DeleteRounded/>
        </IconButton>
      </div>
    </div>
  </div>
}