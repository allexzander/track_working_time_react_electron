import moment from 'moment';

export const FormatMilliseconds = (milliseconds, format) => {
    const momentDuration = moment.duration(milliseconds, "milliseconds")
  
    if (format === "HH:mm") {
      
      const hours   = momentDuration.hours() >= 10 ? momentDuration.hours().toString() : `0${momentDuration.hours()}`;
      const minutes = momentDuration.minutes() >= 10 ? momentDuration.minutes().toString() : `0${momentDuration.minutes()}`;
  
      return `${hours}:${minutes}`;
    }
    else if (format === "HH:mm:ss") {
  
      const hours   = momentDuration.hours() >= 10 ? momentDuration.hours().toString() : `0${momentDuration.hours()}`;
      const minutes = momentDuration.minutes() >= 10 ? momentDuration.minutes().toString() : `0${momentDuration.minutes()}`;
      const seconds = momentDuration.seconds() >= 10 ? momentDuration.seconds().toString() : `0${momentDuration.seconds()}`;
  
      return `${hours}:${minutes}:${seconds}`;
    }
    else if (format === "mm:ss") {
  
      const minutes = momentDuration.minutes() >= 10 ? momentDuration.minutes().toString() : `0${momentDuration.minutes()}`;
      const seconds = momentDuration.seconds() >= 10 ? momentDuration.seconds().toString() : `0${momentDuration.seconds()}`;
  
      return `${minutes}:${seconds}`;
    }
    else {
      return duration;
    }
  }