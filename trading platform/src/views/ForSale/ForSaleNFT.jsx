// Individual display cards on the asset marketplace

import React from 'react'
import { BsHeartFill } from 'react-icons/bs'
import { useState } from 'react';
import { BsHeart } from 'react-icons/bs'
import ForSaleModal from './ForSaleModal';
import PurchaseConfirmationModal from './PurchaseConfirmationModal';

const initState = { buy: false, confirmBuy: false }

function ForSaleNFT({ nft }) {
  const [favorite, setFavorite] = useState(false)
  const [purchaseStage, setPurchaseStage] = useState(initState)

  return (
    <>
      <div onClick={() => setPurchaseStage(prevState => { return { ...initState, buy: true } })} className="w-48 h-72 overflow-hidden border flex flex-col items-center hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer bg-slate-50">
        <div className="w-48 h-44 overflow-hidden">
          <img src={nft.Img} />
        </div>
        <p className="text-lg font-bold mt-6  ">{nft.Name}</p>
        <div className="flex flex-row items-center">
          {favorite && <BsHeartFill className="mr-3 mt-1" size="1.2rem" color="red" onClick={() => setFavorite(prevState => !prevState)} />}
          {!favorite && <BsHeart className="mr-3 mt-1" size="1.2rem" color="black" onClick={() => setFavorite(prevState => !prevState)} />}
          <p className="font-medium text-sm text-gray-700">{nft.Price}  </p>
        </div>
          <p className="font-medium text-sm text-gray-700 mt-1">{nft.Category} </p>
      </div>
      {purchaseStage.buy && <ForSaleModal purchaseStage={purchaseStage} setPurchaseStage={setPurchaseStage} nft={nft} />}
      {purchaseStage.confirmBuy && <PurchaseConfirmationModal purchaseStage={purchaseStage} setPurchaseStage={setPurchaseStage} nft={nft} />}
    </>
  )
}

export default ForSaleNFT
