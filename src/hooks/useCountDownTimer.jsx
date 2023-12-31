import cafeAudio from '../assets/depression.mp3'
import Swal from 'sweetalert2'
import { useCallback, useEffect, useState } from 'react'

function CountDownTimer() {
  const [counter, setCounter] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const counterIncrement = (value) => {
    const sum = counter + value;
    return setCounter(sum);
  };

  const whenTimeEnds = () => {
    const audioElement = new Audio(cafeAudio)
    audioElement.play()
    Swal.fire({
      title: 'Coffebreak is over!!',
      text: 'Back to the office, NOW!!',
      imageUrl: 'https://www.looper.com/img/gallery/what-filming-the-final-office-episode-with-steve-carell-was-like/intro-1624323448.jpg',
      background: '#010D12',
      color: '#FFFFFF',
      confirmButtonColor: '#0d6efd',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      customClass: {
        container: 'custom-swal',
      },
    })
  }


  const clearButton = () => {
    setCounter(0);
    setIsTimerRunning(false)
    clearInterval(intervalId);
  };

  const stopTimer = useCallback(() => {
    setIsTimerRunning(false);
    clearInterval(intervalId);
  }, [intervalId]);

  const startTimer = () => {
    try {
      if (counter === 0 && !isTimerRunning) throw new Error('Please increment the counter before starting the timer.')
      if (!isTimerRunning) {
        setIsTimerRunning(true);
        setIntervalId(setInterval(() => {
          setCounter((prevCounter) => prevCounter - 1);
        }, 1000));
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        background: '#010D12',
        color: '#FFFFFF',
        confirmButtonColor: '#0d6efd',
        text: error.message,
      })
    }
  };

  useEffect(() => {
    if (isTimerRunning && counter === 0) {
      stopTimer();
      whenTimeEnds();
    }
  }, [isTimerRunning, counter, stopTimer]);

  return {
    counter,
    setCounter,
    counterIncrement,
    startTimer,
    stopTimer,
    isTimerRunning,
    clearButton,
  }
}

export default CountDownTimer