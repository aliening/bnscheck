import { ethers } from "ethers"
import { useEffect, useState } from "react"


export const registrars = {
  BTC: '0x7d311ccb3b4f5006a1215418bfc45961fc5609e4'
}

const provider = new ethers.providers.JsonRpcProvider("https://ethereum.publicnode.com")

const controllerContract = new ethers.Contract("0x7d311ccb3b4f5006a1215418bfc45961fc5609e4", [{
  "inputs": [
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
    }
  ],
  "name": "available",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}], provider)

const useAvailableName = (name, domain) => {

  const [status, setStatus] = useState("LOADING")
  useEffect(() => {
    setStatus("LOADING")
    controllerContract.available(name).then(r => {
      if(r) {
        setStatus("AVAILABLE")
      } else {
        setStatus("NOT_AVAILABLE")
      }
    })
  }, [name, domain])

  return status
}
export default useAvailableName

