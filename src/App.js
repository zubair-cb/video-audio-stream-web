import { MenuItem, Select, Stack, Box, InputLabel, FormControl, Slider } from '@mui/material';
import Button from '@mui/joy/Button'
// import Slider from '@mui/joy/Slider';
import React, { useEffect, useState } from 'react';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import './App.css';




function App() {

  // const [videoSteams, setVideoStreams] = useState(['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4']);
  const [videoSteams] = useState(['https://ik.imagekit.io/rmtai4fs5/The.Bad.Guys.2022.1080p.BluRay.H264.AAC-RARBG.mp4', 'https://ik.imagekit.io/rmtai4fs5/be7b878b5c644689ca8dc129f92aabac130f43c8.mp4', 'https://ik.imagekit.io/rmtai4fs5/f3bc38bed9928f4b689401180ecec285a23ac2f7.mp4', 'https://ik.imagekit.io/rmtai4fs5/ecc14820cfb4d2cc7fb0dcb114c4500b2f043c6a%20(4).mp4', 'https://ik.imagekit.io/rmtai4fs5/FX6%200149_stabilized_colored_final.mp4']);
  const [audioStreams] = useState(['https://ik.imagekit.io/rmtai4fs5/audio/1%20final%20d%208-19-22.mp3', 'https://ik.imagekit.io/rmtai4fs5/audio/3%20-%20final%20E%20-%208-22-22.mp3', 'https://ik.imagekit.io/rmtai4fs5/audio/3%20-%20rife.mp3', 'https://ik.imagekit.io/rmtai4fs5/audio/4%20-%20final%20E%20-%208-22-22.mp3', 'https://ik.imagekit.io/rmtai4fs5/audio/6%20-%20rife.mp3', 'https://ik.imagekit.io/rmtai4fs5/audio/rife%20sine%20example.mp3']);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDataReady] = useState([false, false, false]);
  const [showControls] = useState(true); 
  const [seekValue, setSeekValue] = useState(0);
  const [streamDurations] = useState([]);
  

  useEffect(() => {
    // setVideoStreams(['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4']);
    // setAudioStreams(['http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3']);
    // setMusicStreams(['https://files.thenaatsharif.com/downloads/sahir-ali-bagga/Pakistan-Zindabad-Song-MP3-Download-By-Sahir-Ali-Bagga.mp3']);
  }, [])

  
  async function setVideoReady(e) {
    console.log("Video is Ready")
    streamDurations[0] = e.target.duration;
    isDataReady[0] = true;
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
      return;
    }

    let audio = document.querySelectorAll('audio');
    let video = document.querySelectorAll('video');

    if(isPlaying) {
      await audio[0].pause();
      await audio[1].pause();
      await video[0].pause();
      setIsPlaying(false);
      return;
    }
  
    await audio[0].play();
    await audio[1].play()
    await video[0].play();
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
    const video = document.querySelectorAll('video')
    video[0].setAttribute("src", e.target.outerText);

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
    if(audio[0].getAttribute("src") === e.target.outerText) return;
    audio[0].setAttribute("src", e.target.outerText);


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
    audio[1].setAttribute("src", e.target.outerText);

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
    
    const minDuration = Math.min(audio[0].duration, audio[1].duration, video[0].duration);

    const selectedDuration = minDuration * (e.target.value / 100);


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
    console.log("Buffering")
    const audio = document.querySelectorAll('audio');

    audio[0].pause()
    audio[1].pause()

  }

  async function onVideoPlaying(e) {
    const audio = document.querySelectorAll('audio');

    audio[0].play()
    audio[1].play()
  }



  return (

    <div className="App">

      <div className = "Main">

      
        <video width="80%" poster="" muted onEnded={onEnded} onWaiting={onVideoBuffering} onPlaying={onVideoPlaying} controls={showControls} onLoadedData={setVideoReady} onTimeUpdate={updateSeekBar}>
        <source
          src={videoSteams[0]}
          type="video/mp4"
          />
        </video>

        <audio id='audioStream' onEnded={onEnded} controls={showControls} onLoadedData={setAudioReady}>
          <source  
          src={audioStreams[0]}
          type='audio/mp3'/>
        </audio>

        <audio className='musicStream' onEnded={onEnded} controls={showControls} onLoadedData={setMusicReady}>
          <source 
          src={audioStreams[1]}
          type='audio/mp3'/>
        </audio>

      <div className='Controls'>

        <Button variant='outlined' onClick={play} className='PlayButton' >
            Play/Pause
        </Button>

      </div>

      <div className='Controls'>

        <Slider size='small' aria-label="Duration slider" value={seekValue} valueLabelDisplay onChange={durationUpdate} max={Math.min(streamDurations[0], streamDurations[1], streamDurations[2])} />

      </div>



        <div className='Controls'>

          <h3>Select Video Stream</h3>

          <FormControl size='medium' className='formControl'>
            <InputLabel id='videoSelect-label'>Video</InputLabel>
            <Select
              labelId='videoSelect-label'
              id='videoSelect'
              label = "Select"
              defaultValue={videoSteams[0]}
              onClick={selectVideoStream}
            >
              {videoSteams.map((item, index) => {
                return (
                  <MenuItem key={index} value= {item}>{item}</MenuItem>
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
              defaultValue={audioStreams[0]}
              onClick={selectAudioStream}
            >
              {audioStreams.map((item, index) => {
                return (
                  <MenuItem key={index} value= {item}>{item}</MenuItem>
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
              defaultValue={audioStreams[1]}
              onClick={selectMusicStream}
            >
              {audioStreams.map((item, index) => {
                return (
                  <MenuItem  key={index} value={item}>{item}</MenuItem>
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
