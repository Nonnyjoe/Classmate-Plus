import { NFTStorage, File } from "nft.storage";
const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_PROJECT_NFT_KEY;
async function storeNFT(name, id, file) {
  const scoreStorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  return scoreStorage.store({
    name,
    description: id,
    image: file,
  });
}

async function storeScore(name, id, file) {
  return await storeNFT(name, id, file);
}

export default storeScore;
