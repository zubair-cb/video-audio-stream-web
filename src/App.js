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
  }, [isDataReady])

  
  async function setVideoReady(e) {
    console.log("Video is Ready")
    streamDurations[0] = e.target.duration;
    isDataReady[0] = true;
    setPlaySeekControl(true);
  }
  async function setAudioReady(e) {
    console.log("Audio is Ready")
    streamDurations[1] = e.target.duration;
    isDataReady[1] = true;
  }
  async function setMusicReady(e) {
    console.log("Music is Ready");
    streamDurations[2] = e.target.duration;
    isDataReady[2] = true;
  }

  async function play(e) {
    if (isDataReady.includes(false)){
    // if(isDataReady[0] === false || isDataReady[1] === false || isDataReady[2] === false){
      // e.target.innerText = "Play"
      setPlayPauseButtonText('Play')
      return;
    }

    let audio = document.querySelectorAll('audio');
    let video = document.querySelectorAll('video');

    if(isPlaying) {
      // e.target.innerText = "Play"
      setPlayPauseButtonText('Play')
      audio[0].pause();
      audio[1].pause();
      video[0].pause();
      setIsPlaying(false);
      return;
    }
    // e.target.innerText = "Pause"
    setPlayPauseButtonText('Pause')
    audio[0].play();
    audio[1].play()
    video[0].play();
    setIsPlaying(true);

  }

  async function controlVolume(e) {
    let audio = document.querySelectorAll('audio');
    if (e.target.name === 'audioControl') {
      audio[0].volume = e.target.value / 100;
      return;
    }
    audio[1].volume = e.target.value / 100;
  
  }

  function selectVideoStream(e) {
    if(e.target.outerText === "") return;
    const audio = document.querySelectorAll('audio');
    const video = document.querySelectorAll('video');

    const videoIndex = videoSteams.findIndex(obj => obj.name === e.target.innerText);
    const videoUrl = videoSteams[videoIndex].url;

    if(video[0].getAttribute("src") === videoUrl) return;
    

    video[0].setAttribute("src", videoUrl);
    audio[1].load();
    audio[0].load();
    isDataReady[1] = false;
    isDataReady[2] = false;
    isDataReady[0] = false;
    setIsPlaying(false)

    // audio[0].play();
    // audio[1].play();
    // video[0].play();
  }

  function selectAudioStream(e) {
    if(e.target.outerText === "") return;
    const audio = document.querySelectorAll('audio');
    const video = document.querySelectorAll('video');

    const audioIndex = audioStreams.findIndex(obj => obj.name === e.target.innerText);
    const audioUrl = audioStreams[audioIndex].url;

    if(audio[0].getAttribute("src") === audioUrl) return;
    audio[0].setAttribute("src", audioUrl);

    audio[1].load();
    video[0].load();
    isDataReady[1] = false;
    isDataReady[2] = false;
    isDataReady[0] = false;
    setIsPlaying(false)

    // audio[0].play();
    // audio[1].play();
    // video[0].play();
  }

  async function selectMusicStream(e) {
    if(e.target.outerText === "") return;
    const audio = document.querySelectorAll('audio');
    const video = document.querySelectorAll('video')

    const musicIndex = musicStreams.findIndex(obj => obj.name === e.target.innerText);
    const musicUrl = musicStreams[musicIndex].url;

    if(audio[1].getAttribute("src") === musicUrl) return;
    audio[1].setAttribute("src", musicUrl);

    audio[0].load();
    video[0].load();
    isDataReady[1] = false;
    isDataReady[2] = false;
    isDataReady[0] = false;
    setIsPlaying(false)

    // audio[0].play();
    // audio[1].play();
    // video[0].play();
  }

  async function onEnded(e){
    const audio = document.querySelectorAll('audio');
    const video = document.querySelectorAll('video');

    audio[0].load();
    audio[1].load();
    video[0].load();
    setIsPlaying(false);

  }

  async function durationUpdate(e) {
    const audio = document.querySelectorAll('audio');
    const video = document.querySelectorAll('video');
    
    const selectedDuration = e.target.value;
    console.log(selectedDuration);

    audio[0].currentTime = selectedDuration;
    video[0].currentTime = selectedDuration;
    audio[1].currentTime = selectedDuration;
    setSeekValue(selectedDuration);
  }

  async function updateSeekBar(e) {
    // const audio = document.querySelectorAll('audio');
    // const video = document.querySelectorAll('video');

    // const minDuration = Math.min(audio[0].duration, audio[1].duration, video[0].duration);
    setSeekValue(e.target.currentTime);
    // console.log(e.target.currentTime);

  }

  async function onVideoBuffering(e) {
    console.log("Video Buffering")
    setPlaySeekControl(false)
    const audio = document.querySelectorAll('audio');

    audio[0].pause()
    audio[1].pause()

  }

  // async function onAudioBuffering(e) {
  //   console.log("Audio Buffering");
  //   const audio = document.querySelectorAll('audio');
  //   const video = document.querySelectorAll('video'); 

  //   audio[1].pause()
  //   video[0].pause()
  // }

  // async function onMusicBuffering(e){
  //   console.log("Music Buffering");
  //   const audio = document.querySelectorAll('audio');
  //   const video = document.querySelectorAll('video'); 

  //   audio[0].pause()
  //   video[0].pause()
  // }

  async function onVideoPlaying(e) {
    console.log("video playing after buffering")
    setPlaySeekControl(true)
    const audio = document.querySelectorAll('audio');

    audio[0].play()
    audio[1].play()
  }

 
  function controls() {
    if (playSeekControl) {
      return (
          <div className='Controls no-border playBtn'>
            <Button variant='outlined' onClick={play} className='PlayButton' >
                {playPauseButtonText}
            </Button>
          </div>    
      )
    } else{
      return (
        <div className='Controls no-border playBtn'>
          <CircularProgress />
        </div>
      )
    }
  }

  return (
    <div className="App">
      <div className = "Main">

        <video width="80%" poster="" muted onEnded={onEnded} onWaiting={onVideoBuffering} onPlaying={onVideoPlaying} controls={showControls} onLoadedData={setVideoReady} onTimeUpdate={updateSeekBar}>
          <source
            src={videoSteams[0].url}
            type="video/mp4"
            />
        </video>
        <audio id='audioStream' onEnded={onEnded} controls={showControls} onLoadedData={setAudioReady} >
          <source  
          src={audioStreams[0].url}
          type='audio/mp3'/>
        </audio>

        <audio className='musicStream' onEnded={onEnded} controls={showControls} onLoadedData={setMusicReady} >
          <source 
          src={audioStreams[1].url}
          type='audio/mp3'/>
        </audio>

        {controls()}

        <div className='Controls no-border'>
            <Slider size='large' aria-label="Duration slider" value={seekValue} valueLabelDisplay onChange={durationUpdate} max={Math.min(streamDurations[0], streamDurations[1], streamDurations[2])} />
        </div>

        {/* {playPauseButton()}
        {seekBar()} */}

      {/* <div className='Controls no-border playBtn'>

        <Button variant='outlined' onClick={play} className='PlayButton' >
            Play/Pause
        </Button>

      </div>

      <div className='Controls no-border'>
        <Slider size='large' aria-label="Duration slider" value={seekValue} valueLabelDisplay onChange={durationUpdate} max={Math.min(streamDurations[0], streamDurations[1], streamDurations[2])} />
      </div> */}



        <div className='Controls select-video'>

          <h3>Select Video Stream</h3>

          <FormControl size='medium' className='formControl'>
            <InputLabel id='videoSelect-label'>Video</InputLabel>
            <Select
              labelId='videoSelect-label'
              id='videoSelect'
              label = "Select"
              defaultValue={videoSteams[0].url}
              onClick={selectVideoStream}
            >
              {videoSteams.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.url}>{item.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>

          {/* <Slider size="small" aria-label="duration" valueLabelDisplay="auto" onChange={updateVideoDuration}/> */}
        </div>



        <div className='Controls'>
          <h3>Select Audio Stream</h3>

          <FormControl size='medium' className='formControl'>
            <InputLabel id='audioSelect-label'>Audio #1</InputLabel>
            <Select
              labelId='audioSelect-label'
              id='audioSelect'
              label = "Select"
              defaultValue={audioStreams[0].url}
              onClick={selectAudioStream}
            >
              {audioStreams.map((item, index) => {
                return (
                  <MenuItem key={index} value= {item.url}>{item.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>

      <Box sx={{ width: 200 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown />
            <Slider aria-label="Volume" name='audioControl' defaultValue='100' onChange={controlVolume}/>
          <VolumeUp />
        </Stack>
      </Box>

        </div>


        <div className='Controls'>
          <h3>Select Music Stream</h3>

          <FormControl size='medium' className='formControl'>
            <InputLabel id='musicSelect-label'>Audio #2</InputLabel>
            <Select
              labelId='musicSelect-label'
              id='musicSelect'
              label = "Select"
              defaultValue={musicStreams[1].url}
              onClick={selectMusicStream}
            >
              {musicStreams.map((item, index) => {
                return (
                  <MenuItem  key={index} value={item.url}>{item.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>

      <Box sx={{ width: 200 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown />
            <Slider aria-label="Volume" name='musicControl' defaultValue='100' onChange={controlVolume}/>
          <VolumeUp />
        </Stack>
      </Box>

        </div>


      </div>
    </div>
  );
}

export default App;
