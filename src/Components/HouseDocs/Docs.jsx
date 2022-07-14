// Import => React
import axios from 'axios';
import React, { useRef, useState, useContext } from 'react';
import { Context } from '../../Context/LangContext';
import content from '../../Localization/Content';
import { v4 } from 'uuid';

import Trash from '@mui/icons-material/ClearRounded';

// Import => Components
import style from './Docs.module.scss';
import "../Form/Form.scss";

function Docs({ document, setDocs }) {

  const [show, setshow] = useState(false)
  const { lang, setLang } = useContext(Context);

  const doc = useRef(null)

  function Delete(e) {
    setDocs('')
    setshow(false)
  }

  
  function dropImageHandler(e) {
    var formdata = new FormData();
    let files = e;
    formdata.append('key', 'Service For C Group')
    formdata.append("file", files);
    axios.post('http://ali98.uz/api/service', formdata)
    .then(function (response) {
        setshow(true)
        let res = response.data.data
        setDocs(res)
      })
      .catch(function (res) {
        console.log(res.response.data.status);
      })
  }

  return (
    <>

      <div className="change" style={{display:show ? 'block' : 'none'}}  >
        <img src={document} alt={document} className="img" />
        <Trash onClick={(e) => Delete(e)} className="icon" />
      </div>

      <div className={style.Group}>
        <label htmlFor="file" className={style.label}>{content[lang].adverd_documents_dow}</label>
        <input type="file" id='file' onChange={(e) => dropImageHandler(e.target.files[0])} className={style.input} />
      </div>
    </>
  )
}

export default Docs