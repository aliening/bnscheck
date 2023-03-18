import {useMemo, useState} from 'react'
import Names from "./components/Names"
import MysteryBox from "./components/MysteryBox.jsx"
import Header from "./components/Header"
import DomainSelect from "./components/DomainSelect"
import DigitsSelect from "./components/DigitsSelect"
import PatternSelect from "./components/PatternSelect"
import AppSelect from "./components/AppSelect.jsx"
import "antd/dist/antd.css"
import './App.css'
import { categories } from "./utils/numbers.js";
import { categories as boxCategories} from "./utils/mysterybox.js";
import { useQuery } from "./hooks/useQuery.js";
import {Badge, message} from "antd";
import copy from 'copy-to-clipboard';
import {omit} from "lodash";

export const getCheckedParam = (
        options,
    param,
    ) => {
    const isValid = Array.isArray(options)
        ? options.includes(param)
        : options(param)
    return isValid ? param : null
}

function App() {
  const {replace, get} = useQuery()
  const [app, setApp] = useState(
      getCheckedParam(
          ["Search", "MysteryBox"],
          get('app')
      ) ||
      "Search")
  const [domain, setDomain] = useState(get('domain') || "BTC" )
  const [digits, setDigits] = useState(
      getCheckedParam(
          Object.keys(categories).map(item => categories[item]),
          get('digit')
      ) || categories.fourD
  )
    const [pattern, setPattern] = useState(get('pattern') || "NONE")
    const [boxDigits, setBoxDigits] = useState(boxCategories.oneD)

  const handleSetApp = (value) => {
    setApp(value)
    replace({
        app:value,
        page:0
    })
  }

  const handleSetDomain = (value) => {
    setDomain(value)
    replace({
        domain:value,
        page:0
    })
  }

  const handleSetDigits = (value) => {
    setDigits(value)
    replace({
        digit:value,
        page:0
    })
  }

  const handleSetPattern = (value) => {
      setPattern(value)
    replace({
        pattern:value,
        page:0
    })
  }

    return (
    <div className="App">
      <Header>
      </Header>
      {
        app ==='Search' && <>
            <DigitsSelect digits={digits} setDigits={handleSetDigits} categories={categories}/>
            <PatternSelect pattern={pattern} category={digits} setPattern={handleSetPattern}/>
            <Names digits={digits} size={100} domain={domain} type={pattern} />
        </>
      }
      {
        app ==='MysteryBox' && <>
            <DigitsSelect digits={boxDigits} setDigits={setBoxDigits} categories={boxCategories}/>
            <MysteryBox digits={boxDigits} size={100} />
        </>
     }
     <div className="donation-placeholder">
       <div className="donation">
           {/* Donation <Badge dot>
           <a onClick={() => {
               copy('0xD784c2B6FB72e755D40c576cD63CB073D91bCcfA')
               message.success('copy success')
           }}>0xD784c2B6FB72e755D40c576cD63CB073D91bCcfA</a>
       </Badge> */}
       </div>
     </div>
    </div>
  )
}

export default App
