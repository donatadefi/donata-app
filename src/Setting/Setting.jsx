import React, { useState } from 'react';
import { Input, Checkbox } from 'antd';
import uuid from 'react-uuid';
import './Setting.scss';

var ethUtil = require('ethereumjs-util');
var sigUtil = require('eth-sig-util');

function Setting({ account }) {
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [socials, setSocials] = useState({});
  const [customToken, setCustomToken] = useState(true);
  const [tokensList, setTokensList] = useState([
    {
      id: uuid(),
      address: '',
      name: '',
    },
  ]);

  const putDescription = (e) => {
    setDescription(e.target.value);
  };

  const putSocials = (e, social) => {
    setSocials((state) => {
      return { ...state, [social]: e.target.value };
    });
  };

  const setTokenAddress = (e, id) => {
    const currentTokens = [...tokensList];
    currentTokens.forEach((token, idx) => {
      if (id === token.id) {
        //this shit changes tokensList without re-render
        currentTokens[idx].address = e.target.value;
      }
    });
  };

  const addToken = () => {
    const currentTokens = [...tokensList];
    setTokensList([
      ...currentTokens,
      {
        id: uuid(),
        address: '',
        name: '',
      },
    ]);
  };

  const removeToken = (id) => {
    const currentTokens = [...tokensList];
    const newList = currentTokens.filter((token) => {
      return token.id !== id;
    });

    setTokensList(newList);
  };

  const putCustomToken = (e) => {
    setCustomToken(e.target.checked);
  };

  const signData = (type) => {
    if (
      (!description && type === 'description') ||
      (!photoUrl && type === 'photoUrl') ||
      (Object.keys(socials).length === 0 && type === 'socials')
    ) {
      return;
    }
    const tokens = () => {
      if (customToken) {
        return tokensList;
      } else {
        return [];
      }
    };
    const msgParams = JSON.stringify({
      domain: {
        chainId: 1,
        name: 'Donata App',
        //Donata contract here to verify
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        version: '1',
      },
      // Defining the message signing data content.
      message: {
        action: `Set ${type}`,
      },
      // Refers to the keys of the *types* object below.
      primaryType: 'Write',
      types: {
        Write: [{ name: 'action', type: 'string' }],
      },
    });

    const from = account;
    const params = [from, msgParams];
    const method = 'eth_signTypedData_v4';
    const content = () => {
      if (type === 'description') {
        return description;
      }
      if (type === 'photoUrl') {
        return photoUrl;
      }
      if (type === 'socials') {
        return socials;
      }
      if (type === 'tokens') {
        return tokens();
      }
    };
    window.ethereum.sendAsync(
      {
        method,
        params,
        from,
      },
      function (err, result) {
        if (err) return console.dir(err);
        if (result.error) {
          alert(result.error.message);
        }
        if (result.error) return console.error('ERROR', result);
        console.log('TYPED SIGNED:' + JSON.stringify(result.result));

        //use this on the backend
        const recovered = sigUtil.recoverTypedSignature_v4({
          //send these two as the request body, alongside any data you want to add
          //send fetch to firebase from backend
          //specify if its an update, write, or delete
          data: JSON.parse(msgParams),
          sig: result.result,
        });

        if (
          ethUtil.toChecksumAddress(recovered) ===
          ethUtil.toChecksumAddress(from)
        ) {
          //do the fetch here, for a little extra security
          const reqBody = {
            data: JSON.parse(msgParams),
            sig: result.result,
            type,
            customToken,
            content: content(),
          };
          fetch('http://localhost:5000/db', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
          })
            .then((res) => {
              return res.json();
            })
            .then((status) => {
              console.log(status);
            });
        } else {
          alert(
            'Failed to verify signer when comparing ' + result + ' to ' + from
          );
        }
      }
    );
  };

  const renderTokens = () => {
    return tokensList.map((token) => {
      return (
        <div
          style={{ display: customToken ? 'flex' : 'none' }}
          className="token-choice"
          key={token.id}
        >
          <Input
            placeholder="Token Address"
            onChange={(e) => setTokenAddress(e, token.id)}
          />
          <button
            className="circle remove"
            onClick={() => removeToken(token.id)}
          >
            &#8722;
          </button>
          <p>Token Name</p>
        </div>
      );
    });
  };

  return (
    <div className="Setting">
      <div className="user-detail">
        <div className="user-photo">
          <div>Photo</div>
          <button>Upload Picture</button>
        </div>
        <div className="user-description">
          <div>
            <Input.TextArea
              name="description"
              id="1"
              placeholder="Short description"
              onChange={putDescription}
            ></Input.TextArea>
          </div>
          <button onClick={() => signData('description')}>
            Set Description
          </button>
        </div>
      </div>
      <div className="user-socials mt-30">
        <div>
          <h3>Socials</h3>
          <div className="social-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-twitter"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#00abfb"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
            </svg>
            <Input
              placeholder="URL"
              onChange={(e) => putSocials(e, 'twitter')}
            />
          </div>
          <div className="social-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-youtube"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ff2825"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="3" y="5" width="18" height="14" rx="4" />
              <path d="M10 9l5 3l-5 3z" />
            </svg>
            <Input
              placeholder="URL"
              onChange={(e) => putSocials(e, 'youtube')}
            />
          </div>
          <div className="social-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-twitch"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#a905b6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 5v11a1 1 0 0 0 1 1h2v4l4 -4h5.584c.266 0 .52 -.105 .707 -.293l2.415 -2.414c.187 -.188 .293 -.442 .293 -.708v-8.585a1 1 0 0 0 -1 -1h-14a1 1 0 0 0 -1 1z" />
              <line x1="16" y1="8" x2="16" y2="12" />
              <line x1="12" y1="8" x2="12" y2="12" />
            </svg>
            <Input
              placeholder="URL"
              onChange={(e) => putSocials(e, 'twitch')}
            />
          </div>
          <div className="social-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-instagram"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fd0061"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="4" y="4" width="16" height="16" rx="4" />
              <circle cx="12" cy="12" r="3" />
              <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
            </svg>
            <Input
              placeholder="URL"
              onChange={(e) => putSocials(e, 'instagram')}
            />
          </div>
          <div className="social-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-tiktok"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#6f32be"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 12a4 4 0 1 0 4 4v-12a5 5 0 0 0 5 5" />
            </svg>
            <Input
              placeholder="URL"
              onChange={(e) => putSocials(e, 'tiktok')}
            />
          </div>
          <div className="social-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-facebook"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#4267B2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
            </svg>
            <Input
              placeholder="URL"
              onChange={(e) => putSocials(e, 'facebook')}
            />
          </div>
          <button className="set-action" onClick={() => signData('socials')}>
            Confirm
          </button>
        </div>

        <div>
          <h3>Token Setting</h3>
          <div>
            <Checkbox onChange={putCustomToken} checked={customToken}>
              Allow custom token
            </Checkbox>
          </div>
          {renderTokens()}
          <div className="token-action">
            <button
              style={{ display: customToken ? 'block' : 'none' }}
              className="circle"
              onClick={addToken}
            >
              +
            </button>
            <button className="set-action" onClick={() => signData('tokens')}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
