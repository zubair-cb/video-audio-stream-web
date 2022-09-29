import { MenuItem, Select, Stack, Box, InputLabel, FormControl, Slider } from '@mui/material';
import Button from '@mui/joy/Button'
import React, { useEffect, useState } from 'react';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';


function App() {

  const [videoSteams] = useState([
    {
      "name": "Colored Final",
      "url": "https://ik.imagekit.io/rmtai4fs5/FX6%200149_stabilized_colored_final.mp4"
    },
    {
      "name": "The Bad Guys",
      "url": "https://ik.imagekit.io/rmtai4fs5/The.Bad.Guys.2022.1080p.BluRay.H264.AAC-RARBG.mp4"
    },
    {
      "name": "Fireheart",
      "url": "https://ik.imagekit.io/rmtai4fs5/be7b878b5c644689ca8dc129f92aabac130f43c8.mp4"
    },
    {
      "name": "Nickelodeon",
      "url": "https://ik.imagekit.io/rmtai4fs5/f3bc38bed9928f4b689401180ecec285a23ac2f7.mp4"
    },
    {
      "name": "Get Car For A Grand",
      "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
    },
  ]);
  const [musicStreams] = useState([
    {
      "name": "Final 4",
      "url": "https://ik.imagekit.io/rmtai4fs5/audio/4%20-%20final%20E%20-%208-22-22.mp3"
    },
    {
      "name": "The Never written role",
      "url": "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
    },
  ]);
  const [audioStreams] = useState([
    {
      "name": "Rife 3",
      "url": "https://ik.imagekit.io/rmtai4fs5/audio/3%20-%20rife.mp3"
    },
    {
      "name": "Rife 6",
      "url": "https://ik.imagekit.io/rmtai4fs5/audio/6%20-%20rife.mp3"
    },
    {
      "name": "Rife sine Example",
      "url": "https://ik.imagekit.io/rmtai4fs5/audio/rife%20sine%20example.mp3"
    },
    {
      "name": "Final 1",
      "url": "https://ik.imagekit.io/rmtai4fs5/audio/1%20final%20d%208-19-22.mp3"
    },
    {
      "name": "Final 3",
      "url": "https://ik.imagekit.io/rmtai4fs5/audio/3%20-%20final%20E%20-%208-22-22.mp3"
    },
  ])
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDataReady] = useState([false, false, false]);
  const [showControls] = useState(false); 
  const [seekValue, setSeekValue] = useState(0);
  const [streamDurations] = useState([]);
  const [playSeekControl, setPlaySeekControl] = useState(false);
  const [playPauseButtonText, setPlayPauseButtonText] = useState("Play");
  

  useEffect(() => {
  }, [])


  return (
    <div className="App">
      <div className = "Main">

      </div>
    </div>
  );
}

export default App;
