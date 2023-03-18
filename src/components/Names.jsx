import useAvailableName, { registrars } from "../hooks/useAvailableName"
import { LoadingOutlined } from '@ant-design/icons';
import usePage from "../hooks/usePage"
import {Pagination, Spin, Tooltip} from 'antd';
import {keccak256} from "js-sha3";
import {BigNumber} from "ethers";

function getTokenId(name) {
  const namenode = '0x'+keccak256(`${name}`)
  const tokenId = BigNumber.from(namenode).toString()
  return tokenId
}

const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

function Name({name, domain}) {
  const nameStatus = useAvailableName(name, domain)
  const isAvailable = nameStatus === "AVAILABLE"
  const isNotAvailable = nameStatus === "NOT_AVAILABLE"
  const color = isAvailable ? "available" : nameStatus === "LOADING" ? "loading" : "not-available"
  const path = domain === "TWIT" ? "twit" : ""
  const tokenId = getTokenId(name)
  const nft = (registrars[domain]).toLowerCase()
  const link = isAvailable ? `https://app.bns.org/search/${name}` : isNotAvailable ? '' : '#';
  const title = isAvailable ? 'Go To Register' : isNotAvailable ? '' : 'Loading'
  return <Spin spinning={nameStatus === "LOADING"} indicator={antIcon}>
    <Tooltip placement="bottomLeft" title={title}>
      <a className={`name ${color}`} href={link} target="_blank">
        {name}.{domain.toLowerCase()}
      </a>
    </Tooltip>
  </Spin>
}

function Names({digits, size, domain, type}) {
  const {next, names, total, page, goNextPage, goPreviousPage, goToPage} = usePage(digits, size, type)
  return <div>
    <div className="names-container">
      <div className="names">
        {names.map(n => <Name key={n} name={n} domain={domain}/>)}
      </div>
    </div>
      <Pagination total={total} current={page+1}
                  showSizeChanger={false}
                  showQuickJumper
                  showTotal={total => `Total ${total} names`}
                  onChange={(page) => {
                    goToPage(page-1)
                  }} pageSize={100}
                  className="page-button"
      />
  </div>
}

export default Names