function Header({children}) {
  return <div className="header">
   <div>
     <span className="logo"></span><span className="title">BNS ASSISTANT</span>
   </div>
    {children}
  </div>
}

export default Header