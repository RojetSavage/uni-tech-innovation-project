import React, { useState, useEffect } from 'react'
import ForSaleHeader from './ForSaleHeader'
import forSaleData from '../../data/forSaleNfts'
import ForSaleNFT from './ForSaleNFT'

function ForSalePage() {
  const [search, setSearch] = useState("")
  const [nfts, setNfts] = useState("")
  const [sortFilter, setSortFilter] = useState("")
  let sortedData = [...forSaleData]

  useEffect(() => {
    fetch('http://localhost:3001/asset', {
      method:"GET",
    })
    .then(res => res.json())
    .then(data => setNfts(data))
    .catch(err => console.log(err))
  }, [])

  {/* orders a copy of the hardcoded array data by the search criteria, foltering by search term is applied in the JSX  */ }
  if (sortFilter === "Price: Low to High") {
    sortedData = sortedData.sort((a, b) => { return a.dollarValue - b.dollarValue })
  } else if (sortFilter === "Price: High to Low") {
    sortedData = sortedData.sort((a, b) => { return b.dollarValue - a.dollarValue })
  } else if (sortFilter === "NFT Name: A-Z") {
    sortedData = sortedData.sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()) })
  } else if (sortFilter === "NFT Name: Z-A") {
    sortedData = sortedData.sort((a, b) => { return b.name.toLowerCase().localeCompare(a.name.toLowerCase()) })
  }

  return (
    <>
      <ForSaleHeader search={search} setSearch={setSearch} sortFilter={sortFilter} setSortFilter={setSortFilter} />
      <div className="w-screen h-screen flex justify-center mt-10">
        <div className="flex flex-wrap w-5/6 h-1/2 gap-10">
          {/* Filters out all for sale items not matched by the search query  */}

          {nfts.length != 0 ? nfts.filter(nft => nft.Name.toLowerCase().includes(search.toLowerCase())).map((nft,idx) => <ForSaleNFT nft={nft} key={idx}/>) : null}
        </div>
      </ div>
    </>
  )
}

export default ForSalePage