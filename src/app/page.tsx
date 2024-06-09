'use client'
import React, { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import { MyTweet } from '../../components/my-tweet';
import { Tweet } from "react-tweet";
import NextImage from 'next/image'
import placeholder from '../../assets/placeholder-300.png'
import html2canvas from "html2canvas";
import {components} from "../../components/tweet-components"

interface ImageDimensions {
  width: number;
  height: number;
}


const Home: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<ImageDimensions | null>(null);
  const [tweetUrl, setTweetUrl] = useState<string>('');
  const [tweetId, setTweetId] = useState<string>('');

  const [leftHalf, setLeftHalf] = useState<string | null>(null);
  const [rightHalf, setRightHalf] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTweetUrl(event.target.value);
  }

  const fetchTweetData = () => {
    splitImage()
    const urlRegex1 = /^https:\/\/x\.com\/[^\/]+\/[^\/]+\/[^\/]+$/;
    const urlRegex2 = /^https:\/\/twitter\.com\/[^\/]+\/[^\/]+\/[^\/]+$/;

    if (urlRegex1.test(tweetUrl) || urlRegex2.test(tweetUrl)) {
      setTweetId(extractPostId(tweetUrl) as string);
      console.log("Valid tweet URL. Post ID:", tweetId);
      return tweetId;
    } else {
      alert("Invalid tweet URL");
      console.log("Invalid tweet URL" );
      setTweetId('');
      return false;
    }
  }

  const splitImage = () => {
    const img = new Image();
    img.onload = () => {
      const halfWidth = img.width / 2;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = halfWidth;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, halfWidth, img.height, 0, 0, halfWidth, img.height);
        setLeftHalf(canvas.toDataURL());
        ctx.clearRect(0, 0, halfWidth, img.height);
        ctx.drawImage(img, halfWidth, 0, halfWidth, img.height, 0, 0, halfWidth, img.height);
        setRightHalf(canvas.toDataURL());
      }
    };
    img.src = previewImage as string;
  }

  const extractPostId = (tweetUrl: string) => {
    const urlRegex1 = /^https:\/\/x\.com\/[^\/]+\/[^\/]+\/([^\/]+)$/;
    const urlRegex2 = /^https:\/\/twitter\.com\/[^\/]+\/[^\/]+\/([^\/]+)$/;

    if (urlRegex1.test(tweetUrl)) {
        const match = tweetUrl.match(urlRegex1);
        return match ? match[1] : null;
    } else if (urlRegex2.test(tweetUrl)) {
        const match = tweetUrl.match(urlRegex2);
        return match ? match[1] : null;
    } else {
        return null;
    }
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        const img = new Image();
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const newHeight = Math.min(300, img.height);
          const newWidth = newHeight * aspectRatio;
          setImageDimensions({ width: newWidth, height: newHeight });
          setOriginalDimensions({ width: img.width, height: img.height });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  const exportTweetAsImage = () => {
    const div = document.getElementById("exportTweet");
    if (div) {
      html2canvas(div, {scale: 2, useCORS: true}).then((canvas) => {
        const roundedCanvas = document.createElement('canvas');
        roundedCanvas.width = canvas.width;
        roundedCanvas.height = canvas.height;
        const ctx = roundedCanvas.getContext('2d');
        if (ctx) {
          const radius = 28;
          ctx.beginPath();
          ctx.moveTo(radius, 0);
          ctx.lineTo(canvas.width - radius, 0);
          ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
          ctx.lineTo(canvas.width, canvas.height - radius);
          ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
          ctx.lineTo(radius, canvas.height);
          ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
          ctx.lineTo(0, radius);
          ctx.quadraticCurveTo(0, 0, radius, 0);
          ctx.clip();
          ctx.drawImage(canvas, 0, 0);
        }
        const imgData = roundedCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'output.png';
        link.click();
      });
    }
  }

  const exportDivAsImage = () => {
    const parentDivs = document.querySelectorAll('.parent');
let delay = 0; // delay in milliseconds

parentDivs.forEach((div) => {
  setTimeout(() => {
    html2canvas(div as HTMLElement, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'output.png';
      link.click();
    });
  }, delay);
  delay += 2000; // increment delay for each div
});
    // if (div) {
    //   html2canvas(div as HTMLElement, {scale: 2, useCORS: true}).then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     const link = document.createElement('a');
    //     link.href = imgData;
    //     link.download = 'output.png';
    //     link.click();
    //   });
    // }
  }
  
  


  const addTweetToImage = (imagePath: string, tweetCanvas: HTMLCanvasElement, tweetX: number, tweetY: number) => {
    // Read the original image
    const image = new Image();
    image.src = rightHalf as string;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the right half of the image on canvas
        ctx.drawImage(image, 0, 0);

        // Draw the tweet canvas on top of the right half image
        ctx.drawImage(tweetCanvas, tweetX, tweetY);

        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL('image/jpeg');

        // Create a temporary link element to download the image
        const link = document.createElement('a');
        link.href = imageDataUrl;
        link.download = 'output.jpg';
        link.click();
      }
      
  };
};

  return (
    <div className="main">
      <div className="form">
        <div className="inputGroup">
          <div className="inputTitle">URL:</div>
          <input type="text" className="inputText" id="tweetUrl" value={tweetUrl} onChange={handleInputChange} />                
        </div>
        <div className="inputGroup">
          <div className="inputTitle">Image:</div>
          <div className="inputContent">
            <input
              type="file"
              placeholder="image"
              className="inputFile"
              onChange={handleImageChange}
            />
            {previewImage ? (
              <div>
                <NextImage
                  src={previewImage as string}
                  width={imageDimensions?.width || 300}
                  height={imageDimensions?.height || 300}
                  alt="preview Image"
                  className="previewImage"
                  objectFit="contain"
                />
                <p>Dimensions: {originalDimensions ? `${originalDimensions.width}x${originalDimensions.height}` : "Unknown"}</p>
              </div>
            ) : (
              <NextImage
                id="previewImage"
                width={300}
                height={300}
                src={placeholder}
                alt="preview Image"
                className="previewImage"
              />
            )}
          </div>
        </div> 
        <div className="inputContent">
          <input type="submit" className="submit" onClick={fetchTweetData} />
        </div>
      </div>
      
      <div className="tweetContainer">
        <div className="data light">
          {tweetId ? (
            <div id="exportTweet" className="temp" >
              {/* <Tweet id={tweetId}/> */}
              <Tweet id={tweetId} components={components} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      
      
      {tweetId ? (
        <div className="exportBtnContainer">
          <button className="exportBtn" onClick={exportTweetAsImage}>Export Tweet</button>
        </div>

      ) : (
        <div></div>
      )}
    <div className="splittedImageContainer">
      {leftHalf && (
        <NextImage
          src={leftHalf}
          width={(imageDimensions?.width || 0) / 2 || 150}
          height={imageDimensions?.height || 300}
          alt="Left half"
          objectFit="contain"
        />
      )}
      {rightHalf && (
          <NextImage
            src={rightHalf}
            width={(imageDimensions?.width || 0) / 2 || 150}
            height={imageDimensions?.height || 300}
            alt="Right half"
            objectFit="contain"
          />
      )}
    </div>
    {rightHalf && (
        <div className="parent">
          <NextImage
            src={rightHalf}
            width={ (originalDimensions?.width || 0) / 2 || 150}
            height={originalDimensions?.height || 300}
            alt="Right half"
            objectFit="contain"
            className="image"
          />
          <div className="absolute light" style={{aspectRatio: ((originalDimensions?.width || 0) /2) / (originalDimensions?.height || 0) }}>
            <Tweet id={tweetId}/>

          </div>
        </div>
        
      )}

{leftHalf && (
        <div className="parent">
          <NextImage
            src={leftHalf}
            width={ (originalDimensions?.width || 0) / 2 || 150}
            height={originalDimensions?.height || 300}
            alt="Right half"
            objectFit="contain"
            className="image"
          />
          <div className="absolute light" style={{aspectRatio: ((originalDimensions?.width || 0) /2) / (originalDimensions?.height || 0) }}>
           

          </div>
        </div>
        
      )}

    {tweetId ? (
            <div className="exportBtnContainer">
              <button className="exportBtn" onClick={exportDivAsImage}>Make image</button>
            </div>

          ) : (
            <div></div>
          )}
    </div>
  );
}

export default Home;