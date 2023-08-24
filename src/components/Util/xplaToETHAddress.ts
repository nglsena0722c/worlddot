import { AccAddress } from '@xpla/xpla.js';
import { bech32 } from 'bech32';

const { encode, decode, fromWords, toWords } = bech32;

const xplaToETHAddress = (xplaAddress: AccAddress) => {
    const { words } = decode(xplaAddress);
    const ethAddress = Buffer.from(fromWords(words))
      .toString('hex')
      .toLowerCase();
    return ethAddress;
  };
  

export default xplaToETHAddress;