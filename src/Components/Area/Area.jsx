
import React from 'react'
import style from '../HouseAbout/HouseAbout.module.scss'

function Area({ total_area, setTotalArea, living_area, setLivingArea, kitchen_area, setKitchenArea, total_area_type, setTotalAreaType }) {
    // console.log(total_area);
    // console.log(total_area_type);
    // console.log(living_area);
    // console.log(kitchen_area);
    return (
        <div>
            <div className={style.typeInp}>
                <p>Maydoni: </p>
                <div className={style.InpG}>
                    <input
                        onChange={(e) => setKitchenArea(e.target.value)}
                        type={'number'}
                        min={0}
                        className={style.input}
                        defaultValue={kitchen_area}>
                    </input>
                    <input
                        onChange={(e) => setLivingArea(e.target.value)}
                        type={'number'}
                        min={0}
                        className={style.input}
                        defaultValue={living_area}>
                    </input>
                    <input
                        onChange={(e) => setTotalArea(e.target.value)}
                        type={'number'}
                        min={0}
                        className={style.input}
                        defaultValue={total_area}>
                    </input>
                    <select name="cash" id="cash"
                        value={total_area_type}
                        onChange={(e) => setTotalAreaType(e.target.value)}
                    >
                        <option value="m2">Metr Kvadrat</option>
                        <option value="ar">Sotix</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Area