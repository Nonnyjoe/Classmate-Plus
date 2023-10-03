import { NFTStorage, File } from "nft.storage";
const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_PROJECT_NFT_KEY;
async function storeNFT(image, id, name, description) {
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  return nftstorage.store({
    image,
    id,
    name,
    description,
  });
}

async function main(image, id, name, description) {
  const result = await storeNFT(image, id, name, description);
  return result;
}

export default main;
